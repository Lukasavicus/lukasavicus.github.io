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
| Timeline | horizontal na home, vertical na Experience | curva da jornada + régua de anos |
| Assunto do mailto | `[A]` | `[B]` |

## Bug encontrado na passada

B tinha um `index.md`, que o Jekyll converteria em `b/index.html` por cima da home. Removido; o footer da B aponta pro `/llms.txt` da raiz.

## Como refazer este levantamento

```sh
for re in "Search pages" "darktoggle" "data-share" "coming soon" "<dialog" "logos/" "/articles/"; do
  printf "%-16s A:%s B:%s\n" "$re" "$(grep -lE "$re" *.html | wc -l)" "$(grep -lE "$re" b/*.html | wc -l)"
done
ls *.html; ls b/*.html; ls experience education projects; ls b/experience b/education b/projects
```
