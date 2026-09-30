import { callNemotron } from "./nebius";
import { buildPrompt, heuristic, parseModelJson, systemPrompt, IssueInput } from "./analyzer";

export async function analyzeIssue(input: IssueInput) {
  if (!process.env.NEBIUS_API_KEY) return { ...heuristic(input), mode: "heuristic" as const };
  try {
    const raw = await callNemotron([
      { role: "system", content: systemPrompt() },
      { role: "user", content: buildPrompt(input) },
    ]);
    return { ...parseModelJson(raw), mode: "nemotron" as const };
  } catch {
    return { ...heuristic(input), mode: "heuristic-fallback" as const };
  }
}

// CLI: node dist/index.js --title "..." --body "..." --comments 0
async function main() {
  const args = process.argv.slice(2);
  const get = (k: string) => {
    const i = args.indexOf(`--${k}`);
    return i >= 0 ? args[i + 1] ?? "" : "";
  };
  const out = await analyzeIssue({
    title: get("title") || "Fix login race in token refresh",
    body: get("body") || "Clear repro with $100 bounty, tests exist, no assignee.",
    comments: Number(get("comments") || "0"),
  });
  console.log(JSON.stringify(out, null, 2));
}

if (require.main === module) {
  main();
}
