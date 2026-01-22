import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateRiskAnalysisDto {
  @IsMongoId()
  @IsNotEmpty()
  clientId: string;

  // numeric_features
  @IsInt()
  @Min(1)
  duration: number; // Duration

  @IsNumber()
  @Min(1)
  creditAmount: number; // CreditAmount

  @IsInt()
  @Min(18)
  age: number; // Age

  // categorical_features
  @IsInt()
  status: number;

  @IsInt()
  creditHistory: number;

  @IsInt()
  purpose: number;

  @IsInt()
  savings: number;

  @IsInt()
  employmentDuration: number;

  @IsInt()
  installmentRate: number;

  @IsInt()
  personalStatusSex: number;

  @IsInt()
  otherDebtors: number;

  @IsInt()
  presentResidence: number;

  @IsInt()
  property: number;

  @IsInt()
  otherInstallmentPlans: number;

  @IsInt()
  housing: number;

  @IsInt()
  numberExistingCredits: number;

  @IsInt()
  job: number;

  @IsInt()
  peopleLiable: number;

  @IsInt()
  telephone: number;

  @IsInt()
  foreignWorker: number;
}
