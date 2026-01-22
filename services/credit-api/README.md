# Credit API

Servicio FastAPI que expone el módulo `ml_credit` como una API HTTP
para evaluación de riesgo de crédito.

## Requisitos

- Python 3.10+
- Entorno virtual recomendado
- Módulo `ml_credit` instalado en modo editable

## Instalación (modo desarrollo)

Desde la raíz del repositorio `Risk-Intelligence-Suite`:

```bash
# Activar entorno virtual
source .venv/bin/activate

# Instalar el módulo de scoring
pip install -e ./ml-credit

# Instalar dependencias del servicio
pip install -r services/credit-api/requirements.txt
```

## Ejecución local

Desde la carpeta services/credit-api:

```bash
cd services/credit-api
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

La documentación interactiva estará disponible en:

- Swagger UI: <http://localhost:8000/docs>
- ReDoc: <http://localhost:8000/redoc>

## Ejemplo de petición

`POST /score`

```bash
{
  "Duration": 12,
  "CreditAmount": 5000,
  "Age": 35,
  "...": "..."
}
```

La respuesta incluye:

- probability_default: probabilidad de incumplimiento.
- risk_band: banda de riesgo (LOW, MEDIUM, HIGH).
- top_features: lista de variables con su impacto y explicación en lenguaje de negocio.

---

## Resumen para que alguien más pueda instalar TODO rápido

Si alguien clona tu repo:

```bash
git clone <tu-repo>
cd Risk-Intelligence-Suite
python -m venv .venv
source .venv/bin/activate

# 1. Instalar módulo de scoring
pip install -e ./ml-credit

# 2. Instalar dependencias del servicio FastAPI
pip install -r services/credit-api/requirements.txt

# 3. Levantar la API
cd services/credit-api
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Con eso:

- tiene TODAS las dependencias correctas,
- tanto de ml_credit como de FastAPI,
- sin duplicar nada en mil requirements.
