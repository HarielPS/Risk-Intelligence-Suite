from __future__ import annotations

from pathlib import Path
from typing import Dict, Any, List

import json
import joblib
import numpy as np
import pandas as pd
import shap


# =========================
# Rutas y carga de artefactos
# =========================

# Directorio base de ml-credit 
ML_CREDIT_DIR = Path(__file__).resolve().parents[2]

MODELS_DIR = ML_CREDIT_DIR / "models"
ARTIFACTS_DIR = ML_CREDIT_DIR / "artifacts"

MODEL_PATH = MODELS_DIR / "credit_pipeline_v1.joblib"
METRICS_PATH = ARTIFACTS_DIR / "metrics_credit_v1.json"

# Cargar modelo entrenado (pipeline: preprocess + classifier)
best_model = joblib.load(MODEL_PATH)

# Cargar configuración y métricas
with open(METRICS_PATH, "r", encoding="utf-8") as f:
    metrics_config = json.load(f)

numeric_features: List[str] = metrics_config["features"]["numeric"]
categorical_features: List[str] = metrics_config["features"]["categorical"]

# Extraer preprocesador y clasificador del pipeline
preprocessor = best_model.named_steps["preprocess"]
clf = best_model.named_steps["classifier"]

# Preparar nombres de features transformadas (para SHAP)
numeric_names = numeric_features
ohe = preprocessor.named_transformers_["cat"]
ohe_feature_names = ohe.get_feature_names_out(categorical_features)
feature_names_transformed = np.concatenate([numeric_names, ohe_feature_names])

# Crear un masker independiente (cada feature se trata de forma separada)
masker = shap.maskers.Independent(
    data=np.zeros((1, len(feature_names_transformed)))
)

# Crear explainer SHAP para modelo lineal
explainer = shap.LinearExplainer(
    model=clf,
    masker=masker
)
