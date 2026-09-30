"use strict";
// Nebius Token Factory client (OpenAI-compatible chat completions).
// No secrets hardcoded: key comes from NEBIUS_API_KEY env only.
Object.defineProperty(exports, "__esModule", { value: true });
exports.callNemotron = exports.REASONING_MODEL = exports.DEFAULT_MODEL = void 0;
exports.DEFAULT_MODEL = "nvidia/Nemotron-4-Mini-Hindi-4B-Instruct";
exports.REASONING_MODEL = "nvidia/Nemotron-3-Ultra";
async function callNemotron(messages, opts = {}) {
    const apiKey = opts.apiKey ?? process.env.NEBIUS_API_KEY ?? "";
    if (!apiKey)
        throw new Error("Missing NEBIUS_API_KEY");
    const baseUrl = opts.baseUrl ?? process.env.NEBIUS_BASE_URL ?? "https://api.tokenfactory.nebius.com/v1";
    const model = opts.model ?? process.env.NEBIUS_MODEL ?? exports.DEFAULT_MODEL;
    const res = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model, messages, temperature: 0.2, max_tokens: 800 }),
    });
    if (!res.ok)
        throw new Error(`Nebius error ${res.status}`);
    const data = (await res.json());
    const text = data?.choices?.[0]?.message?.content;
    if (!text)
        throw new Error("Empty Nemotron response");
    return String(text);
}
exports.callNemotron = callNemotron;
