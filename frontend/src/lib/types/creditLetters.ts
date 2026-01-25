export type ExplainabilityDecision = "APPROVE" | "REVIEW" | "DECLINE";

export interface CreditLetter {
  decision: ExplainabilityDecision;
  letterText: string;
  bullets: string[];
  safetyFlags: string[];
}

