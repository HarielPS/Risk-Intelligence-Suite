# Risk-Intelligence-Suite

## Organizacion carpetas

risk-intelligence-suite/
├── README.md
├── docker-compose.yml          # Opcional pero muy bueno para la demo
├── .gitignore
├── package.json                # Del frontend
│
├── docs/
│   ├── architecture.md         # Detalle de arquitectura y módulos 2 y 3
│   └── api_contracts.md        # Esquemas JSON y ejemplos de requests/responses
│
├── data/
│   ├── raw/                    # Datasets originales (gitignored)
│   ├── processed/              # Datasets limpios / features (gitignored)
│   └── README.md               # De dónde salen los datos, enlaces a fuentes
│
├── notebooks/
│   └── 01_credit_eda_training.ipynb  # EDA + entrenamiento inicial
│
├── infra/
│   ├── env.example             # Variables de entorno ejemplo (ports, URIs)
│   └── mongo-init.js           # Opcional: índices, colecciones, seeds
│
├── backend/                    # API de negocio (FastAPI + Mongo)
│   ├── src/
│   │   ├── main.py             # Crea app FastAPI, incluye routers
│   │   ├── config.py           # Config (env vars, URLs de servicios, etc.)
│   │   ├── db.py               # Conexión a MongoDB
│   │   ├── models.py           # Esquemas Pydantic de dominio
│   │   ├── repositories.py     # Acceso a BD (CRUD)
│   │   ├── services/           # Lógica de negocio
│   │   │   ├── credit_service.py    # Orquesta scoring + carta
│   │   │   ├── text_service.py      # Stub para módulo NLP
│   │   │   └── anomaly_service.py   # Stub para módulo anomalías
│   │   ├── routers/            # Endpoints expuestos
│   │   │   ├── applications.py  # /applications, /applications/{id}
│   │   │   ├── health.py        # /health
│   │   │   └── letters.py       # (opcional) /applications/{id}/letter
│   │   └── utils/
│   │       ├── logging.py       # Logger estructurado (si lo usas)
│   │       └── schemas_shared.py # Tipos compartidos para contratos
│   ├── tests/
│   │   └── test_applications.py # Tests de endpoints clave
│   └── request.txt             # requirements backend
│
├── ml-credit/                  # Microservicio 1: scoring + SHAP
│   ├── models/                 # Modelos entrenados (.joblib, .pkl)
│   │   ├── credit_pipeline.joblib
│   │   └── shap_background.npy # (opcional) background para SHAP
│   ├── artifacts/              # Métricas, feature importance global, etc.
│   │   └── metrics_credit_v1.json
│   ├── src/
│   │   ├── main.py             # FastAPI app con /score y /health
│   │   ├── config.py           # Rutas de modelos, versionado
│   │   ├── data.py             # Carga y preprocesamiento de dataset
│   │   ├── training.py         # Entrenamiento y guardado de modelos
│   │   ├── inference.py        # Funciones de scoring + SHAP local
│   │   └── schemas.py          # Pydantic models para request/response /score
│   ├── tests/
│   │   └── test_inference.py
│   └── request.txt             # requirements ml-credit
│
├── ml-letter/                  # Microservicio 1.5: “Cartas de explicabilidad”
│   ├── templates/              # Plantillas base de cartas (Jinja2 o similar)
│   │   ├── decline_es.txt
│   │   ├── approve_es.txt
│   │   └── review_es.txt
│   ├── src/
│   │   ├── main.py             # FastAPI app con /generate_letter
│   │   ├── config.py           # Feature flags (template vs LLM), etc.
│   │   ├── templates_engine.py # Lógica para armar carta desde reason_codes
│   │   ├── schemas.py          # Pydantic para request/response de cartas
│   │   └── llm_client.py       # (opcional) stub de cliente LLM
│   ├── tests/
│   │   └── test_templates_engine.py
│   └── request.txt             # requirements ml-letter
│
├── ml-text/                    # Módulo 2 (diseñado / opcional)
│   ├── src/
│   │   ├── main.py             # FastAPI con /classify_text (stub o simple)
│   │   ├── config.py
│   │   ├── preprocessing.py
│   │   ├── training.py         # TF-IDF + Logistic (si da tiempo)
│   │   ├── inference.py
│   │   └── schemas.py
│   ├── models/                 # Modelo de texto
│   └── request.txt             # requirements ml-text
│
├── ml-anomaly/                 # Módulo 3 (diseñado / opcional)
│   ├── src/
│   │   ├── main.py             # FastAPI con /detect_anomalies (stub o simple)
│   │   ├── config.py
│   │   ├── training.py         # Isolation Forest / LOF / autoencoder
│   │   ├── inference.py
│   │   └── schemas.py
│   ├─── models/
│   └── request.txt             # requirements ml-anomaly
│
├── vector-store/               # Integración futura con base vectorial
│   ├── src/
│   │   ├── client.py           # Cliente para Chroma/Qdrant
│   │   ├── embeddings.py       # Cómo generas embeddings de casos
│   │   └── indexer.py          # Cómo indexas solicitudes ya guardadas
│   └── README.md               # Diseño del endpoint /applications/{id}/similar
│
└── frontend/                   # Next.js + Tailwind
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx            # landing / explicación del producto
    │   ├── client/
    │   │   └── page.tsx        # simulador de crédito (vista cliente)
    │   ├── executive/
    │   │   ├── page.tsx        # lista de solicitudes
    │   │   └── [id]/page.tsx   # detalle de una solicitud
    │   └── components/
    │       ├── RiskBadge.tsx   # chip de LOW/MEDIUM/HIGH
    │       ├── FeatureList.tsx # lista de top_features
    │       ├── LetterCard.tsx  # muestra carta de explicabilidad
    │       └── LayoutShell.tsx # layout general
    ├── lib/
    │   └── api.ts              # funciones para llamar al backend
    ├── styles/
    │   └── globals.css
    ├── tailwind.config.js
    └── tsconfig.json

## Data

Descripcion:

url del dataset:
<https://archive.ics.uci.edu/dataset/573/south+german+credit+update>

url de kaggle:
<https://www.kaggle.com/datasets/varunchawla30/german-credit-data/data>

South German Credit [Dataset]. (2020). UCI Machine Learning Repository. <https://doi.org/10.24432/C5QG88.>

<!-- Para instalar -->

cd Risk-Intelligence-Suite

python -m venv .venv
source .venv/bin/activate

pip install -e ./ml-credit

Los notebooks dependen del módulo `ml-credit`.  
Instalar con: `pip install -r notebooks/requirements.txt`.
<!-- pip install -r notebooks/requirements.txt
pip install -r services/credit-api/requirements.txt -->

<!-- correr FastAPI localmente -->
cd services/credit-api
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

<!-- Modo Docker / Compose -->

cd Risk-Intelligence-Suite
docker compose up --build credit-api
