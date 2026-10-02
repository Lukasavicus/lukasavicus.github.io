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
| "What I'm about" / "What I bring" | um parágrafo com os ganchos em negrito (AI Leader, Tech Innovator, Lifelong Learner) | três cards com ícone |
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

## Bug encontrado na passada

B tinha um `index.md`, que o Jekyll converteria em `b/index.html` por cima da home. Removido; o footer da B aponta pro `/llms.txt` da raiz.

## Como refazer este levantamento

```sh
for re in "Search pages" "darktoggle" "data-share" "coming soon" "<dialog" "logos/" "/articles/"; do
  printf "%-16s A:%s B:%s\n" "$re" "$(grep -lE "$re" *.html | wc -l)" "$(grep -lE "$re" b/*.html | wc -l)"
done
ls *.html; ls b/*.html; ls experience education projects; ls b/experience b/education b/projects
```
