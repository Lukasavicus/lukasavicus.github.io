# Paridade entre as versões A e B

Data: 2026-10-01. Levantado por grep nos arquivos da branch `site`.

Premissa: A (Callie, em `/`) e B (Surinder, em `/b/`) devem ter as mesmas páginas e as mesmas features. Podem diferir em design, porque B existe justamente como alternativa visual pro teste A/B.

## Páginas

| Página | A | B (antes) | B (depois) |
|---|---|---|---|
| Home, About, Experience, Projects, Personal, Contact, Code Shop, FAQ, 404 | ✓ | ✓ | ✓ |
| Case Spot (`spot.html`) | ✓ | ✗ | ✓ (mesmo corpo PT de `_build/spot-body.html`, dentro do shell da B) |
| Detalhe por cargo (10), por curso (6), por projeto (3) | ✓ | ✗ | ✓ (mesmos slugs; `b/experience/`, `b/education/`, `b/projects/`) |
| Link "Articles" na nav | ✓ | ✗ | ✓ (pílula, header aberto da home, tab dock, sitemap; `/articles/` absoluto) |

## Componentes iguais

Skip link, barra de progresso de scroll, back to top, FAB "Let's grab a coffee", navegação por teclado, sitemap no footer, link Research, link pra versão 2016, link cruzado A/B, modal How It's Calculated, logo wall com logos reais, "A few numbers", depoimentos (placeholder), botão Copy no Code Shop, formulário de contato via mailto, `llms.txt`.

## Componentes que faltavam na B

| Componente | A | B (antes) | B (depois) |
|---|---|---|---|
| Seletor EN/PT (PT desabilitado) | ✓ | ✗ | ✓ (na pílula a partir de 1536px e no footer em qualquer largura) |
| Busca no footer (filtra o sitemap) | ✓ | ✗ | ✓ (`#sitesearch`, esconde coluna sem resultado, "No page matches that.") |
| Dark mode | ✓ | ✗ | ✓ (toggle no footer, chave `theme` no `localStorage`, igual à A; `?theme=dark` só pra aquele load) |
| Share nos detalhes e no Spot | ✓ | ✗ | ✓ (Copy link · LinkedIn · X) |

## Diferenças que restaram (de propósito ou por limite do build Astro)

- **Dark mode na B** é feito por variáveis `--t-*` em `theme.css` e por overrides dos seletores escopados do Astro (`[data-astro-cid-…]`). Cobre shell, páginas internas, detalhes, Spot e as seções claras da home. Hero, "Projects in focus", tab dock e footer já eram noturnos e não mudam. Pode sobrar algum detalhe claro em componentes Astro não listados (ex.: cards de depoimentos se o markup mudar).
- **EN · PT na pílula** só aparece em telas ≥ 1536px: com Articles a pílula encostava nos círculos de contato a 1440px; abaixo disso o seletor fica só no footer.
- **Tab dock** ganhou Articles (5 itens); abaixo de 360px de largura o item some e Articles fica só na pílula/sitemap.
- **Página de detalhe na B** usa o `page-hero` da B (kicker + título + meta) em vez do título inline da A; o conteúdo (bullets do CV, Tech, placeholder, share, Back) é o mesmo.
- **Home, card Spot**: o card desktop é um `<button>` expansível, então o link "Full case study →" fica ao lado dele (canto inferior esquerdo, fora do botão) e não dentro, pra manter o HTML válido. No acordeão mobile o link fica dentro do conteúdo expandido.
- **B é HTML estático**: não há build. As páginas de detalhe foram geradas uma vez a partir dos arrays do `_build/build.js`; se o conteúdo mudar lá, é preciso regenerar/editar as páginas da B à mão.

## Diferenças de design, mantidas de propósito

