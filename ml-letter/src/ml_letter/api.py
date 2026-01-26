from typing import Dict, Any
from .generator import generate_letter

def generate_letter_api(payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Función de alto nivel para el microservicio de CARTAS.

    Espera un payload con al menos:
      - application: { riskBand, probabilityDefault, ... }
      - customer: { name, ... }
      - topFeatures, etc. (según tu diseño actual)

    Devuelve un dict con la carta final:
      - decision
      - subject
      - letterText
      - bullets
      - safetyFlags
    """
    app = payload.get("application")
    
    if not app:
        raise ValueError("Falta 'application' en el payload")

    return generate_letter(payload)
