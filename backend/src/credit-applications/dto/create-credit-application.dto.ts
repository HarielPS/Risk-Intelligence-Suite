import { IsInt, Min, Max, IsNumber, IsOptional } from "class-validator";

export class CreateCreditApplicationDto {
  // laufzeit — duración del crédito (meses)
  @IsInt()
  @Min(1)
  @Max(120)
  durationMonths: number;

  // verw — proposito del crédito
  @IsInt()
  @Min(0)
  @Max(10)
  purpose: number;

  // hoehe — monto del crédito
  @IsNumber()
  @Min(1)
  amount: number; 

  // beszeit — antiguedad laboral (1-5)
  @IsInt()
  @Min(1)
  @Max(5)
  employmentDuration: number; 

  // rate — cuota/ingreso (1-4)
  @IsInt()
  @Min(1)
  @Max(4)
  installmentRate: number; 

  // moral — historial crediticio (0-4)
  @IsInt()
  @Min(0)
  @Max(4)
  creditHistory: number; 

  // laufkont — estado de la cuenta corriente (1-4)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(4)
  accountStatus?: number; 

  // sparkont — cuenta de ahorros (1-5)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  savings?: number; 

  // famges — estado personal y sexo (1-4)
  @IsInt()
  @Min(1)
  @Max(4)
  personalStatusSex: number;

  // buerge — otros deudores (1-3)
  @IsInt()
  @Min(1)
  @Max(3)
  otherDebtors: number;

  // wohnzeit — tiempo en residencia (1-4)
  @IsInt()
  @Min(1)
  @Max(4)
  presentResidence: number;

  // verm — propiedad (1-4)
  @IsInt()
  @Min(1)
  @Max(4)
  property: number; 

  // weitkred — otros planes de pago (1-3)
  @IsInt()
  @Min(1)
  @Max(3)
  otherInstallmentPlans: number; 

  // wohn — tipo de vivienda (1-3)
  @IsInt()
  @Min(1)
  @Max(3)
  housing: number; 

  // bishkred — número de créditos existentes (1-4)
  @IsInt()
  @Min(1)
  @Max(4)
  numberCredits: number; 

  // beruf — ocupación (1-4)
  @IsInt()
  @Min(1)
  @Max(4)
  job: number; 

  // pers — personas a cargo (1-2)
  @IsInt()
  @Min(1)
  @Max(2)
  peopleLiable: number;

  // telef — teléfono (1=No, 2=Sí)
  @IsInt()
  @Min(1)
  @Max(2)
  telephone: number; 

  // gastarb — trabajador extranjero (1=Sí, 2=No)
  @IsInt()
  @Min(1)
  @Max(2)
  foreignWorker: number;
}
