# src/ml_letter/prompts.py
from __future__ import annotations
from typing import Dict, Any
import json

from .rag_policies import search_policy_context

few_shot_examples = [
    {
        "input": {
            "applicationId": "APP-0001-LOW-MIXED",
            "riskBand": "LOW",
            "probabilityDefault": 0.28,
            "amount": 5000,
            "durationMonths": 24,
            "decision": "APPROVE",
            "customer": {
                "id": "CUST-LOW-002",
                "name": "Ejemplo Perfil Mixto",
                "income": 24000,
                "status": "ACTIVE"
            },
            "positiveFactors": [
                {
                    "feature": "Purpose",
                    "label": "Propósito del crédito",
                    "value": "Automóvil (nuevo)",
                    "impact_text": "reduce el riesgo de incumplimiento"
                },
                {
                    "feature": "OtherInstallmentPlans",
                    "label": "Otros planes de pago",
                    "value": "Ninguno",
                    "impact_text": "reduce el riesgo de incumplimiento"
                }
            ],
            "riskFactors": [
                {
                    "feature": "Status",
                    "label": "Estado de la cuenta corriente",
                    "value": "Saldo < 0",
                    "impact_text": "incrementa el riesgo de incumplimiento"
                }
            ]
        },
        "output": {
            "decision": "APPROVE",
            "letterSubject": "Resultado preliminar de tu solicitud de crédito",
            "letterText": """Estimado(a) Ejemplo Perfil Mixto:

Con base en una evaluación preliminar de tu solicitud de crédito, se observa un perfil con características intermedias y algunos elementos positivos, por lo que requiere un análisis adicional. Esta evaluación se realiza conforme a nuestras políticas internas y a la normatividad aplicable, respetando los principios de honestidad, transparencia y trato digno hacia nuestros clientes.

De manera preliminar, se identifican los siguientes factores que contribuyen positivamente a tu evaluación:

- Propósito del crédito: Automóvil (nuevo). Reduce el riesgo de incumplimiento.
- Otros planes de pago: Ninguno. Reduce el riesgo de incumplimiento.

Asimismo, se identifica el siguiente factor que podría incrementar el nivel de riesgo y que será considerado en el análisis integral:

- Estado de la cuenta corriente: Saldo < 0. Incrementa el riesgo de incumplimiento.

Te recordamos que esta es una valoración preliminar basada en la información disponible. La decisión final sobre tu solicitud será analizada y comunicada por el personal de Grupo Financiero Inbursa a través de los canales oficiales.

Agradecemos la confianza que depositas en nosotros y reiteramos nuestro compromiso de brindarte un servicio claro, profesional y libre de cualquier tipo de discriminación.

Atentamente,
Área de Crédito
Grupo Financiero Inbursa""",
            "bullets": [
                "Propósito del crédito: Automóvil (nuevo). Reduce el riesgo de incumplimiento.",
                "Otros planes de pago: Ninguno. Reduce el riesgo de incumplimiento.",
                "Estado de la cuenta corriente: Saldo < 0. Incrementa el riesgo de incumplimiento."
            ],
            "safetyFlags": []
        }
    },
    {
        "input": {
            "applicationId": "APP-0002-MEDIUM",
            "riskBand": "MEDIUM",
            "probabilityDefault": 0.52,
            "amount": 15000,
            "durationMonths": 36,
            "decision": "REVIEW",
            "customer": {
                "id": "CUST-MED-001",
                "name": "María López",
                "income": 22000,
                "status": "ACTIVE"
            },
            "positiveFactors": [
                {
                    "feature": "Savings",
                    "label": "Cuenta de ahorros",
                    "value": "Ahorros moderados",
                    "impact_text": "ayuda a compensar parcialmente el riesgo"
                }
            ],
            "riskFactors": [
                {
                    "feature": "CreditHistory",
                    "label": "Historial crediticio",
                    "value": "Algunos retrasos en el pasado",
                    "impact_text": "incrementa el riesgo por incumplimientos previos"
                },
                {
                    "feature": "Status",
                    "label": "Estado de la cuenta corriente",
                    "value": "Saldo negativo reciente",
                    "impact_text": "indica presión de liquidez y aumenta el riesgo"
                },
                {
                    "feature": "InstallmentRate",
                    "label": "Cuota sobre el ingreso",
                    "value": "Entre 25% y 35% del ingreso",
                    "impact_text": "la carga de deuda es relevante respecto al ingreso"
                },
                {
                    "feature": "Duration",
                    "label": "Duración del crédito",
                    "value": "Plazo medio",
                    "impact_text": "mayor plazo implica mayor exposición al riesgo"
                }
            ]
        },
        "output": {
            "decision": "REVIEW",
            "letterSubject": "Tu solicitud de crédito está en revisión preliminar",
            "letterText": """Estimado(a) María López:

Hemos realizado una evaluación preliminar de la información proporcionada en tu solicitud de crédito. Esta revisión se lleva a cabo en apego a nuestras políticas internas, a la regulación aplicable y a los principios de claridad, responsabilidad y respeto hacia nuestros clientes.

De manera inicial, se identifican los siguientes factores que incrementan el riesgo en tu evaluación:

- Historial crediticio: Algunos retrasos en el pasado. Esto incrementa el riesgo por incumplimientos previos.
- Estado de la cuenta corriente: Saldo negativo reciente. Esto indica presión de liquidez y aumenta el riesgo.
- Cuota sobre el ingreso: Entre 25% y 35% del ingreso. La carga de deuda es relevante respecto a tu ingreso.
- Duración del crédito: Plazo medio. Un mayor plazo implica una mayor exposición al riesgo a lo largo del tiempo.

Asimismo, se identifican los siguientes factores que ayudan a mitigar parcialmente el riesgo:

- Cuenta de ahorros: Ahorros moderados. Esto ayuda a compensar parcialmente el riesgo identificado.

Con base en lo anterior, tu solicitud se encuentra en revisión adicional. Es posible que nos pongamos en contacto contigo para solicitar información complementaria o para proponerte ajustes de monto o plazo que resulten más adecuados y sostenibles para ti.

Te recordamos que esta es una evaluación preliminar y que la decisión final sobre tu solicitud será comunicada por el personal de Grupo Financiero Inbursa a través de los canales oficiales.

Agradecemos tu comprensión y la confianza depositada en nosotros. Este proceso se realiza con criterios objetivos, sin discriminación y respetando en todo momento la confidencialidad de tu información.

Atentamente,
Área de Crédito
Grupo Financiero Inbursa""",
            "bullets": [
                "Factores que incrementan el riesgo: retrasos previos en el historial crediticio.",
                "Factores que incrementan el riesgo: saldo negativo reciente en la cuenta corriente.",
                "Factores que incrementan el riesgo: cuota mensual estimada entre 25% y 35% del ingreso.",
                "Factores que incrementan el riesgo: plazo medio que incrementa la exposición al riesgo.",
                "Factor que mitiga parcialmente el riesgo: cuenta de ahorros con ahorros moderados."
            ],
            "safetyFlags": []
        }
    },
    {
        "input": {
            "applicationId": "APP-0003-HIGH",
            "riskBand": "HIGH",
            "probabilityDefault": 0.83,
            "amount": 40000,
            "durationMonths": 48,
            "decision": "DECLINE",
            "customer": {
                "id": "CUST-HIGH-001",
                "name": "Carlos Ramírez",
                "income": 18000,
                "status": "ACTIVE"
            },
            "positiveFactors": [],
            "riskFactors": [
                {
                    "feature": "CreditHistory",
                    "label": "Historial crediticio",
                    "value": "Retrasos significativos en el pasado",
                    "impact_text": "incrementa significativamente el riesgo de incumplimiento"
                },
                {
                    "feature": "Savings",
                    "label": "Cuenta de ahorros",
                    "value": "Sin ahorros registrados",
                    "impact_text": "no se observa respaldo de liquidez"
                },
                {
                    "feature": "NumberExistingCredits",
                    "label": "Número de créditos vigentes",
                    "value": "Varios créditos activos",
                    "impact_text": "indica un nivel elevado de endeudamiento"
                },
                {
                    "feature": "CreditAmount",
                    "label": "Monto del crédito",
                    "value": "Monto alto",
                    "impact_text": "el monto solicitado es elevado respecto al perfil"
                },
                {
                    "feature": "InstallmentRate",
                    "label": "Cuota sobre el ingreso",
                    "value": "35% o más del ingreso",
                    "impact_text": "la carga de deuda sería muy alta"
                }
            ]
        },
        "output": {
            "decision": "DECLINE",
            "letterSubject": "Resultado preliminar de la evaluación de tu solicitud de crédito",
            "letterText": """Estimado(a) Carlos Ramírez:

Agradecemos el interés que has mostrado en nuestros productos y el tiempo dedicado a presentar tu solicitud de crédito.

Con base en un análisis preliminar realizado conforme a nuestras políticas internas, a la regulación vigente y a los principios de honestidad, transparencia y no discriminación, se han identificado diversos factores que podrían dificultar la aprobación de tu solicitud:

De manera preliminar, se identifican los siguientes factores que incrementan de forma importante el riesgo en tu evaluación:

- Historial crediticio: Retrasos significativos en el pasado. Esto incrementa significativamente el riesgo de incumplimiento.
- Cuenta de ahorros: Sin ahorros registrados. No se observa respaldo de liquidez para nuevas obligaciones.
- Número de créditos vigentes: Varios créditos activos. Esto indica un nivel elevado de endeudamiento.
- Monto del crédito: Monto alto. El monto solicitado es elevado respecto a tu perfil financiero.
- Cuota sobre el ingreso: 35% o más del ingreso. La carga de deuda sería muy alta y podría comprometer tu capacidad de pago.

En esta evaluación preliminar no se han identificado factores suficientes que compensen estos riesgos, por lo que, de forma inicial, se aprecia un perfil con un nivel de riesgo elevado para la aprobación del crédito.

Esta evaluación es preliminar y no constituye, por sí misma, una decisión definitiva. La determinación final sobre tu solicitud será tomada y comunicada por el personal de Grupo Financiero Inbursa, considerando la información disponible y, en su caso, la documentación adicional que se integre al expediente.

Te invitamos a considerar alternativas para mejorar tu situación financiera, como reducir parte de tu endeudamiento actual, fortalecer tu ahorro y procurar un historial de pagos puntual. En el futuro podrás presentar una nueva solicitud, la cual será evaluada de acuerdo con las condiciones que presentes en ese momento.

Reiteramos nuestro compromiso de brindarte siempre un trato respetuoso, equitativo y confidencial, acorde con nuestro Código de Ética.

Atentamente,
Área de Crédito
Grupo Financiero Inbursa""",
            "bullets": [
                "Historial crediticio: retrasos significativos en el pasado. Incrementa significativamente el riesgo de incumplimiento.",
                "Cuenta de ahorros: sin ahorros registrados. No se observa respaldo de liquidez.",
                "Número de créditos vigentes: varios créditos activos. Indica un nivel elevado de endeudamiento.",
                "Monto del crédito: monto alto. El monto solicitado es elevado respecto al perfil financiero.",
                "Cuota sobre el ingreso: 35% o más del ingreso. La carga de deuda sería muy alta y podría comprometer la capacidad de pago."
            ],
            "safetyFlags": []
        }
    }
]


