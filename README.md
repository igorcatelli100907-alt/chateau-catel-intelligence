# Chateau Catel Intelligence — protótipo inicial

Aplicação web estática em português (Brasil), feita para uso pessoal pelo navegador do celular.

## O que já funciona
- Cadastro de matérias-primas e custos de compra.
- Montagem de fórmula por partes e cálculo nominal de concentração/veículo.
- Salvamento local de fórmulas e rascunhos de conteúdo.
- Gerador de roteiro-base para Reels, carrossel, Stories e posts.
- Exportação de dados em JSON e exclusão dos dados locais.
- Interface responsiva com estética preta, âmbar e dourada.

## Como usar no GitHub pelo Android
1. Abra o repositório no navegador.
2. Toque em **Add file** → **Upload files**.
3. Envie `index.html` e `README.md` deste pacote e faça commit na branch `main`.
4. Para publicar: abra **Settings → Pages**, selecione **Deploy from a branch**, branch `main` e pasta `/ (root)`, e salve.
5. Aguarde a publicação e abra o endereço mostrado na página Pages.

## Limitações importantes
- Ainda não há modelo de IA conectado; o Creative Studio usa um modelo local de texto-base.
- Os dados ficam no armazenamento local do navegador e não sincronizam entre dispositivos.
- Não há autenticação, sincronização em nuvem ou publicação automática no Instagram.
- O cálculo é auxiliar e não valida IFRA, alérgenos, estabilidade ou segurança dermatológica.
- Não misture unidades de massa, volume e gotas sem densidade/calibração confirmada.
- Não armazene senhas, tokens ou fórmulas confidenciais nesta versão.

## Próximas etapas sugeridas
1. Validar os fluxos principais e corrigir eventuais problemas em navegadores móveis.
2. Adicionar testes para os cálculos.
3. Implementar autenticação e banco de dados com regras de acesso.
4. Integrar um modelo de IA sem expor chaves secretas no frontend.
5. Implementar automações apenas com APIs oficiais e permissões adequadas.
