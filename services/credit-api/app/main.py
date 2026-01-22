from fastapi import FastAPI
from ml_credit import api as credit_api

app = FastAPI(
    title="Credit Scoring API",
    version="0.1.0",
    description="API para evaluar riesgo de crédito usando el módulo ml_credit.",
)


@app.post("/score")
def score_credit(payload: dict):
    """
    Recibe un diccionario con las variables de entrada del modelo y devuelve:
    - probabilidad de default
    - banda de riesgo
    - explicaciones por variable
    """
    return credit_api.score_application(payload)
