import pandas as pd
from .inference import (
    preprocessor,
    best_model,
    explainer,
    feature_names_transformed,
)


# =========================
# SHAP local para una sola solicitud
# =========================

def explain_single_application(
    X_raw_row: pd.DataFrame,
    top_n: int = 5,
) -> tuple[float, pd.DataFrame]:
    """
    Aplica el modelo y genera explicación SHAP local
    para una sola solicitud de crédito.
    """

    # Transformar con el preprocesador del pipeline
    X_transformed = preprocessor.transform(X_raw_row)

    # Probabilidad de default (clase positiva = 1)
    prob_default = float(best_model.predict_proba(X_raw_row)[0, 1])

    # Valores SHAP para esta observación
    shap_values = explainer.shap_values(X_transformed)

    if isinstance(shap_values, list):
        shap_vals = shap_values[0][0]
    else:
        shap_vals = shap_values[0]

    shap_df = pd.DataFrame({
        "feature": feature_names_transformed,
        "shap_value": shap_vals,
    })

    shap_df["abs_impact"] = shap_df["shap_value"].abs()
    shap_df = shap_df.sort_values("abs_impact", ascending=False)

    top_features = shap_df.head(top_n).drop(columns="abs_impact")

    return prob_default, top_features

