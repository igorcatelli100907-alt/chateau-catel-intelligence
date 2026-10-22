const ALLOWED_ORIGIN = "https://igorcatelli100907-alt.github.io";
const MODEL = "gemini-3.8-flash";
function cors(origin) { return { "Access-Control-Allow-Origin": origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN, "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Vary": "Origin" }; }
function json(data, status, origin) { return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json; charset=utf-8", ...cors(origin) } }); }
export default { async fetch(request, env) {
 const origin = request.headers.get("Origin") || "";
 if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
 if (origin !== ALLOWED_ORIGIN) return json({ error: "Origem não autorizada." }, 403, origin);
 if (request.method !== "POST") return json({ error: "Use POST." }, 405, origin);
 if (!env.GEMINI_API_KEY) return json({ error: "Configure GEMINI_API_KEY como Secret no Cloudflare." }, 503, origin);
 let body; try { body = await request.json(); } catch { return json({ error: "JSON inválido." }, 400, origin); }
 if (body.action === "health") return json({ message: "Worker acessível. Faça uma pergunta real para testar a IA." }, 200, origin);
 const task = String(body.task || "question"); const prompt = String(body.prompt || "").trim();
 if (!prompt) return json({ error: "Envie uma pergunta ou contexto." }, 400, origin);
 if (prompt.length > 12000) return json({ error: "Limite de 12.000 caracteres por consulta." }, 413, origin);
 const instructions = { materials: "Classifique matérias-primas e indique confiança. Não invente composição, fornecedor, preço, CAS ou propriedades; sinalize incertezas.", formula: "Analise ideias de fórmulas de perfumaria. Não declare segurança para pele nem conformidade IFRA sem documentação e avaliação técnica.", content: "Crie conteúdo original em português brasileiro para a Chateau Catel, com estética elegante de alta perfumaria. Não invente preços, notas ou alegações.", question: "Responda em português brasileiro com clareza técnica. Diferencie fatos de hipóteses e não invente dados." };
 const system = "Você é o assistente técnico e criativo da Chateau Catel. Seja criterioso e transparente. " + (instructions[task] || instructions.question);
 let response; let result;
 try {
  response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + MODEL + ":generateContent", { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY }, body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { temperature: 0.6, maxOutputTokens: 1400 } }) });
  result = await response.json().catch(() => ({}));
 } catch (error) {
  return json({ error: "Não foi possível alcançar a Gemini API. Verifique a conexão de saída do Worker e tente novamente." }, 502, origin);
 }
 if (!response.ok) { const detail = result && result.error && typeof result.error.message === "string" ? result.error.message : "O Google não forneceu detalhes."; const message = response.status === 429 ? "Limite gratuito da API atingido. Aguarde e tente novamente." : "Gemini API HTTP " + response.status + ": " + detail; return json({ error: message }, response.status === 429 ? 429 : 502, origin); }
 const candidate = (result.candidates || [])[0];
 const finishReason = candidate && candidate.finishReason;
 const text = (result.candidates || []).flatMap(c => c.content && c.content.parts || []).map(p => p.text || "").join("\n").trim();
 if (!text) {
  const blockMessage = finishReason ? "A Gemini não retornou texto (motivo: " + finishReason + "). Tente reformular a pergunta." : "A Gemini não retornou texto. Verifique o modelo e os detalhes da resposta da API.";
  return json({ error: blockMessage }, 502, origin);
 }
 return json({ text }, 200, origin);
} };