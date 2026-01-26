// types/ml-letter.types.ts (por ejemplo)

export interface MlLetterPayload {
  application: {
    id: string;
    probabilityDefault: number;
    riskBand: 'LOW' | 'MEDIUM' | 'HIGH';
    topFeatures: any[];
    createdAt: Date;
    amount: number;
    durationMonths: number;
  };
  customer: {
    id: string;
    name: string;
    nationalId: string;
    email: string;
    phone: string;
    income: number;
    status: string;
    createdAt: Date;
  };
}
