import { GoogleGenAI, Type, Schema } from "@google/genai";
import { BlastAnalysis, RiskInput } from "../types";

const SYSTEM_INSTRUCTION = `
You are an Enterprise Risk Architect for regulated systems (finance, healthcare, government, critical infrastructure).

Your task is to evaluate any proposed feature, workflow, or AI capability using the BLAST Radius Framework and produce a risk-aware design assessment.

BLAST stands for:
B – Business Criticality (How essential this is to core operations or revenue)
L – Legal & Regulatory Exposure (Degree of compliance, audit, or legal risk)
A – Amplification Speed (How quickly errors propagate across users, accounts, or systems)
S – State Reversibility (How hard it is to undo damage once an error occurs)
T – Trust Impact (Impact on customer confidence, market credibility, or institutional trust)

Scoring Logic:
5–9 → Low
10–14 → Moderate
15–19 → High
20–25 → Critical

Tone: precise, enterprise-grade, risk-aware.
Assume this will be read by a CIO, CRO, or regulator.
Never default to optimism. Assume drift, misuse, and edge cases.
`;

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    scores: {
      type: Type.OBJECT,
      properties: {
        businessCriticality: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: "Score from 1 (Low) to 5 (Severe)" },
            justification: { type: Type.STRING },
            riskFactor: { type: Type.STRING, description: "What makes this risky" },
          },
          required: ["score", "justification", "riskFactor"],
        },
        legalExposure: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: "Score from 1 (Low) to 5 (Severe)" },
            justification: { type: Type.STRING },
            riskFactor: { type: Type.STRING },
          },
          required: ["score", "justification", "riskFactor"],
        },
        amplificationSpeed: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: "Score from 1 (Low) to 5 (Severe)" },
            justification: { type: Type.STRING },
            riskFactor: { type: Type.STRING },
          },
          required: ["score", "justification", "riskFactor"],
        },
        stateReversibility: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: "Score from 1 (Low) to 5 (Severe)" },
            justification: { type: Type.STRING },
            riskFactor: { type: Type.STRING },
          },
          required: ["score", "justification", "riskFactor"],
        },
        trustImpact: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: "Score from 1 (Low) to 5 (Severe)" },
            justification: { type: Type.STRING },
            riskFactor: { type: Type.STRING },
          },
          required: ["score", "justification", "riskFactor"],
        },
      },
      required: ["businessCriticality", "legalExposure", "amplificationSpeed", "stateReversibility", "trustImpact"],
    },
    overallRiskLevel: {
      type: Type.STRING,
      enum: ["Low", "Moderate", "High", "Critical"],
    },
    totalScore: { type: Type.INTEGER },
    riskSummary: { type: Type.STRING, description: "Systemic risk narrative" },
    failureModes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-5 realistic ways this could fail quietly",
    },
    containmentStrategy: {
      type: Type.OBJECT,
      properties: {
        guardrails: { type: Type.ARRAY, items: { type: Type.STRING } },
        stopConditions: { type: Type.ARRAY, items: { type: Type.STRING } },
        humanInTheLoop: { type: Type.ARRAY, items: { type: Type.STRING } },
        auditRequirements: { type: Type.ARRAY, items: { type: Type.STRING } },
        rollbackStrategy: { type: Type.STRING },
      },
      required: ["guardrails", "stopConditions", "humanInTheLoop", "auditRequirements", "rollbackStrategy"],
    },
    launchReadinessChecklist: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "What must exist before this can go to production",
    },
  },
  required: [
    "scores",
    "overallRiskLevel",
    "totalScore",
    "riskSummary",
    "failureModes",
    "containmentStrategy",
    "launchReadinessChecklist",
  ],
};

export const analyzeRisk = async (input: RiskInput): Promise<BlastAnalysis> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Evaluate the following feature using the BLAST Radius Framework:

    Context:
    ${input.context}

    Proposed Feature:
    ${input.proposedFeature}

    Intended Outcome:
    ${input.intendedOutcome}

    Constraints:
    - This system operates in a regulated environment
    - Decisions may affect real people, finances, or legal standing
    - Errors may not be immediately visible

    Run a full BLAST analysis.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as BlastAnalysis;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
