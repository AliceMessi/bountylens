"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeIssue = void 0;
const nebius_1 = require("./nebius");
const analyzer_1 = require("./analyzer");
async function analyzeIssue(input) {
    if (!process.env.NEBIUS_API_KEY)
        return { ...(0, analyzer_1.heuristic)(input), mode: "heuristic" };
    try {
        const raw = await (0, nebius_1.callNemotron)([
            { role: "system", content: (0, analyzer_1.systemPrompt)() },
            { role: "user", content: (0, analyzer_1.buildPrompt)(input) },
        ]);
        return { ...(0, analyzer_1.parseModelJson)(raw), mode: "nemotron" };
    }
    catch {
        return { ...(0, analyzer_1.heuristic)(input), mode: "heuristic-fallback" };
    }
}
exports.analyzeIssue = analyzeIssue;
// CLI: node dist/index.js --title "..." --body "..." --comments 0
async function main() {
    const args = process.argv.slice(2);
    const get = (k) => {
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
