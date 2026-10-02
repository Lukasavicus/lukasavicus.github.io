# Inventário de páginas: o que existe hoje × superconjunto × decisões

Data: 2026-10-02. Tarefa 3 da issue [#4](https://github.com/Lukasavicus/lukasavicus.github.io/issues/4) ("page inventory: Lucas remembers ~30 page ideas and sees 7 main pages; count what exists (main + detail + footer pages) against the superset and decide what is still missing").

Comandos (raiz do repo, branch `home-about-quick-fixes`): `ls *.html *.txt; ls experience education projects articles research _posts; ls b/*.html; ls b/experience b/education b/projects`; links de nav/footer via `sed -n '/<footer/,/<\/footer>/p' index.html | grep -oE 'href="[^"]*"'`; ids de seção via `grep -oE '<(section|div|dialog)[^>]*id="[^"]+"'`; presença de componentes via `grep -lE <regex> *.html b/*.html`. Fontes cruzadas: `research/pages-superset.md` (Partes A e C), `research/pages-decisions.md`, `docs/ab-parity.md`.

## 1. O que existe hoje na versão A (`/`)

### 1.1 Páginas principais (nav): 7

Exatamente as 7 que o Lucas vê. Nav de `index.html`: Home · About · Experience · Projects · Articles · Personal · Contact.

| Página | Arquivo | Seções (ids) |
|---|---|---|
| Home | `index.html` | hero-sec, facts, pillars, featured, career, logos, numbers, interests-teaser, testimonials (placeholder), cta |
| About | `about.html` | hero, story, education, skills, howcalc (modal `<dialog>`), honors, resume (placeholder) |
| Experience | `experience.html` | hero, work |
| Projects | `projects.html` | carrossel com 8 projetos (Mission Control, PhYnances, Baby Health, Spot, SOS, Red Hat AML onboarding, Address-resolution RPA, Data lake for BTG+ payments; branch `featured-projects`) |
| Articles | `articles/index.html` (Jekyll) | lista `site.posts` |
| Personal | `personal.html` | hero, interests, travel, photography, musings, fun-facts |
| Contact | `contact.html` | hero, contact-form (mailto), elsewhere |

### 1.2 Páginas de detalhe: 18 (+1 case)

| Pasta | Qtd | Slugs |
|---|---|---|
| `experience/` | 10 | advanced-analytics-consultant-deloitte, data-ai-manager-telus-digital, data-engineer-safra, data-engineer-team-leader-btg-pactual, full-stack-developer-squid, genai-manager-telus-digital, growth-hacking-intern-instacarro, market-intelligence-analyst-b2w, senior-data-engineer-bain, trainee-safra |
| `education/` | 5 | bsc-computer-science-ufscar, mba-business-intelligence-puc-minas, mba-data-science-usp, technical-electronics-senai, technical-it-ete-basilides-de-godoy (o M.Sc. ITA ficou fora, commit `bd24f60`; `docs/ab-parity.md` ainda diz "6") |
| `projects/` | 7 | mission-control, phynances, baby-health, sos-safra-budgeting, aml-onboarding-safra, address-rpa-deloitte, btg-payments-data-lake (branch `featured-projects`; antes eram 3: mission-control, data-platform, ingestion-framework) |
| Case study | 1 | `spot.html` (case Spot em PT, corpo em `_build/spot-body.html`; ligado ao card Spot) |

### 1.3 Páginas de footer ("Explore the site")

Footer de qualquer página de A, 3 colunas:

| Coluna | Link | Destino | Estado |
|---|---|---|---|
| Main | Home, About, Experience, Projects, Articles, Personal, Contact | as 7 acima | ok |
| More | Code Shop | `code-shop.html` (2 snippets: `retry_with_backoff.py`, `debounce.ts`, botão Copy) | ok |
| More | FAQ | `faq.html` (5 perguntas: Can I hire you? / What's Mission Control? / What is Spot? / Which stack? / Can we grab that coffee remotely?) | ok |
| More | Résumé (PDF) | `href="#"`, `title="PDF coming soon"` | **placeholder** |
| More | Tip jar | `href="#"`, `title="coming soon"` | **placeholder** |
| More | This site as markdown | `/llms.txt` | ok |
| More | Research | `/research/` (Jekyll) | ok |
| Meta | 404 | `/404.html` | ok |
| Meta | Design inspired by callieschweitzer.com | externo | ok |
| Meta | Version B | `/b/` | ok |
| Meta | 2016 version | `/2016/` | ok |
| Meta | Contact | `/contact.html` | ok |

Também no footer: busca que filtra o sitemap (`#sitesearch`), ícones sociais (`#socialLinks`), toggle de dark mode, seletor EN · PT (PT `aria-disabled`), "© 2026".

### 1.4 Páginas Jekyll: 7

| Pasta | Qtd | Conteúdo |
|---|---|---|
| `articles/` | 1 índice + 1 post | `articles/index.html`; `_posts/2026-10-01-rebuilding-my-personal-site-with-ai-and-the-double-diamond.md` ("Draft, being written"), permalink `/articles/:title/` |
| `research/` | 5 | `index.md`, `references.md`, `pages-superset.md`, `pages-decisions.md`, `surinder-section-map.md` |

### 1.5 Utilitários e legado

| Item | Arquivo | Nota |
|---|---|---|
| Versão legível por agentes | `llms.txt` | conteúdo do site em markdown |
| 404 | `404.html` | customizada, com o mesmo footer/sitemap |
| Site de 2016 | `2016/` | 12 HTML preservados (index, projects, aboutme/*, READED_BOOKS, run4fun) + banner |
| Build | `_build/build.js`, `_build/spot-body.html` | gera A; excluído do Jekyll |
| Notas de trabalho | `docs/` | excluído do Jekyll (`_config.yml: exclude`) |

### 1.6 Totais

| | A (`/`) | B (`/b/`) |
|---|---|---|
| HTML de topo (7 nav + Code Shop + FAQ + Spot + 404) | 10 | 10 |
| Detalhe (experience 10 + education 5 + projects 7) | 22 | 22 |
| Jekyll (articles 2 + research 5) | 7 | 0, usa os da raiz (links absolutos `/articles/`, `/llms.txt`) |
| Utilitário | `llms.txt` | nenhum (aponta para `/llms.txt`) |
| **Total de URLs navegáveis** | **35 páginas + llms.txt** | **28 páginas** (+ compartilha 7 + llms.txt com A) |
| Legado | `2016/` (12 HTML) | — |

**Paridade A/B confirmada**: `ls b/*.html` devolve os mesmos 10 arquivos de topo e `ls b/experience b/education b/projects` os mesmos 18 slugs (18 = 18). Componentes checados com `grep -lE` em `*.html` vs `b/*.html`: `darktoggle` 10/10, `sitesearch` 10/10, `<dialog>` 1/1, `data-share` 1/1, "Tip jar" 10/10, `mailto:` 10/10, `aria-disabled` (PT) 10/10, "Résumé" 10/10, back-to-top (`uarr`) 10/10, `PLACEHOLDER|coming soon` 10/10. Única diferença de componente: `ticker` (fun facts rotativos) só em A (1/0); em B o equivalente é o "typing" do hero (`docs/ab-parity.md`, diferença de design proposital). **Navegação por teclado** (C19): `docs/ab-parity.md` lista como componente igual nos dois, mas `grep -lE "keydown|ArrowLeft|ArrowRight|keyCode" *.html` devolve 0 em A e 0 em `b/*.html` (há `keydown` só em `b/_astro/hero…js` e `journey…js`, que são o typing e a curva da jornada). Vale confirmar se existe mesmo em A.

## 2. Superconjunto → decisão → existe hoje?

Numeração da coluna "#" é a de `research/pages-superset.md` Parte C (44 itens). Códigos entre parênteses na coluna "Decisão" são os de `research/pages-decisions.md` (que usa a numeração do superconjunto antigo, do lab). "Sem decisão" = nenhuma linha de `pages-decisions.md` fala do item.

### 2.1 Páginas (13)

| # | Item do superconjunto | Decisão (`pages-decisions.md`) | Existe hoje? (onde) |
|---|---|---|---|
| 1 | Home | Sim (A1 #1) | **Sim**: `index.html` |
| 2 | About | Sim (A1 #2) | **Sim**: `about.html` |
| 6 | Work / Projects | Sim (A1 #7) | **Sim**: `projects.html` |
| 23 | Case study / página por projeto | Sim (C23: detalhe de experiências, formação e projetos) | **Sim**: `projects/` (3) + `spot.html`; "Callie + Spot: genial, é literalmente isso" |
| 12 | Experience / Resume / CV | Experience sim (A1 #3); Resume "sim, lugar a definir" (15, E6) | **Experience sim**: `experience.html` + `experience/` (10). **Resume: placeholder** (`about.html#resume` e footer, `href="#"`) |
| 21 | Skills / Stack | Sim (A1 #5); How It's Calculated vira modal (6) | **Sim, placeholder**: `about.html#skills` (13 skills `[PLACEHOLDER]/10`) + modal `#howcalc` |
| 7 | Writing / Blog | **Sem decisão** (nenhuma linha sobre Writing/Articles/Blog) | **Sim**: `articles/` (Jekyll, 1 rascunho); está na nav principal |
| 5 | Contact | Sim (A1 #14) | **Sim**: `contact.html` |
| 9 | Services / Hire me | **Sem decisão** ("O site é um perfil pessoal, não uma empresa" aponta para não) | **Não** (só a pergunta "Can I hire you?" em `faq.html`) |
| 39 | Speaking | **Sem decisão** | **Não** |
| 36 | Books (livros escritos) | **Sem decisão** (n/a: Lucas não publicou livro) | **Não**; "livros lidos" de 2016 também não (ver `docs/2016-ideas-review.md`) |
| 33 | Newsletter | Não (C25: "não tenho") | **Não** (coerente) |
| 14 | Press / Awards / Credenciais | Honors & Awards continua, dentro do About (9) | **Sim**: `about.html#honors` |

### 2.2 Seções (14)

| # | Item do superconjunto | Decisão | Existe hoje? (onde) |
|---|---|---|---|
| 3 | Hero / tagline | Sim (H1 + H2 mini-fatos) | **Sim**: `index.html#hero-sec`, `#facts` |
| 27 | Testimonials / praise | Sim, lugar a definir (16, E7) | **Placeholder**: `index.html#testimonials` (3 placeholders); issue #4: manter comentado |
| 16 | Clientes / logos | Sim (H7 logo wall: empresas, escolas, olimpíadas, projetos) | **Sim**: `index.html#logos` "Companies & schools"; issue #4: tirar olimpíadas |
| 18 | FAQ | Sim, só via footer (H9, E9) | **Sim**: `faq.html` (5 perguntas) |
| 34 | Pricing | **Sem decisão** (perfil pessoal → não) | **Não** |
| 17 | Education | Sim (A1 #4) | **Sim**: `about.html#education` + `education/` (5) + teaser `index.html#career`; issue #4: sai da Experience |
| 24 | Interesses / fun facts / play | Sim, agrupados na página pessoal (11, E3) + teaser na home (H10) | **Sim**: `personal.html#interests`, `#fun-facts`; `index.html#interests-teaser` |
| 29 | Process / como trabalho | "Interessante, mas NÃO é o How It's Calculated. Avaliar como 'como eu trabalho'" (E5) | **Não** como seção; o case `spot.html` (Contexto → Problema → Papel → Solução → Resultados → Lições) é o único "como eu trabalho" |
| 11 | Galeria / fotografia | Sim, na página pessoal (13) | **Placeholder**: `personal.html#photography` (6 fotos placeholder) |
| 13 | Side projects / produtos próprios | Sim (H4 projetos em destaque) | **Sim, placeholders**: `index.html#featured`; issue #4: 3 pessoais + 4–5 profissionais = 8 |
| 38 | Loja / cursos / recursos | Code Shop sim, fora da nav (8, E8), com páginas por snippet | **Parcial**: `code-shop.html` existe; **páginas por snippet não** |
| 25 | Números / stats | Sim (H8, E10) | **Sim**: `index.html#numbers` (5 números); issue #4: novos números |
| 26 | Timeline (datas) | Sim, muito (C21) | **Sim**: `index.html#career` (horizontal) e `experience.html#work` (vertical); issue #4: redesenhar como barras |
| 43 | Mapa / viagens | Sim, na página pessoal (12, E1) | **Placeholder**: `personal.html#travel` (lista + mapa placeholder); issue #4: mapa real |

### 2.3 Componentes (17)

| # | Item do superconjunto | Decisão | Existe hoje? (onde) |
|---|---|---|---|
| 10 | Formulário de contato | Sim (C5); não em toda página (C6) | **Sim**: `contact.html#contact-form` via `mailto:` |
| 35 | Agendar conversa (calendário) | **Sem decisão** | **Não** |
| 40 | Botão de contato flutuante (FAB) | Sim (C7/C8), definir comportamento mobile | **Sim**: FAB "Let's grab a coffee" em todas as páginas de A e B |
| 8 | CTA ao fim da página | Sim na home (H12); nas demais vira FAB | **Sim**: `index.html#cta` + FAB |
| 4 | Redes sociais (header/footer) | Sim, no footer (C1) | **Sim**: `#socialLinks` |
| 32 | Currículo em PDF | Sim, lugar a definir (E6) | **Placeholder**: link `href="#"` "PDF coming soon" (About + footer) |
| 28 | Colophon / "feito com" | **Sem decisão** | **Parcial**: "Design inspired by callieschweitzer.com" no footer; stack/"feito com" não |
| 37 | Busca | Sim (C14) | **Sim**: `#sitesearch` no footer (filtra o sitemap) |
| 30 | RSS | **Sem decisão** | **Não** (`_config.yml` não tem `jekyll-feed`) |
| 37b | Páginas legais | **Sem decisão** | **Não** (site pessoal sem venda; irrelevante enquanto Code Shop for grátis e Tip jar externo) |
| 42 | Troca de idioma | Sim, EN agora, PT depois (C17) | **Sim**: seletor EN · PT, PT `aria-disabled` |
| 22 | Vídeo embutido | **Sem decisão** | **Não** |
| 19 | Ferramenta interativa / jogo | Não (E15) | **Não** (coerente) |
| 41 | Legível por agentes de IA | Sim, muito legal (E13) | **Sim**: `llms.txt` + link "This site as markdown" |
| 20 | Nav fixa / scrollspy | Sim (C3 sticky, C4 mobile, C18 barra de progresso) | **Sim**: `#topNav`, `#mobileNav`, `#progress` |
| 31 | Voltar ao topo | Sim, muito importante (C9) | **Sim** (`&uarr;` em 10/10 páginas) |
| 44 | Dark mode toggle | Pode, baixa prioridade (C26) | **Sim**: toggle no footer, `localStorage` `theme` |

Outros itens de `pages-decisions.md` que não têm linha própria na Parte C: Languages "detalhe pequeno, discreto" (10) → só "2 languages" em `index.html#numbers`, sem detalhe (issue #4 muda para "2 languages"); Musings (E2) → `personal.html#musings` placeholder; Skip link (C15) → sim, 10/10; Share buttons (C16) → sim, páginas de detalhe + Spot; Scroll reveal (C22) → não, coerente; Sidebar fixa (C10) → não, coerente; Nav agrupada/dropdown (C11, "a avaliar") → não; Navegação por teclado (C19) → ver nota em 1.6; Mensagens rotativas estilo loading de jogo (extra da home) → sim em A (ticker), B typing; Let's Talk separada (E4) → não, coerente; Home em prosa (E16) → não, coerente (issue #4 troca as 3 colunas de "What I'm about" por parágrafo, que é outra coisa); Explore the site / sitemap (H11, E17) → sim, footer.

## 3. Aprovado e ainda não existe (ou existe só como placeholder)

| Item aprovado | Decisão | Estado | Depende de |
|---|---|---|---|
| Résumé em PDF | E6 / 15 | link `href="#"` | Lucas enviar o PDF (issue #4, "Needs Lucas") |
| Páginas por snippet do Code Shop | E8 | só `code-shop.html` com 2 snippets inline | decidir se vale (2 snippets não justificam páginas) |
| Code Shop teaser na home | H5 "a definir onde" | não há seção na home | decisão de lugar |
| Tip jar | E12 | `href="#"` "coming soon" | escolher serviço (Ko-fi, Buy Me a Coffee, PIX) |
| Testimonials com conteúdo | E7 / 16 | 3 placeholders; issue #4 manda comentar | pedir depoimentos |
| Skills com nota + How It's Calculated com texto | A1 #5, #6 | `[PLACEHOLDER]/10`, modal placeholder | heurística (issue própria) |
| Mapa real, fotos reais, musings reais | E1, E2, 13 | placeholders em `personal.html` | material do Lucas (issue #4) |
| Featured projects reais (8) | H4 | 4 cards, 1 placeholder de tech | `docs/github-projects-scan.md` + 4–5 profissionais do Lucas |
| Languages como detalhe discreto | 10 | só o número "2 languages" | definir onde (About? mini-fatos?) |
| Process / "como eu trabalho" | E5 "avaliar" | não existe | avaliação pendente |
| Nav agrupada / híbrido nav→sidebar | C10/C11 "a avaliar" | não existe | avaliação pendente |
| Navegação por teclado | C19 "sim" | não localizada por grep em A (ver 1.6) | verificar |
| PT | C17 "PT depois" | seletor com PT desabilitado | tradução |
| FAB no mobile | C7/C8 "definir comportamento" | FAB existe; comportamento mobile não documentado | decisão |

Páginas aprovadas que **existem de fato**: Home, About, Experience, Projects, Personal, Contact, Code Shop, FAQ, 404, `llms.txt`, 3 tipos de detalhe (18 páginas). Ou seja, das páginas aprovadas só faltam as de snippet; o que falta é conteúdo, não página.

## 4. Existe sem ter sido decidido

| Item | Onde | Observação |
|---|---|---|
| **Articles** (Writing / Blog) | `articles/`, `_posts/`, link na nav principal | `pages-decisions.md` não tem nenhuma linha sobre Writing/Articles; `pages-superset.md` registra 16/24 referências. Entrou direto na nav (7ª página). Issue #4 já trata ("collect article ideas; build a backlog"). Falta só registrar a decisão. |
| **Research** (5 páginas Jekyll) | `research/`, link no footer "More" | Documentação do redesign publicada; não está no superconjunto nem nas decisões. |
| **Spot como página inteira em PT** | `spot.html` | Decisões falam de "Callie + Spot: genial" (protótipo v4) e de páginas de detalhe (C23), mas não de um case longo separado das páginas de `projects/`. Hoje Spot é card em `projects.html` → `spot.html`, enquanto os outros 3 projetos têm detalhe curto em `projects/`. Dois formatos para a mesma coisa. |
| **Versão B em `/b/`** | 28 páginas | Teste A/B por caminho; `pages-decisions.md` fala dos dois protótipos, não de publicar os dois. Registrado só em `README.md` e `docs/ab-parity.md`. |
| **Versão 2016 em `/2016/`** | 12 HTML + link no footer "Meta" | Preservação; não decidida por escrito (o superconjunto cita "Click to time travel" da Brittany Chiang como extra, sem decisão). |
| Colophon "Design inspired by callieschweitzer.com" | footer | Superconjunto item 34, sem decisão. |
| FAQ com 5 perguntas específicas | `faq.html` | H9 dizia "perguntas a definir"; as 5 atuais foram escritas sem registro. |
| Seção "Elsewhere" no Contact | `contact.html#elsewhere` | Coberto por C1 (ícones sociais), mas como seção própria não foi decidido. |

## 5. Resposta curta

- **Existem hoje**: 35 páginas em A (7 principais + 2 de footer + Spot + 404 + 18 detalhes + 7 Jekyll) + `llms.txt`; B tem as mesmas 28 páginas estáticas e compartilha articles/research/llms com a raiz. Paridade confirmada por `ls` e `grep`.
- **~30 ideias → 7 principais**: a lista de 2016 tinha 20 seções; o superconjunto de 2026 tem 44 itens (13 páginas, 14 seções, 17 componentes) + ~17 extras. As decisões reduziram para 7 páginas na nav + 2 no footer (Code Shop, FAQ) + 1 modal + 1 página pessoal agregadora + 3 tipos de detalhe. Isso está implementado.
- **Aprovado e faltando**: nenhuma *página* além das de snippet; faltam **conteúdos** (PDF, Tip jar, testimonials, notas de skills, mapa/fotos/musings, featured reais) e 4 avaliações pendentes (Process, nav agrupada, teclado, FAB mobile).
- **Existe sem decisão**: Articles, Research, Spot como case longo, `/b/`, `/2016/`, colophon, as 5 perguntas do FAQ.
