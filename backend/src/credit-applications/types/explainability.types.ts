export type ExplainabilityDecision = 'APPROVE' | 'REVIEW' | 'DECLINE';

export interface RiskReason {
  code: string;          
  title: string;         
  evidence: string;      
  customerTip: string;   
  weight?: number;       
}

export interface CreditLetterPayload {
  locale: string;
  channel: 'WEB' | 'EMAIL';

  customerProfile: {
    firstName?: string;
    lastName?: string;
    age?: number;
    segment?: string; 
  };

  creditSummary: {
    amount: number;
    durationMonths: number;
    probabilityDefault: number;
    riskBand: 'LOW' | 'MEDIUM' | 'HIGH';
  };

  decision: ExplainabilityDecision;
  reasons: RiskReason[];
  disclaimerLevel: 'STANDARD' | 'STRICT';
}

export interface CreditLetter {
  decision: ExplainabilityDecision;
  letterText: string;
  bullets: string[];
  safetyFlags: string[];
}
