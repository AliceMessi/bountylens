# BountyLens

GitHub issue feasibility agent powered by **NVIDIA Nemotron on Nebius Token Factory**.

Paste an issue → get `go/skip` verdict, feasibility 0–1, risks (`already-assigned`, `crowded`, `vague`, `zero-payout`), and a TDD test-plan. Works offline with a built-in heuristic; with `NEBIUS_API_KEY` it calls Nemotron live.

## Quick start

```bash
npm ci
npm test
npm run typecheck
# offline demo (no key needed)
npm run build && node dist/index.js --title "Fix login race" --comments 0
# live Nemotron (needs $25 free credits, code NEBIUS-DEVPOST-GLOBAL26)
set NEBIUS_API_KEY=your_key
node dist/index.js --title "[Bounty $100] Fix docs typo" --comments 2
```

Static web demo: open `docs/demo.html` in a browser (same heuristic, no backend).

## How Nemotron + Nebius are used

- Client: `src/nebius.ts` calls `https://api.tokenfactory.nebius.com/v1/chat/completions` (OpenAI-compatible) with a Nemotron model (`nvidia/Nemotron-4-Mini-Hindi-4B-Instruct` default, `nvidia/Nemotron-3-Ultra` for deep reasoning).
- Token Factory accelerated the workflow: one endpoint for fast (Nano/Mini) and reasoning (Ultra) calls, no GPU to manage.
- Flow: `src/index.ts` → `callNemotron(system + issue JSON)` → strict-JSON parse (`parseModelJson`) → fallback to `heuristic()` on any error so the demo never breaks.
- No other Nebius services required; deploy target is GitHub Pages (static) + optional Nebius Serverless Endpoint for `/api/analyze`.

## NVIDIA model choice

- Default Mini/Nano: fast, cheap everyday triage calls.
- Ultra: serious reasoning for ambiguous issues (effort estimate, hidden risks).
- Out of the box with prompt engineering (strict JSON system prompt); no fine-tune needed for MVP.

## License

MIT — see `LICENSE`.
