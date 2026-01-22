# API Contracts

## ml-credit

### ml-credit: POST /score

Request JSON:

- age: int
- job_status: string
- credit_amount: float
- ...

Response JSON:

- probability_default: float
- risk_band: "LOW" | "MEDIUM" | "HIGH"
- model_version: string
- top_features: [ { name, value, contribution, direction } ]