def format_few_shot_block(few_shot_examples):
    blocks = []
    for i, ex in enumerate(few_shot_examples, start=1):
        inp = json.dumps(ex["input"], ensure_ascii=False, indent=2)
        out = json.dumps(ex["output"], ensure_ascii=False, indent=2)
        block = f"""### EJEMPLO {i}

JSON_INPUT:
{inp}

JSON_OUTPUT:
{out}
"""
        blocks.append(block)
    return "\n\n".join(blocks)



few_shot_block = format_few_shot_block(few_shot_examples)

# system_prompt = """
# Eres un asistente de redacción para Grupo Financiero Inbursa.
# ...
# """.strip()
system_prompt = """
Eres un asistente de redacción para Grupo Financiero Inbursa.

Tu función es redactar CARTAS DE EVALUACIÓN PRELIMINAR de solicitudes de crédito,
usando exclusivamente la información que se te proporciona en formato JSON.

REGLAS OBLIGATORIAS:
- No decides la aprobación ni el rechazo definitivo.
- La decisión final siempre será comunicada por personal de Grupo Financiero Inbursa.
- El campo "decision" YA VIENE definido en el JSON y NO debes modificarlo.
- Usa el campo "decision" únicamente para ajustar el tono de la carta:
  - "APPROVE": describe un perfil preliminarmente favorable.
  - "REVIEW": describe un perfil con características intermedias, con elementos positivos
    pero que requiere un análisis adicional.
  - "DECLINE": describe un perfil con un nivel de riesgo elevado.

- NUNCA utilices expresiones como "perfil favorable", "resulta favorable" o equivalentes
  cuando "decision" sea "REVIEW" o "DECLINE".
- Para casos "REVIEW", utiliza únicamente formulaciones como:
  "perfil intermedio",
  "perfil con características intermedias",
  o "perfil que requiere un análisis adicional".
- Para casos "DECLINE", utiliza formulaciones que indiquen un nivel de riesgo elevado,
  sin emitir juicios de valor ni lenguaje definitivo.

- Usa el campo "riskFactorsCount" para decidir el uso correcto de singular o plural
  al introducir la sección de factores de riesgo:
  - Si es 1, utiliza expresiones en singular ("el siguiente factor").
  - Si es mayor a 1, utiliza expresiones en plural ("los siguientes factores").
  - La redacción debe ser estrictamente consistente con el número de factores listados.

- Si "riskFactors" está vacío, NO incluyas una sección de factores de riesgo
  ni frases indicando que no se identificaron riesgos.


- Usa "positiveFactors" únicamente para describir factores que benefician al cliente.
- Usa "riskFactors" únicamente para describir factores que incrementan el riesgo.
- No inventes factores, cifras, montos, condiciones ni interpretaciones que no estén
  explícitamente presentes en el JSON.
- No menciones atributos sensibles (ya vienen filtrados): raza, sexo, edad u otros similares.
- Mantén un tono respetuoso, claro, empático, profesional y no discriminatorio.
- Aclara siempre que se trata de una evaluación preliminar y que la decisión final
  será comunicada por personal del banco a través de canales oficiales.

- Si el campo "customer.name" está presente, dirígete al cliente usando ese nombre.
- Si no hay nombre disponible, utiliza una forma genérica como "Estimado(a) cliente".
- No inventes nombres bajo ninguna circunstancia.

ESTRUCTURA DE LA CARTA (dentro de "letterText"):

1) Párrafo inicial:
   - Indica claramente que se trata de una evaluación preliminar de la solicitud de crédito.
   - Describe la situación del caso según el valor de "decision".
   - Aclara que la decisión final depende de una revisión interna y será notificada al cliente
     por los canales oficiales de Grupo Financiero Inbursa.

2) Sección de factores positivos (solo si "positiveFactors" NO está vacío):
   - Incluye un encabezado como:
     "Factores que contribuyen positivamente a tu evaluación".
   - Describe cada elemento de "positiveFactors" de forma clara, sencilla y comprensible.

3) Sección de factores de riesgo (solo si "riskFactors" NO está vacío):
   - Incluye un encabezado como:
     "Factores que podrían incrementar el nivel de riesgo".
   - Utiliza singular o plural de forma estricta según "riskFactorsCount".
   - Explica estos factores de manera respetuosa, objetiva y sin emitir juicios de valor.

4) Cierre:
   - Reitera que se trata de una evaluación preliminar.
   - Agradece la confianza del cliente.
   - Invita a estar atento a la comunicación oficial del banco.
   - Puedes sugerir, de forma general, que mantener un historial de pagos puntual
     y un nivel de endeudamiento adecuado puede contribuir a evaluaciones futuras.

FORMATO DE SALIDA (EXACTO):

Debes responder ÚNICAMENTE con un JSON con la siguiente estructura:

{
  "decision": "APPROVE" | "REVIEW" | "DECLINE",
  "letterSubject": "string",
  "letterText": "string",
  "bullets": ["string"],
  "safetyFlags": []
}

REGLAS DEL JSON:
- "decision": copia EXACTAMENTE el valor que recibas en el JSON de entrada.
- "letterSubject": un asunto breve, claro y coherente con el estatus preliminar.
- "letterText": el texto completo de la carta, en español, siguiendo la estructura indicada.
- "bullets": puntos clave resumidos, coherentes con el contenido de la carta.
- "safetyFlags": SIEMPRE debe ser una lista vacía [].

No incluyas texto fuera del JSON.
""".strip()


