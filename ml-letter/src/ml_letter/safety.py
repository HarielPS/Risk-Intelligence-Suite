from __future__ import annotations
from typing import Any, Dict, List
import json

def extract_json(text: str) -> Dict[str, Any] | None:
    try:
        start = text.index("{")
        end = text.rindex("}") + 1
        return json.loads(text[start:end])
    except Exception as e:
        print("Error parseando JSON:", e)
        return None

def validate_letter_structure(letter: dict, payload: dict) -> dict:
    """
    Aquí copias toda tu lógica actual:
    - validar que existan campos obligatorios
    - normalizar bullets
    - recuento de factores, etc.
    """
    ...
    return letter

def build_generic_review_letter(payload: dict, extra_flags: list[str] | None = None) -> dict:
    """
    Copias la implementación que ya tienes en el notebook.
    """
    ...
