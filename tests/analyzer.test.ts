import { heuristic, buildPrompt, parseModelJson, systemPrompt } from "../src/analyzer";

describe("heuristic triage (gold cases from live search 30/09/2026)", () => {
  test("clean small TS issue -> go", () => {
    const a = heuristic({
      title: "Move test-only helpers out of shipped tree",
      body: "x".repeat(120) + " $50 bounty, tests exist in vitest, clear target branch.",
      comments: 0,
      stars: 600,
    });
    expect(a.verdict).toBe("go");
    expect(a.feasibility).toBeGreaterThanOrEqual(0.6);
  });

  test("crowded $100 Opire hook with 20 comments -> skip", () => {
    const a = heuristic({
      title: "[BOUNTY $100] HOOK: Pre-tool-use hook",
      body: "Create a Claude Code pre-tool-use hook in Python. $100 via Opire. " + "x".repeat(120),
      comments: 20,
      stars: 14,
    });
    expect(a.risks).toContain("crowded");
    expect(a.verdict).toBe("skip");
  });

  test("already assigned $750 tt-metal -> skip", () => {
    const a = heuristic({
      title: "[Bounty $750] Fix fused scale-mask softmax tile-padding",
      body: "Repro for widths 17, 50, 197 with $750 bounty and tests. " + "x".repeat(120),
      comments: 5,
      assignee: "singhharsh1708",
      stars: 2000,
    });
    expect(a.risks).toContain("already-assigned");
    expect(a.verdict).toBe("skip");
  });
});

describe("prompt + parser", () => {
  test("prompt embeds title", () => {
    expect(buildPrompt({ title: "abc" })).toContain("abc");
  });
  test("parser extracts JSON from prose", () => {
    const a = parseModelJson(
      'here {"feasibility":0.8,"effortHours":2,"risks":[],"testPlan":["t"],"verdict":"go"} done'
    );
    expect(a.verdict).toBe("go");
    expect(systemPrompt()).toContain("BountyLens");
  });
});
