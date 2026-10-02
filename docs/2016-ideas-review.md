# Revisão das ideias de 2016: o que virou página, o que foi esquecido, o que foi descartado

Data: 2026-10-02. Tarefa 2 da issue [#4](https://github.com/Lukasavicus/lukasavicus.github.io/issues/4) ("revisit the 2016 ideas (README, TODO, references) to check nothing was forgotten").

## Fontes

Comandos rodados na raiz do repo, branch `home-about-quick-fixes`:

| Fonte | Como li |
|---|---|
| README de 2016 (versão antes da reescrita) | `git show 449a45b:README.md` |
| TODO de 2016 (raiz) | `git show 449a45b:TODO_LIST.txt` |
| README/TODO da pasta do site | `git show 449a45b:LUCASLUKASAVICUS_SITE/README.txt`, `git show 449a45b:LUCASLUKASAVICUS_SITE/TODO_LIST.txt` (mesmo conteúdo do README/TODO da raiz, sem a seção "Some ideas") |
| Páginas de 2016 | `2016/index.html`, `2016/projects.html`, `2016/aboutme/{articles,extracurricular,social,tastes,index,test}.html`, `2016/aboutme/READED_BOOKS/`, `2016/aboutme/run4fun/`; nav e headings extraídos com grep/sed; texto visível com Python (removendo comentários HTML) |
| Radar de habilidades | `2016/myownsdn/script_index.js` |
| Lista consolidada de 2016 | `/Users/lucassilva/Documents/90.LUKE/2.PROJECTS/lukasavicus-site-lab/lukasavicus.github.io/REFERENCES.md`, seções 1 e 2 (espelhada em `research/references.md`) |
| Site atual (A) | `index.html`, `about.html`, `experience.html`, `projects.html`, `personal.html`, `contact.html`, `code-shop.html`, `faq.html`, `spot.html`, `404.html`, `articles/index.html`, `_posts/`, `research/*.md`, `llms.txt`; ids de seção e headings via grep |
| Decisões | `research/pages-decisions.md` |

## O que o site de 2016 realmente tinha (fatos)

- **Nav**: Profile · Projects · About Me (dropdown: Extracurricular, Social Engament, Tastes) · Awards (`href="#"`, nunca construído) · Calculus (`href="#"`, nunca construído; é o "How It's Calculated") · Other (→ `aboutme/READED_BOOKS/index.html`). Ícones Facebook, LinkedIn, GitHub.
- **Home** renderizada: bio em 1ª pessoa ("Treinee at Safra Bank… Machine Learning and Competitive Programming… soccer, skating and table-tennis… Star Wars and Sci-Fi Novels… learn and teach about Math and Programming") + Contact. O resto está em comentário HTML (nav alternativa "Profile · Experiences · Abilities · Projects · Contact", igual ao pascalvangemert.nl).
- **Radar de habilidades**: `script_index.js` desenha um radar Chart.js com 9 eixos e valores: Data Analysis 73, Programming 80, Software Engineering 70, Architecture of Computers and OS 68, Network 45, Computing Theory 90, Mathematics 72, Graphic Computing 55, Security 20; e uma função `loadStats()` para barras de progresso (`.adp_progress_bar`). O canvas `#radar-chart` **não aparece** em `2016/index.html` (nem em comentário): o script é carregado mas não tem onde desenhar. Ou seja, o radar foi preparado e não ligado.
- **Projects**: 4 cards: MeshSim, Tesouro Direto, InstaTools, Krakatoa Lang (descrições lorem).
- **About Me**: `articles.html` (5 artigos placeholder), `extracurricular.html` e `social.html` (4 "Media heading" placeholder cada), `tastes.html` (galeria "Natureza"/"Test", 5 fotos placeholder), `READED_BOOKS/` (app Bootstrap "Livros Lidos" lendo `data.csv`: capa, livro, páginas, dias, ano, editora, autor; 2005–2007), `run4fun/` (protótipo do Run4Fun, hoje `Mission-Control-Hub/run4fun`), `index.html`/`test.html` (teste de webcam).
- **TODO 2016**: (1) decidir se Education leva descrição breve; (2) grid de projetos deve reagrupar ao redimensionar (4 → 3 por linha).

## Tabela: ideia de 2016 → onde está hoje

Legenda: **EXISTE** (página/seção), **PARCIAL**, **ESQUECIDA** (não está no site nem foi decidida em `pages-decisions.md`), **DESCARTADA** (decisão registrada ou razão objetiva).

### Do README de 2016, seção "Some ideas"

| Ideia de 2016 | Status | Onde está hoje / motivo |
|---|---|---|
| Endereços próprios (`lucaslukasavicus.co.nf`, `lucassilva.co.nf`, `givemeajob.co.nf`) | **ESQUECIDA** | Site vive em `lukasavicus.github.io`, sem domínio custom (`_config.yml: url: https://lukasavicus.github.io`). Nunca entrou no superconjunto nem nas decisões. Hoje seria um domínio `.com`/`.dev`, não `.co.nf`. |
| Formato: timeline horizontal ou vertical | **EXISTE** | A: timeline horizontal na home (`index.html#career`) e vertical em `experience.html#work`; B: curva da jornada + régua de anos (`docs/ab-parity.md`). Decisão C21 "Timeline visual: sim, muito". Issue #4 pede redesenhar a da home como barras com duração. |
| **Timeline colorida por tipo de evento** (preto acadêmico, branco certificados/menções/idiomas, vermelho extracurricular, azul social/missões, verde profissional) | **ESQUECIDA** | A timeline atual só tem Experience + Education (dois tipos, sem código de cor por tipo). Não há eventos extracurriculares, sociais nem certificados na timeline. Não aparece em `pages-superset.md` nem em `pages-decisions.md`. É compatível com o pedido da issue #4 ("bars with duration"): a cor por tipo pode entrar no mesmo redesenho. |
| **Scores e Comprovantes** (página com rendimento/aproveitamento nos cursos e atividades) | **ESQUECIDA** | Nada no site. A palavra "scores" só aparece em `about.html#skills` ("Scores are [PLACEHOLDER]"), que é outra coisa (nota de skill). Não está no superconjunto (nenhuma das 24 referências tem) nem nas decisões. As páginas de detalhe de Education (`education/*.html`, 5) seriam o lugar natural se voltar. |
| Controle back-end MVC-DAO para a timeline | **DESCARTADA** | Site é estático: A gerada por `_build/build.js`, B HTML estático, artigos/pesquisa via Jekyll (`README.md`). Decisão implícita (não registrada por escrito). |
| Projetos e portfólio | **EXISTE** | `projects.html` + `projects/{mission-control,data-platform,ingestion-framework}.html` + `spot.html`. |
| CV em LaTeX | **PARCIAL** | Decisão E6/15 "Resume: sim, lugar a definir". Existe `about.html#resume` e link "Résumé (PDF)" no footer, ambos `href="#"` com `title="PDF coming soon"`. Issue #4: "add the résumé PDF (Lucas sends it)". LaTeX em si é só o meio. |
| Habilidades técnicas com % de domínio | **PARCIAL** | `about.html#skills`: 13 skills em 5 grupos, "/10", todas `[PLACEHOLDER]`. Issue #4: "define the scoring heuristic → questionnaire → fill the scores (own issue)". O **formato radar** de 2016 (9 eixos) não foi reaproveitado: hoje é lista. |
| "Entenda como é calculado" (página explicando a % de domínio) | **EXISTE** (como modal) | `about.html#howcalc` + `<dialog>` (decisão: "vira modal, não página. Ponto."). Conteúdo ainda placeholder; depende da heurística. |
| Conferir sites: Marcos Cavalcante, Breno Tomazella | **ESQUECIDA** | Não estão em `REFERENCES.md` (14 referências originais + 8 novas) nem em `research/references.md`; grep por "cavalcante\|tomazella" no lab e no repo não encontra nada. São os únicos dois nomes da curadoria de 2016 que ficaram de fora. |
| Tema: Programming vs. Star Wars | **DESCARTADA** | `REFERENCES.md`: "Temas nunca decididos". O design saiu das referências (A: Callie, B: Surinder). Star Wars sobrou só na bio de 2016; em `personal.html#interests` hoje é "Reading (a book list will come later)". |

### Elementos 1–10 e Seções 1–20 (README/README.txt de 2016)

| # | Ideia de 2016 | Status | Onde está hoje / motivo |
|---|---|---|---|
| 1 | Profile | **EXISTE** | `index.html#hero-sec` (+ `#facts`, `#pillars`) e `about.html#story`. |
| 2 | Experiences | **EXISTE** | `experience.html#work` + 10 páginas em `experience/`; teaser `index.html#career`. |
| 3 | Abilities | **PARCIAL** | `about.html#skills` (placeholders). Ver "Habilidades" acima. |
| 4 | Projects | **EXISTE** | `projects.html`, `projects/` (3), `spot.html`. |
| 5 | Contact | **EXISTE** | `contact.html#contact-form` (mailto) + `#elsewhere`; FAB "Let's grab a coffee" em todas as páginas; `index.html#cta`. |
| 6 | Writing (opinião) | **EXISTE** | `articles/index.html` (Jekyll, `site.posts`); 1 post rascunho em `_posts/`. Issue #4: montar backlog de ideias de artigos. |
| 7 | Speaking (palestras e aulas) | **ESQUECIDA** | Não está em nenhuma página nem em `pages-decisions.md` (nenhuma linha menciona Speaking). `pages-superset.md` registra Speaking em 3/24 referências (XV, AS, JK). A tagline do site diz "sometimes teaching", mas não há onde listar aulas/palestras. |
| 8 | Code Shop (snippets grátis) | **EXISTE** | `code-shop.html` (2 snippets: `retry_with_backoff.py`, `debounce.ts`, botão Copy), link no footer. Decisão E8: "sim, fora da nav principal". Páginas por snippet (E8) ainda não existem. |
| 9 | Testimonials | **PARCIAL** | `index.html#testimonials` com 3 placeholders; issue #4 manda manter no código comentado. Decisão E7: "sim, lugar a definir". |
| 10 | Map (Trips) | **PARCIAL** | `personal.html#travel`: lista "Been there" (4 lugares), bucket list por continente e um placeholder de mapa. Issue #4: "real map of visited places". |
| 11 | Articles | **EXISTE** | igual a 6. |
| 12 | Photography | **PARCIAL** | `personal.html#photography`, 6 fotos placeholder. Issue #4: "real photos". |
| 13 | Musing | **PARCIAL** | `personal.html#musings` + ticker de fun facts na home (A). Issue #4: "real musings (short phrases)". |
| 14 | Books | **ESQUECIDA** | Em 2016 havia um app inteiro (`READED_BOOKS`: CSV com livro, páginas, dias de leitura, ano, editora, autor). Hoje só "Reading (a book list will come later)" em `personal.html#interests`. Não está em `pages-decisions.md` (o superconjunto lista "Books" como livros *escritos* pelo autor, outra coisa). |
| 15 | **Personal Recommendations** | **ESQUECIDA** | É exatamente a ideia que o Lucas lembrou agora na issue #4: pessoas excelentes com quem trabalhou e a percepção dele sobre elas, com link para site/LinkedIn (o inverso de Testimonials). Já estava na lista de 2016 como item 15 e no `REFERENCES.md` do lab (item 15, "Personal Recommendations"). Não está em nenhuma página, nem em `pages-superset.md` (nenhuma das 24 referências tem), nem em `pages-decisions.md`. grep "recommend" nos HTML de A: 0 ocorrências. Lugar natural: ao lado de Testimonials (home ou About) ou seção própria em `personal.html`. |
| 16 | Gostos / Tastes | **EXISTE** | `personal.html#interests` e `#fun-facts`; teaser `index.html#interests-teaser` ("Off the clock"). |
| 17 | Social Engagement (projeto missões) | **ESQUECIDA** | 2016 tinha `aboutme/social.html` (stub) e a cor azul da timeline reservada para isso. Hoje não há seção, e `pages-decisions.md` não menciona (o superconjunto também não tem equivalente). A bio em `llms.txt` cita fé ("education and God") mas não as atividades. |
| 18 | How It's Calculated | **EXISTE** (modal) | `about.html#howcalc`. |
| 19 | Prizes, Honors, Mentions, Certifieds | **EXISTE** | `about.html#honors` (OBI 4º lugar regional, OBMEP menção [a confirmar], prêmio de poesia Barueri, cursos Alura, "certifications: none yet"). Decisão: "Honors & Awards continua, mas dentro do About". Issue #4 tira OBI/poesia dos badges da home e da logo wall, não do About. |
| 20 | Extracurricular | **ESQUECIDA** (como seção) | 2016 tinha `aboutme/extracurricular.html` (stub) e a cor vermelha na timeline. Hoje as olimpíadas estão em Honors e não há lugar para outras atividades extracurriculares (monitoria, maratonas de programação, etc.). Não está em `pages-decisions.md`. |

### Outras coisas do site de 2016

| Item | Status | Onde está hoje / motivo |
|---|---|---|
| Nav "Awards" (`#`) | **EXISTE** | virou `about.html#honors`. |
| Nav "Calculus" (`#`) | **EXISTE** | virou o modal How It's Calculated. |
| Nav "Other" → Livros Lidos | **ESQUECIDA** | ver Books (14). |
| Projetos de 2016: MeshSim, Tesouro Direto, InstaTools, Krakatoa Lang | **ESQUECIDA** | Nenhum está em `projects.html` (hoje: Mission Control, Spot, Data Platform, Ingestion framework). Os repositórios de dois deles ainda existem (privados; detalhes no scan de repositórios guardado no lab). Candidatos para completar a lista de 8 da issue #4. |
| `run4fun/` (protótipo) | **ESQUECIDA** | Repo `Mission-Control-Hub/run4fun` (público, 8/17 commits, README "Web App to manage your Physical Activities… reward system"). Não está no site. |
| Mapeamento "estilo X → seção Y" (Ximena → Writing/Speaking; Devon → Code Shop; Kristi → Testimonials; Sarah → Relax) | **EXISTE** | Virou a matriz referência × seção em `research/pages-superset.md` (Parte B) e `research/references.md` seção 2. |
| 14 referências de sites | **EXISTE** | `research/references.md` com status 2026 + 8 novas (lab `REFERENCES.md`); 24 réplicas no lab. |
| TODO: descrição breve em Education | **EXISTE** | 5 páginas em `education/` + `about.html#education`. Issue #4: Education fica só no About (sai da Experience). |
| TODO: grid de projetos responsivo | **EXISTE** | Decisão "Mobile ready é obrigatório"; A usa carrossel, B cards expansíveis. |
| Bio 2016: Star Wars, sci-fi, futebol, skate, tênis de mesa, ensinar matemática/programação | **PARCIAL** | `personal.html#interests` lista competitive programming, AI product dev, cozinhar, leitura, viagens, filho. Esportes e "ensinar" não aparecem. Material para os musings/fun facts da issue #4. |

## Resumo

**Esquecidas (não estão no site nem nas decisões):** Recommendations (item 15 de 2016), Scores e Comprovantes, timeline colorida por tipo de evento, Speaking, Books/livros lidos, Social Engagement, Extracurricular como seção, domínio próprio, referências Marcos Cavalcante/Breno Tomazella, projetos de 2016 (MeshSim, Tesouro Direto, InstaTools, Krakatoa Lang, Run4Fun) e o formato radar das skills.

**Descartadas com motivo:** back-end MVC-DAO (site estático), tema Programming/Star Wars (design veio das referências).

**Parciais (existem com placeholder, já cobertas pela issue #4):** Résumé PDF, Skills com nota, Testimonials, Map, Photography, Musings.
