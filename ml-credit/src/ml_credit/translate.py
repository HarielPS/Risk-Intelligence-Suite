import pandas as pd
from typing import Dict, Any

from .diccionario import FEATURE_LABELS, CATEGORY_VALUE_MAPS

# =========================
# Traducción humana de top features
# =========================

def build_human_explanation(
    X_raw_row: pd.DataFrame,
    top_features_df: pd.DataFrame,
    top_n: int = 5,
) -> pd.DataFrame:
    """
    Traduce las top features técnicas (One-Hot + numéricas) a
    una explicación humana basada en diccionarios.
    """
    explanations: list[Dict[str, Any]] = []
    row = X_raw_row.iloc[0]

    for _, r in top_features_df.head(top_n).iterrows():
        transformed_name = r["feature"]      # ej. "CreditHistory_4" o "CreditAmount"
        shap_val = float(r["shap_value"])
        abs_impact = abs(shap_val)

        if shap_val >= 0:
            impact_direction = "INCREASES_RISK"
            impact_text = "incrementa el riesgo de incumplimiento"
        else:
            impact_direction = "REDUCES_RISK"
            impact_text = "reduce el riesgo de incumplimiento"

        # Numéricas
        if transformed_name in ["Duration", "CreditAmount", "Age"]:
            var_name = transformed_name
            feature_label = FEATURE_LABELS.get(var_name, var_name)
            raw_value = row[var_name]

            if var_name == "Duration":
                value_label = f"{raw_value} meses de duración del crédito"
            elif var_name == "CreditAmount":
                value_label = f"Monto solicitado: {raw_value} unidades monetarias"
            elif var_name == "Age":
                value_label = f"Edad del solicitante: {raw_value} años"
            else:
                value_label = str(raw_value)

        # Categóricas One-Hot
        else:
            parts = transformed_name.split("_")
            var_name = "_".join(parts[:-1])
            try:
                code = int(parts[-1])
            except ValueError:
                code = None

            feature_label = FEATURE_LABELS.get(var_name, var_name)
            raw_value = row.get(var_name, None)

            value_map = CATEGORY_VALUE_MAPS.get(var_name, {})
            value_label = value_map.get(raw_value, f"Categoría {raw_value}")

        explanations.append({
            "feature": var_name,
            "feature_label": feature_label,
            "raw_value": raw_value,
            "value_label": value_label,
            "shap_value": shap_val,
            "abs_impact": abs_impact,
            "impact_direction": impact_direction,
            "impact_text": impact_text,
        })

    exp_df = pd.DataFrame(explanations)
    exp_df = exp_df.sort_values("abs_impact", ascending=False)

    return exp_df
