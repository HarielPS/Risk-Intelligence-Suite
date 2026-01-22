# ml-credit

`ml-credit` es un módulo de **credit scoring con explicabilidad** que forma parte del proyecto
**Risk Intelligence Suite**.

Este subproyecto implementa un pipeline completo de inferencia para evaluación de riesgo crediticio,
incluyendo:

- Predicción de probabilidad de incumplimiento (default)
- Asignación de banda de riesgo
- Explicaciones locales basadas en SHAP
- Traducción de variables técnicas a lenguaje de negocio

---

## Estructura del proyecto

```text
ml-credit/
├─ pyproject.toml
├─ README.md
├─ models/            # Modelos entrenados (no versionados en git)
├─ artifacts/         # Métricas y outputs del entrenamiento
└─ src/
   └─ ml_credit/
      ├─ __init__.py
      ├─ inference.py
      ├─ shap_explain.py
      ├─ translate.py
      ├─ diccionario.py
      ├─ score.py
      └─ api.py
```

## Descripción de módulos

### `inference.py`

Responsable de la carga y preparación del modelo de crédito. Este módulo:

- Carga el pipeline entrenado (modelo + preprocesamiento) usando `joblib`.
- Define las variables numéricas y categóricas esperadas por el modelo.
- Inicializa el `preprocessor`, el modelo final y el objeto `explainer` de SHAP.
- Expone las rutas a los modelos entrenados y a los artefactos generados durante el entrenamiento.

---

### `shap_explain.py`

Encargado de la explicabilidad local del modelo:

- Calcula los valores SHAP para una sola solicitud de crédito.
- Obtiene la probabilidad estimada de incumplimiento (default).
- Identifica las variables más influyentes en la predicción.
- Devuelve la información técnica necesaria para su posterior interpretación.

---

### `diccionario.py`

Define los metadatos necesarios para interpretar las variables del modelo:

- Mapeo de nombres técnicos de las variables a etiquetas legibles.
- Diccionarios de valores categóricos a descripciones comprensibles.
- Centraliza la lógica de interpretación semántica de las variables.

---

### `translate.py`

Traduce los resultados técnicos del modelo a lenguaje de negocio:

- Interpreta los valores SHAP generados por el modelo.
- Genera explicaciones textuales para cada variable relevante.
- Determina si una variable incrementa o reduce el riesgo de incumplimiento.
- Produce explicaciones entendibles para usuarios no técnicos y perfiles de negocio.

---

### `score.py`

Implementa la lógica de negocio del proceso de scoring:

- Combina la predicción del modelo con su explicación.
- Asigna una banda de riesgo (LOW, MEDIUM, HIGH) en función de la probabilidad de default.
- Estructura la salida final del scoring de manera consistente.
- Prepara el resultado para su consumo por servicios externos.

---

### `api.py`

Actúa como punto de entrada del módulo:

- Valida y normaliza los datos de entrada recibidos como diccionario.
- Ordena las variables según el esquema esperado por el modelo.
- Construye el `DataFrame` utilizado para la inferencia.
- Expone la función pública `score_application(...)` para integrar el módulo con otros sistemas.

---

## Instalación (modo desarrollo)

Desde la carpeta `ml-credit/`, con el entorno virtual activado:

```bash
pip install -e .
```

Este comando instala el paquete `ml_credit` en modo editable, permitiendo realizar cambios en el código sin reinstalar el paquete.

### Uso básico

Ejemplo de uso del módulo desde Python, a partir de un diccionario con las variables del solicitante:

```py
from ml_credit import api

sample = {
    # Diccionario con todas las variables requeridas por el modelo
}

result = api.score_application(sample)
```

El resultado incluye:

- Probabilidad de incumplimiento.
- Banda de riesgo asignada.
- Explicaciones por variable en lenguaje humano.

### Notas adicionales

- Los modelos entrenados y los artefactos de entrenamiento no se versionan en git.

- El módulo está diseñado para ser utilizado como microservicio de inferencia.

- La estructura permite extender fácilmente el sistema con nuevos modelos o reglas de negocio.

- Puede integrarse directamente con frameworks web como FastAPI o Flask.

Cuando quieras, en el siguiente mensaje seguimos con:

- mejorar el `README` general del repo,
- documentar `architecture.md`,
- o dejar el `ml-credit` listo para FastAPI + Docker.
