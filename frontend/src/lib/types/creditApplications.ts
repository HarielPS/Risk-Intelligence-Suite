// === Request DTO ===
export interface CreateCreditApplicationDto {
  // laufzeit — duración del crédito (meses)
  durationMonths: number;        // laufzeit

  // verw — propósito del crédito
  // 0=Otros, 1=Auto nuevo, 2=Auto usado, 3=Muebles, ... 10=Negocios
  purpose: number;               // verw

  // hoehe — monto del crédito
  amount: number;                // hoehe

  // beszeit — antigüedad laboral (1-5)
  employmentDuration: number;    // beszeit

  // rate — % cuota/ingreso (1-4)
  installmentRate: number;       // rate

  // moral — historial crediticio (0-4)
  creditHistory: number;         // moral / credit_history

  // laufkont — estado de la cuenta corriente (1-4)
  accountStatus: number;         // laufkont / status

  // sparkont — cuenta de ahorros (1-5)
  savings: number;               // sparkont / savings

  // famges — estado personal y sexo (1-4)
  personalStatusSex: number;     // famges

  // buerge — otros deudores (1-3)
  otherDebtors: number;          // buerge

  // wohnzeit — tiempo en residencia (1-4)
  presentResidence: number;      // wohnzeit

  // verm — propiedad (1-4)
  property: number;              // verm

  // weitkred — otros planes de pago (1-3)
  otherInstallmentPlans: number; // weitkred

  // wohn — tipo de vivienda (1-3)
  housing: number;               // wohn

  // bishkred — número de créditos existentes (1-4)
  numberCredits: number;         // bishkred

  // beruf — ocupación (1-4)
  job: number;                   // beruf

  // pers — personas a cargo (1-2)
  peopleLiable: number;          // pers

  // telef — teléfono (1=No, 2=Sí)
  telephone: number;             // telef

  // gastarb — trabajador extranjero (1=Sí, 2=No)
  foreignWorker: number;         // gastarb
}

// === Tipos para la respuesta del modelo de riesgo ===

export type RiskBand = 'LOW' | 'MEDIUM' | 'HIGH';

export type ImpactDirection = 'REDUCES_RISK' | 'INCREASES_RISK' | 'NEUTRAL';

export interface CreditTopFeature {
  feature: string;
  feature_label: string;
  raw_value: number;
  value_label: string;
  shap_value: number;
  impact_direction: ImpactDirection;
  impact_text: string;
}

// Resultado principal del scoring de riesgo
export interface CreditApplicationResult {
  probabilityDefault: number;
  riskBand: RiskBand;
  topFeatures: CreditTopFeature[];
}

// Respuesta completa del endpoint /credit-applications/:userId
export interface CreditApplicationResponse extends CreditApplicationResult {
  id: string;        
  createdAt: string
}
