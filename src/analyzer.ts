// Offline heuristic: same rules as AgentPrize score-issues.py.
// Used when NEBIUS_API_KEY is absent so the demo always works.

export interface IssueInput {
  title: string;
  body?: string;
  comments?: number;
  assignee?: string | null;
  labels?: string[];
  stars?: number;
}

export interface Analysis {
  feasibility: number; // 0..1
  effortHours: number;
  risks: string[];
  testPlan: string[];
  verdict: "go" | "skip";
}

export function heuristic(input: IssueInput): Analysis {
  let score = 0.5;
  const risks: string[] = [];
  const text = `${input.title} ${input.body ?? ""}`;

  if (/\$\d+|bounty|reward/i.test(text)) score += 0.2;
  else risks.push("no-cash-hint");
  if ((input.stars ?? 0) > 500) score += 0.1;
  if (/fix|bug|test|docs|typo/i.test(input.title)) score += 0.1;
  if (/smart contract|solidity|hackerone|critical vuln/i.test(text)) {
    score -= 0.4;
    risks.push("out-of-scope");
  }
  if (input.assignee) {
    score -= 0.5;
    risks.push("already-assigned");
  }
  if ((input.comments ?? 0) > 10) {
    score -= 0.2;
    risks.push("crowded");
  }
  if ((input.body ?? "").length < 50) {
    score -= 0.2;
    risks.push("vague");
  }
  if (/blocked by/i.test(text)) {
    score -= 0.2;
    risks.push("blocked");
  }
  if (/\$0\b/.test(text)) {
    score -= 0.3;
    risks.push("zero-payout");
  }
  if (/RTC|token/i.test(text) && !/\$/.test(text)) risks.push("non-cash-token");

  score = Math.max(0, Math.min(1, score));
  return {
    feasibility: Math.round(score * 100) / 100,
    effortHours: score > 0.7 ? 2 : score > 0.5 ? 4 : 8,
    risks,
    testPlan: [
      "Reproduce the issue with a failing test first (TDD).",
      "Implement the minimal fix, keep diff small.",
      "Run full test suite + lint + typecheck green.",
    ],
    verdict: score >= 0.6 && risks.indexOf("already-assigned") < 0 ? "go" : "skip",
  };
}

const SYSTEM = `You are BountyLens, a senior engineer triaging GitHub bounty issues.
Reply with strict JSON only: {"feasibility":0..1,"effortHours":number,"risks":[string],"testPlan":[string],"verdict":"go"|"skip"}.
Skip when already assigned, crowded (>10 comments), vague (<50 chars body), or no cash hint.`;

export function buildPrompt(input: IssueInput): string {
  return JSON.stringify({
    title: input.title,
    body: (input.body ?? "").slice(0, 2000),
    comments: input.comments ?? 0,
    assignee: input.assignee ?? null,
    labels: input.labels ?? [],
    stars: input.stars ?? 0,
  });
}

export function systemPrompt(): string {
  return SYSTEM;
}

export function parseModelJson(raw: string): Analysis {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("No JSON in model output");
  const obj = JSON.parse(raw.slice(start, end + 1)) as Analysis;
  if (typeof obj.feasibility !== "number") throw new Error("Bad model JSON");
  return obj;
}
