# Integração de IA — Chateau Catel Intelligence

O frontend do GitHub Pages chama um Cloudflare Worker, que guarda a chave da API como Secret e não a expõe ao navegador.

## Configuração
1. Crie uma chave no Google AI Studio: https://aistudio.google.com/apikey
2. Crie um Worker no Cloudflare: https://dash.cloudflare.com/ → Workers & Pages → Create → Worker.
3. Copie `worker.js` para o editor do Worker e publique.
4. Em Settings → Variables and Secrets, adicione um **Secret** chamado `GEMINI_API_KEY` com sua chave. Nunca cole a chave no GitHub ou no HTML.
5. O código permite `https://igorcatelli100907-alt.github.io`. Se o domínio do Pages mudar, atualize `ALLOWED_ORIGIN` e publique novamente.
6. Copie a URL pública do Worker (`.workers.dev`). Na seção Assistente IA do site, cole essa URL, salve e teste.

## Limites e privacidade
- O nível gratuito da Gemini API tem limites e disponibilidade que podem mudar. Confira https://ai.google.dev/gemini-api/docs/rate-limits e https://ai.google.dev/gemini-api/docs/pricing.
- No nível gratuito, os dados enviados podem ser usados pelo Google para melhorar produtos. Não envie dados pessoais ou segredos comerciais.
- CORS limita chamadas de navegador, mas não impede abuso automatizado. Para um serviço público, acrescente rate limiting/autenticação.
- A IA pode errar. Não use respostas como validação IFRA, segurança dermatológica, estabilidade ou conformidade regulatória.
