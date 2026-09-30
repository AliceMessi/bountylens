# Architecture

```
Browser (docs/demo.html, GitHub Pages)
  |
  |  paste issue URL/title/body/comments
  v
analyzer.heuristic()  <-- always available, offline
  |
  |  if NEBIUS_API_KEY present (server/CLI):
  v
nebius.callNemotron() --> POST api.tokenfactory.nebius.com/v1/chat/completions
                          model: nvidia/Nemotron-4-Mini-Hindi-4B-Instruct (fast)
                             or nvidia/Nemotron-3-Ultra (reasoning)
                          --> strict JSON {feasibility, effortHours, risks, testPlan, verdict}
                          --> parseModelJson(), fallback to heuristic on error
```

Gold cases (from live GitHub search 30/09/2026):
- clean TS refactor, 0 comments → go
- Opire $100 hook, 20 comments → skip (crowded)
- tt-metal $750, assigned → skip (already-assigned)
