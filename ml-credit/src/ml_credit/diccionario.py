# =========================
# Diccionarios para explicaciones humanas
# =========================

FEATURE_LABELS = {
    "Status": "Estado de la cuenta corriente",
    "CreditHistory": "Historial crediticio",
    "Purpose": "Propósito del crédito",
    "Savings": "Cuenta de ahorros",
    "EmploymentDuration": "Antigüedad laboral",
    "InstallmentRate": "Porcentaje de la cuota sobre el ingreso",
    "PersonalStatusSex": "Estado civil y sexo",
    "OtherDebtors": "Otros deudores o garantes",
    "PresentResidence": "Tiempo en la residencia actual",
    "Property": "Propiedad",
    "OtherInstallmentPlans": "Otros planes de pago",
    "Housing": "Tipo de vivienda",
    "NumberExistingCredits": "Número de créditos existentes",
    "Job": "Ocupación",
    "PeopleLiable": "Personas a cargo",
    "Telephone": "Teléfono",
    "ForeignWorker": "Trabajador extranjero",
    "Duration": "Duración del crédito (meses)",
    "CreditAmount": "Monto del crédito",
    "Age": "Edad",
}

STATUS_MAP = {
    1: "Sin cuenta corriente",
    2: "Saldo < 0",
    3: "0 ≤ saldo < 200",
    4: "≥ 200 o salario por ≥ 1 año",
}

CREDIT_HISTORY_MAP = {
    0: "Retrasos en pagos en el pasado",
    1: "Cuenta crítica u otros créditos en otras instituciones",
    2: "Sin créditos previos / créditos pagados correctamente",
    3: "Créditos existentes pagados correctamente hasta ahora",
    4: "Todos los créditos en este banco pagados correctamente",
}

PURPOSE_MAP = {
    0: "Otros",
    1: "Automóvil (nuevo)",
    2: "Automóvil (usado)",
    3: "Muebles / equipamiento",
    4: "Radio / televisión",
    5: "Electrodomésticos",
    6: "Reparaciones",
    7: "Educación",
    8: "Vacaciones",
    9: "Reentrenamiento",
    10: "Negocios",
}

SAVINGS_MAP = {
    1: "Desconocido / sin ahorros",
    2: "< 100",
    3: "100 ≤ ahorro < 500",
    4: "500 ≤ ahorro < 1000",
    5: "≥ 1000",
}

EMPLOYMENT_MAP = {
    1: "Desempleado",
    2: "< 1 año",
    3: "1 a < 4 años",
    4: "4 a < 7 años",
    5: "≥ 7 años",
}

INSTALLMENT_RATE_MAP = {
    1: "≥ 35% del ingreso",
    2: "25% a < 35% del ingreso",
    3: "20% a < 25% del ingreso",
    4: "< 20% del ingreso",
}

PERSONAL_STATUS_SEX_MAP = {
    1: "Hombre: divorciado/separado",
    2: "Mujer: no soltera / Hombre: soltero",
    3: "Hombre: casado/viudo",
    4: "Mujer: soltera",
}

OTHER_DEBTORS_MAP = {
    1: "Ninguno",
    2: "Co-solicitante",
    3: "Garante",
}

PRESENT_RESIDENCE_MAP = {
    1: "< 1 año",
    2: "1 a < 4 años",
    3: "4 a < 7 años",
    4: "≥ 7 años",
}

PROPERTY_MAP = {
    1: "Desconocida / sin propiedad",
    2: "Automóvil u otra propiedad",
    3: "Ahorros vivienda / seguro de vida",
    4: "Bienes raíces",
}

OTHER_INSTALLMENT_PLANS_MAP = {
    1: "Banco",
    2: "Tiendas",
    3: "Ninguno",
}

HOUSING_MAP = {
    1: "Vivienda gratuita",
    2: "Alquiler",
    3: "Propia",
}

NUMBER_CREDITS_MAP = {
    1: "1 crédito",
    2: "2–3 créditos",
    3: "4–5 créditos",
    4: "≥ 6 créditos",
}

JOB_MAP = {
    1: "Desempleado / no calificado (no residente)",
    2: "No calificado (residente)",
    3: "Empleado calificado / funcionario",
    4: "Gerente / autónomo / altamente calificado",
}

PEOPLE_LIABLE_MAP = {
    1: "3 o más personas a cargo",
    2: "0 a 2 personas a cargo",
}

TELEPHONE_MAP = {
    1: "Sin teléfono a nombre del cliente",
    2: "Con teléfono a nombre del cliente",
}

FOREIGN_WORKER_MAP = {
    1: "Trabajador extranjero",
    2: "No es trabajador extranjero",
}

CATEGORY_VALUE_MAPS = {
    "Status": STATUS_MAP,
    "CreditHistory": CREDIT_HISTORY_MAP,
    "Purpose": PURPOSE_MAP,
    "Savings": SAVINGS_MAP,
    "EmploymentDuration": EMPLOYMENT_MAP,
    "InstallmentRate": INSTALLMENT_RATE_MAP,
    "PersonalStatusSex": PERSONAL_STATUS_SEX_MAP,
    "OtherDebtors": OTHER_DEBTORS_MAP,
    "PresentResidence": PRESENT_RESIDENCE_MAP,
    "Property": PROPERTY_MAP,
    "OtherInstallmentPlans": OTHER_INSTALLMENT_PLANS_MAP,
    "Housing": HOUSING_MAP,
    "NumberExistingCredits": NUMBER_CREDITS_MAP,
    "Job": JOB_MAP,
    "PeopleLiable": PEOPLE_LIABLE_MAP,
    "Telephone": TELEPHONE_MAP,
    "ForeignWorker": FOREIGN_WORKER_MAP,
}