| Aspecto | A | B |
|---|---|---|
| Projetos | carrossel | cards expansíveis |
| Mensagens no hero | ticker de fun facts | typing + toggle Now/Studied |
| Nav mobile | hamburger | tab dock |
| Timeline | barras Gantt na home (empresas + escolas, 2016–2026), vertical na Experience | curva da jornada + régua de anos (a régua continua mostrando os diplomas) |
| "What I'm about" / "What I bring" | um parágrafo com os ganchos em negrito (Data & AI Engineering Leader, Tech Innovator, Lifelong Learner) | três cards com ícone |
| Assunto do mailto | `[A]` | `[B]` |

## Ajustes da issue #4 (branch `home-about-quick-fixes`, 2026-10-01) — iguais em A e B

- Badges do hero: "2 languages"; sem OBI nem prêmio de poesia (ficam só em Honors, no About).
- Logo wall: só empresas e escolas ("Companies & schools"); `obi.svg` e `obmep.png` removidos de `/assets/logos`.
- Testimonials: a seção continua no código, mas dentro de um comentário HTML na home (A: flag `SHOW_TESTIMONIALS` no `build.js`; B: comentário direto no `b/index.html`).
- Education só no About: `experience.html` lista só cargos nas duas versões; as páginas `education/*.html` continuam e voltam pro `about.html#education`.
- Fotos: `assets/lucas-pro.jpg` (nav/hero/avatares) e `assets/lucas-casual.jpg` (About e "Off the clock"); `lucas-avatar.jpg` e `lucas-fun.jpg` apagados.

## Featured projects (branch `featured-projects`, 2026-10-02) — iguais em A e B

Fonte: `docs/featured-projects-content.md` do lab (texto EN usado literalmente, com as ressalvas "about", "estimated", "a partner platform", "an RPA tool", "a Central Bank rule"; nenhum nome de cliente/fornecedor não confirmado entra no repo público). A: `PROJECTS` em `_build/build.js` (card = `text`, página = `page` + `tech` + `links`). B: `b/_build/patchB.py` seção 3 (`BCARDS` com a divisão problem / delivery / numbers; linha Numbers omitida quando a fonte não traz número).

- Ordem (8): Mission Control, PhYnances, Baby Health, Spot, SOS: Safra's budgeting system, Red Hat AML onboarding, Address-resolution RPA, Data lake for BTG+ payments. Home (A: carrossel, 6 posições a 1440px; B: acordeão mobile + 8 botões desktop, todos com link "Read more →"/"Full case study →") e `projects.html` nas duas versões.
- Páginas adicionadas (A `projects/` e B `b/projects/`, mesmos slugs): `phynances`, `baby-health`, `sos-safra-budgeting`, `aml-onboarding-safra`, `address-rpa-deloitte`, `btg-payments-data-lake`. `mission-control` reescrita com o texto novo.
- Páginas removidas nas duas versões: `projects/data-platform.html`, `projects/ingestion-framework.html` (os bullets do CV continuam nas páginas de cargo TELUS e BTG). Referências corrigidas em `docs/page-inventory.md` e `docs/2016-ideas-review.md`; `llms.txt` regenerado lista os 8.
- Detalhe: bullets da "Page (EN)" como parágrafos com lead-in em negrito, depois Tech (= Stack), depois Links (org `Mission-Control-Hub` e repo `baby-health`, `rel="noopener"`). Spot segue intocado (card e `spot.html`).

## Review fixes (branch `review-fixes`, 2026-10-02) — issue #8 + dois itens da #4, iguais em A e B

