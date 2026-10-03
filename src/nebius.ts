// Nebius Token Factory client (OpenAI-compatible chat completions).
// No secrets hardcoded: key comes from NEBIUS_API_KEY env only.

export const DEFAULT_MODEL = "nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B";
export const REASONING_MODEL = "nvidia/Nemotron-3-Ultra-550b-a55b";

export interface ChatMessage {
  role: "system" | "user";
  content: string;
}

export async function callNemotron(
  messages: ChatMessage[],
  opts: { model?: string; baseUrl?: string; apiKey?: string } = {}
): Promise<string> {
  const apiKey = opts.apiKey ?? process.env.NEBIUS_API_KEY ?? "";
  if (!apiKey) throw new Error("Missing NEBIUS_API_KEY");
  const baseUrl =
    opts.baseUrl ?? process.env.NEBIUS_BASE_URL ?? "https://api.tokenfactory.nebius.com/v1";
  const model = opts.model ?? process.env.NEBIUS_MODEL ?? DEFAULT_MODEL;

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages, temperature: 0.2, max_tokens: 800 }),
  });
  if (!res.ok) throw new Error(`Nebius error ${res.status}`);
  const data = (await res.json()) as any;
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty Nemotron response");
  return String(text);
}
