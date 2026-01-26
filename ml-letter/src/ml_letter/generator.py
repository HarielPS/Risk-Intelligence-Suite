# src/ml_letter/generator.py
from __future__ import annotations
from typing import Dict, Any

from .llm_client import call_llm
from .prompts import system_prompt, build_user_prompt
from .safety import extract_json, validate_letter_structure, build_generic_review_letter

SENSITIVE_FEATURES = {
    "ForeignWorker",
    "PersonalStatusSex",
    "Sex",
    "Age",
    "Race",
    "MaritalStatus",
}

def filter_sensitive_features(payload: Dict[str, Any]) -> None:
    app = payload.get("application", {})
    feats = app.get("topFeatures", [])
    app["topFeatures"] = [
        f for f in feats
        if f.get("feature") not in SENSITIVE_FEATURES
    ]
    payload["application"] = app


def infer_preliminary_status(payload: Dict[str, Any]) -> str:
    app = payload["application"]
    band = app["riskBand"]
    prob = app["probabilityDefault"]

    if band == "LOW" and prob < 0.30:
        return "APPROVE"
    if band == "MEDIUM" or (band == "LOW" and prob >= 0.30):
        return "REVIEW"
    return "DECLINE"

def generate_letter(payload: Dict[str, Any], max_attempts: int = 2) -> Dict[str, Any]:
    
    filter_sensitive_features(payload)
    payload = dict(payload) 
    
    payload["decision"] = infer_preliminary_status(payload)

    user_prompt = build_user_prompt(payload)

    letter = None
    for attempt in range(1, max_attempts + 1):
        raw_text = call_llm(system_prompt, user_prompt)
        candidate = extract_json(raw_text)

        if candidate is None:
            continue

        letter = candidate
        break

    if letter is None:
        final_letter = build_generic_review_letter(payload, extra_flags=["PARSE_ERROR"])
    else:
        expected_decision = payload.get("decision")
        if expected_decision:
            letter["decision"] = expected_decision

        letter["safetyFlags"] = []

        letter = validate_letter_structure(letter, payload)

        final_letter = letter

    return final_letter