- **Busca do footer acha tudo**: 4ª coluna "Pages" no sitemap (Spot, 8 projetos, 10 cargos, 5 cursos, artigos de `_posts`), `hidden` por padrão e mostrada só enquanto há texto na busca (A: `footer()` em `build.js` + `js/site.js`; B: `PAGES_COL` em `patchB.py` + `b/assets/site.js`). Footer vazio continua igual.
- **Contraste**: A nav `#999` → `#555` (`body #topNav a`, `#mobileNav a`; ativo/hover intocados), textos de corpo que usavam `#999` (headline do hero, ticker, langs, hint, nomatch, tech da timeline, nota dos skills, linha de copyright) → `#767676`. B já passava (pílula `#1A1714`, footer branco 72%, dock `#A9A29A` sobre escuro).
- **Um H1 por página**: A: o nome no header virou `<div class="logo">` (CSS replicado em `custom.css`), H1 da home é o `.hero-name`, páginas de detalhe e layout Jekyll usam `<h1 class="case-title">`. B: `spot.html` ganhou `<h1 class="case-title">` (seletor `.case .case-title` em `theme.css`); o resto já tinha um só.
- **CV (texto literal, só erros de língua)**: "AWS suit" → "AWS suite", "P&D" → "R&D", bullet da Bain sobre infraestrutura virou frase completa. B lê os mesmos textos via `data.js`.
- **Linhas editoriais internas da B**: Contact e Experience reescritas pro visitante (a nota "cities will be added" também saiu).
- **404 da A**: piada nova sem enfatizar ausência; B já tinha outro texto.
- **Spot (PT, compartilhado)**: "Stdlib primeiro" agora cita pandas e `requests` como as duas exceções.
- **Cargo ↔ projeto**: `PROJECTS[].role` (slug do EXP) em `build.js` é a única fonte; a página do projeto mostra "Role: …" e a do cargo "Related project(s): …" (Bain ↔ Spot; Safra ↔ SOS e AML; Deloitte ↔ RPA; BTG ↔ data lake). B gera o mesmo em `patchB.py` (`role_of` / `projects_of`).
- **A few numbers**: + "3 personal projects" e "5 professional projects" derivados de `PROJECTS` (A: `NUMBERS`; B: `b/index.html` à mão, grid de 7 colunas ≥ 900px em `theme.css`). B dizia "3 languages" na seção de números; corrigido pra 2 (paridade com a #7).

## Career content (branch `career-content`, 2026-10-02) — iguais em A e B

Fonte: `docs/trajetoria-profissional.md` e `docs/telus-scope-and-recommendations.md` do lab (privados; nada deles é copiado literalmente, e nomes de cliente dos EUA, produtos internos da TELUS, clientes da TELUS e colegas ficam de fora). Fonte única de dados é o `_build/build.js`; `b/_build/data.js` agora também exporta `ABOUT`, `QA`, `RECS`, `HEADLINE`, `SCOPE`, `MOTTO`, `CV_PDF`, `CV_TITLE`.

- **Headline**: "Data & AI Engineering Leader" + linha de escopo ("I lead data and AI teams at TELUS Digital for US clients…") antes do motto. A: `HEADLINE`/`SCOPE`/`MOTTO` no `build.js` (hero, meta description padrão, `llms.txt`, `_config.yml`); hook do "What I'm about" virou "Data & AI Engineering Leader". B: pílula, header aberto, `<title>`, linha do footer, card "What I bring", linha "role" do about-intro e `b/about.html` trocados in place nas 9 páginas-shell (as de detalhe herdam); linha de escopo `<p class="scope">` sob as pílulas do hero (`.hero .scope` em `theme.css`). O grep por "AI Leader" no repo público dá zero.
- **Páginas de cargo**: `EXP[].story` = pares `[label, texto]` (primeira pessoa), renderizados antes dos bullets do CV, que ficam sob o título "From the CV" (`storyHtml` no `build.js`, `story_html` no `patchB.py`; `.from-cv` nos dois CSS). `inline()` dos dois geradores aceita `[texto](href)` (links pra Spot, projetos e repo WindMill). `experience.html` continua só com os bullets do CV; `cvText` segue nos dados. GenAI Manager ganhou `line`, `body` e `tech` reais (antes placeholder).
- **Timeline da home (A)**: a barra de cada empresa aponta pro cargo mais recente (TELUS → GenAI Manager, Safra → Data Engineer). B: a jornada e a régua não linkam cargos; a coluna "Pages" já lista os dois da TELUS.
- **About**: intro = versão EN dos dois parágrafos finais da trajetória (`ABOUT`), seção "Questions I keep asking myself" (`QA`, 4 perguntas, marcada com `<!-- drafted from trajetoria-profissional.md; Lucas to review -->`), Résumé apontando pro PDF. B: seção 4 do `patchB.py` reescreve "Who I am", o botão do résumé e a seção `#questions` a partir dos mesmos dados (idempotente).
- **Recommendations** (`recommendations.html` e `b/recommendations.html`, shell do FAQ na B): cards por empresa a partir de `RECS` (nome, `[ROLE]`, `[Lucas's words about this person]`, `[LinkedIn]`; `data-status="to confirm"` + "(to confirm)" visível pra Deloitte e Bain). Link na coluna "More" do footer, na coluna oculta "Pages" (agora reescrita a cada run na B) e no `llms.txt`.
- **Résumé**: footer "Résumé (PDF)" e About → `/assets/lucas-lukasavicus-cv-en.pdf` (`title="English, Feb 2025"`), com nota de que a versão PT vem depois. O PDF é adicionado pelo Lucas; até lá o link check acusa o arquivo.
- **Projetos**: página do RPA (Deloitte) com "93% of addresses corrected" e "R$700k+ in revenue for Deloitte" no Result (B: também na linha Numbers do card); página do SOS com o time "1 senior backend, 1 junior backend, 2 mid-level frontend developers, plus DB, business and infra teams". Spot intocado.

## Home polish (branch `home-polish`, 2026-10-03) — feedback do Lucas sobre o site no ar

- **"What I'm about" (só A; B mantém os três cards)**: o parágrafo único virou `<dl class="pillars">` em duas colunas (rótulo em small caps à direita | filete `border-left` | frase), 760px, centrado; a 640px os rótulos ficam sobre o texto e o filete some. Frases iguais, sem os "As a …". `build.js` (seção `#pillars`) e `.pillars*` em `custom.css` (com regra `html.dark`).
- **Timeline da home (A)**: rótulos centrados nas barras (28px, 11px/1px), grid mais claro, lane labels 10px `#999`, anos com tick todo ano e rótulo a cada 2 anos abaixo de 1024px (`span.odd`). Tooltip CSS (`<span class="tl-tip">` dentro da barra, cartão branco 12px Georgia com borda `var(--line)`, acima da barra em `:hover`/`:focus-visible`), texto "cargo(s) · empresa · datas"; o mesmo texto fica no `aria-label` do link (o `title` saiu). `.tl-h-wrap` passa a `overflow:visible` a partir de 820px; abaixo disso o wrap ganha `padding-top` pra o tooltip caber dentro do scroll. Dados intocados (UFSCar, USP, PUC Minas nas escolas).
- **"A few numbers" (A e B)**: "26 professional projects" (constante `PROFESSIONAL_PROJECTS` no `build.js`, contagem no lab em `docs/projects-inventory.md`; B à mão em `b/index.html`). "3 personal projects" continua derivado de `PROJECTS`. `llms.txt` não lista números.
- **Bullet duplo no CV**: estava em `experience.html` (A): `.tl-v li::before` (o círculo da timeline vertical) também pegava os `li` aninhados de `.cv`. Agora `.tl-v>li`; `.cv` força `list-style:disc` (aninhado o default do browser é `circle`). B tinha o oposto: o preflight do Tailwind zera `list-style`, então `.detail .cv` e `.tl ul` ganharam `list-style:disc` em `theme.css`.
- Pré-existente, fora do escopo: a home da A estoura a largura a 390px (já acontecia antes desta branch).

## Bug encontrado na passada

B tinha um `index.md`, que o Jekyll converteria em `b/index.html` por cima da home. Removido; o footer da B aponta pro `/llms.txt` da raiz.

## Como refazer este levantamento

```sh
for re in "Search pages" "darktoggle" "data-share" "coming soon" "<dialog" "logos/" "/articles/"; do
  printf "%-16s A:%s B:%s\n" "$re" "$(grep -lE "$re" *.html | wc -l)" "$(grep -lE "$re" b/*.html | wc -l)"
done
ls *.html; ls b/*.html; ls experience education projects; ls b/experience b/education b/projects
```
