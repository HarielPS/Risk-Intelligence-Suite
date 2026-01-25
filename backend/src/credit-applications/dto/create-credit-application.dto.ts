import { IsInt, Min, Max, IsNumber, IsOptional } from "class-validator";

export class CreateCreditApplicationDto {
  // laufzeit — duración del crédito (meses)
  @IsInt()
  @Min(1)
  @Max(120)
  durationMonths: number; // laufzeit

  // verw — propósito del crédito
  @IsInt()
  @Min(0)
  @Max(10)
  purpose: number; // verw

  // hoehe — monto del crédito
  @IsNumber()
  @Min(1)
  amount: number; // hoehe

  // beszeit — antigüedad laboral (1-5)
  @IsInt()
  @Min(1)
  @Max(5)
  employmentDuration: number; // beszeit

  // rate — % cuota/ingreso (1-4)
  @IsInt()
  @Min(1)
  @Max(4)
  installmentRate: number; // rate

  // moral — historial crediticio (0-4)
  @IsInt()
  @Min(0)
  @Max(4)
  creditHistory: number; // moral

  // === NUEVO: laufkont — estado de la cuenta corriente (1-4) ===
  // Opcional: si no viene, se calcula desde la cuenta.
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(4)
  accountStatus?: number; // laufkont / Status

  // === NUEVO: sparkont — cuenta de ahorros (1-5) ===
  // Opcional: si no viene, se calcula desde la cuenta.
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  savings?: number; // sparkont / Savings

  // famges — estado personal y sexo (1-4)
  @IsInt()
  @Min(1)
  @Max(4)
  personalStatusSex: number; // famges

  // buerge — otros deudores (1-3)
  @IsInt()
  @Min(1)
  @Max(3)
  otherDebtors: number; // buerge

  // wohnzeit — tiempo en residencia (1-4)
  @IsInt()
  @Min(1)
  @Max(4)
  presentResidence: number; // wohnzeit

  // verm — propiedad (1-4)
  @IsInt()
  @Min(1)
  @Max(4)
  property: number; // verm

  // weitkred — otros planes de pago (1-3)
  @IsInt()
  @Min(1)
  @Max(3)
  otherInstallmentPlans: number; // weitkred

  // wohn — tipo de vivienda (1-3)
  @IsInt()
  @Min(1)
  @Max(3)
  housing: number; // wohn

  // bishkred — número de créditos existentes (1-4)
  @IsInt()
  @Min(1)
  @Max(4)
  numberCredits: number; // bishkred

  // beruf — ocupación (1-4)
  @IsInt()
  @Min(1)
  @Max(4)
  job: number; // beruf

  // pers — personas a cargo (1-2)
  @IsInt()
  @Min(1)
  @Max(2)
  peopleLiable: number; // pers

  // telef — teléfono (1=No, 2=Sí)
  @IsInt()
  @Min(1)
  @Max(2)
  telephone: number; // telef

  // gastarb — trabajador extranjero (1=Sí, 2=No)
  @IsInt()
  @Min(1)
  @Max(2)
  foreignWorker: number; // gastarb
}