MAX_POLICY_CHARS = 6000


def build_user_prompt(payload: Dict[str, Any]) -> str:
    """
    Versión alineada con el notebook:
    - Limita contexto de políticas
    - Incluye FEW_SHOT_EXAMPLES
    - Incluye JSON_INPUT completo
    - Repite instrucciones clave de evaluación preliminar
    """
    app = payload["application"]
    customer = payload.get("customer", {})

    # 1) RAG sobre políticas
    query = f"solicitud de crédito {app.get('riskBand')} riesgo, prob={app.get('probabilityDefault')}"
    policy_context_text = search_policy_context(query, top_k=3)
    policy_context_for_prompt = policy_context_text[:MAX_POLICY_CHARS]

    # 2) Construimos el JSON de entrada para el LLM
    letter_input = {
        "customer": customer,
        "application": app,
        "positiveFactors": payload.get("positiveFactors", []),
        "riskFactors": payload.get("riskFactors", []),
        "decision": payload.get("decision"),
        "riskFactorsCount": len(payload.get("riskFactors", [])),
    }

    letter_input_json_str = json.dumps(
        letter_input, ensure_ascii=False, indent=2
    )

    # 3) Prompt de usuario tipo notebook
    user_prompt = f"""
A continuación tienes información de contexto sobre el Código de Ética y las políticas internas del banco.
Debes respetar este contexto: no inventes artículos, cláusulas ni obligaciones que no estén aquí.

POLICY_CONTEXT:
\"\"\"
{policy_context_for_prompt}
\"\"\"

Tienes también algunos EJEMPLOS de cómo estructurar la carta (si se proporcionaron):

FEW_SHOT_EXAMPLES:
\"\"\"
{few_shot_examples}
\"\"\"

Tu tarea es redactar una carta de evaluación preliminar para la siguiente solicitud de crédito,
usando EXCLUSIVAMENTE la información del siguiente JSON de entrada:

JSON_INPUT:
{letter_input_json_str}

Instrucciones clave para esta tarea:
- Usa el POLICY_CONTEXT solo como referencia de tono ético y principios generales.
- Imita el estilo de los FEW_SHOT_EXAMPLES en estructura y nivel de detalle (si hay ejemplos).
- Explica la situación como una EVALUACIÓN PRELIMINAR, no como una decisión definitiva.
- Indica que la decisión final será comunicada por el personal de Inbursa.
- Genera la carta y el JSON de salida siguiendo estrictamente las reglas
  y el formato definidos en el mensaje del sistema.
""".strip()

    return user_prompt