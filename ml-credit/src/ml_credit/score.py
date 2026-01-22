from typing import Dict, Any
import pandas as pd
from .shap_explain import explain_single_application
from .translate import build_human_explanation

# === Asignación de banda de riesgo según probabilidad de default ===

def assign_risk_band(prob_default: float, low: float = 0.3, high: float = 0.6) -> str:
    """
    Asigna una banda de riesgo basada en la probabilidad de default.
    
    low: umbral entre LOW y MEDIUM
    high: umbral entre MEDIUM y HIGH
    """
    if prob_default < low:
        return "LOW"
    elif prob_default < high:
        return "MEDIUM"
    else:
        return "HIGH"


# =========================
# Core: score + banda + explicación
# =========================

def score_application_with_explanation(
    X_raw_row: pd.DataFrame,
    top_n: int = 5,
) -> Dict[str, Any]:
    """
    Calcula probabilidad de default, banda de riesgo y top features
    explicativas para una sola solicitud (fila de DataFrame).
    """
    prob_default, top_features = explain_single_application(
        X_raw_row=X_raw_row,
        top_n=top_n,
    )

    risk_band = assign_risk_band(prob_default)
    human_exp_df = build_human_explanation(X_raw_row, top_features, top_n=top_n)

    top_features_payload: list[Dict[str, Any]] = []
    for _, row in human_exp_df.iterrows():
        top_features_payload.append({
            "feature": row["feature"],
            "feature_label": row["feature_label"],
            "raw_value": row["raw_value"],
            "value_label": row["value_label"],
            "shap_value": row["shap_value"],
            "impact_direction": row["impact_direction"],
            "impact_text": row["impact_text"],
        })

    return {
        "probability_default": float(prob_default),
        "risk_band": risk_band,
        "top_features": top_features_payload,
    }
