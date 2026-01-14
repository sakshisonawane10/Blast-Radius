export interface BlastDimension {
  score: number;
  justification: string;
  riskFactor: string;
}

export interface ContainmentStrategy {
  guardrails: string[];
  stopConditions: string[];
  humanInTheLoop: string[];
  auditRequirements: string[];
  rollbackStrategy: string;
}

export interface BlastAnalysis {
  scores: {
    businessCriticality: BlastDimension;
    legalExposure: BlastDimension;
    amplificationSpeed: BlastDimension;
    stateReversibility: BlastDimension;
    trustImpact: BlastDimension;
  };
  overallRiskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  totalScore: number;
  riskSummary: string;
  failureModes: string[];
  containmentStrategy: ContainmentStrategy;
  launchReadinessChecklist: string[];
}

export interface RiskInput {
  context: string;
  proposedFeature: string;
  intendedOutcome: string;
}
