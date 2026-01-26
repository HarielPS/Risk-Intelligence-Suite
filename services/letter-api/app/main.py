from fastapi import FastAPI
from pydantic import BaseModel
from typing import Any, Dict

from ml_letter import api as letter_api

app = FastAPI(
    title="Credit Letter API",
    version="0.1.0",
    description="API para generar cartas de explicabilidad de crédito usando ml_letter.",
)

class LetterPayload(BaseModel):
    __root__: Dict[str, Any]

    def to_dict(self) -> Dict[str, Any]:
        return self.__root__

@app.post("/letter")
def generate_credit_letter(payload: LetterPayload):
    """
    Recibe un payload con la misma estructura que usas en el notebook
    (application, customer, topFeatures, etc.) y devuelve la carta final.
    """
    return letter_api.generate_letter_api(payload.to_dict())
