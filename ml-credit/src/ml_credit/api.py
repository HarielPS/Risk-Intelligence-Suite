from typing import Dict, Any
from .inference import (
    numeric_features,
    categorical_features,
)
import pandas as pd
from .score import score_application_with_explanation

# =========================
# API pública para el microservicio
# =========================

def score_application(input_data: Dict[str, Any], top_n: int = 5) -> Dict[str, Any]:
    """
    Función de alto nivel para el microservicio de IA.

    Parameters
    ----------
    input_data : dict
        Diccionario con las features esperadas del modelo,
        por ejemplo:
        {
            "Duration": 24,
            "CreditAmount": 3000,
            "Age": 35,
            "Status": 2,
            ...
        }

    Returns
    -------
    dict con:
        - probability_default (float)
        - risk_band (str)
        - top_features (lista de dicts)
    """

    expected_cols = numeric_features + categorical_features
    missing = [c for c in expected_cols if c not in input_data]

    if missing:
        raise ValueError(f"Faltan columnas en la solicitud: {missing}")

    # Ordenar columnas según el orden esperado
    ordered_data = {col: input_data[col] for col in expected_cols}
    X_raw_row = pd.DataFrame([ordered_data])

    result = score_application_with_explanation(
        X_raw_row=X_raw_row,
        top_n=top_n,
    )
    return result
