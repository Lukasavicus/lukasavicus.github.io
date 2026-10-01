---
layout: default
title: Pages superset
---

Análise feita em 2026-09-30 sobre os **24 sites originais** listados no índice da v1 (lab privado), não sobre as réplicas (o `pages-superset.md` anterior analisou as réplicas, que têm o conteúdo do Lucas, e por isso está errado; ele foi mantido intacto).

## Metodologia

1. Para cada referência, baixei o HTML cru da URL original com `curl -sL` (`-k` no rleonardi, SSL expirado). Sites mortos ou versões antigas vieram do Wayback Machine via `web.archive.org/web/<timestamp>id_/<url>` (o `id_` devolve o HTML sem a barra do Archive). Segui os links internos da nav/footer (1 nível, até ~10 URLs por site). HTMLs salvos no scratchpad da sessão em `orig/<ref>/`, fora do repo.
2. De cada HTML extraí: `<title>`, `h1/h2/h3`, `id`/`class` de `section`/`div` de topo, `aria-label`, links de `nav`/`footer`, `<form>` e inputs, e um grep de palavras-chave (newsletter, calendly, pdf, rss, dark-mode, etc.). Para SPAs sem conteúdo no HTML (andrevv atual, pascalvangemert atual, adamhartwig) usei o texto visível possível, os ids de rota, o repositório público (pascal) e as anotações de [references](/research/references/).
3. Nomes equivalentes foram normalizados (About = Bio = Info = Profile = Sobre; Work = Projects = Portfolio = Case studies = Designs; Writing = Blog = Articles = Posts = Ratgeber), mantendo os nomes originais entre parênteses.
4. Limites: "Dark mode" só conta se há **toggle**; `prefers-color-scheme` automático (andrevv, marty, finseo, rubenmarcus) não conta. "CTA ao fim da página" conta quando a página termina com um bloco de chamada para ação (contato, agendar, comprar), não apenas o footer.

### Referências analisadas

| Sigla | Referência | URL analisada | Fonte / data |
|---|---|---|---|
| BC | Brittany Chiang | https://brittanychiang.com/ (+ /archive) | vivo |
| AH | Adam Hartwig | https://www.adamhartwig.co.uk/ (+ /about, /skills, /work-and-play, /awards, /contact, /login) | vivo (SPA, mesmo HTML em todas as rotas) |
| PvG | Pascal van Gemert | https://www.pascalvangemert.nl/ | **atual não carregou** (HTTP 429 em todas as tentativas, inclusive assets; snapshot Wayback 2026-09-07 é só a casca Vue `div#app`). Analisado o snapshot **Wayback 2016-01-14** (`20160114014829`) + repositório github.com/pascalvgemert/resume |
| RL | Robby Leonardi | http://www.rleonardi.com/ (+ /interactive-resume, /illustration-portfolio, /design-portfolio, /tutorial/design-portfolio) | vivo, SSL expirado (`-k`) |
| RM | Ruben Marcus | https://www.rubenmarcus.dev/ (+ /pt, /portfolio, /ai, /skills, /demos, /blog, /about, /llms.txt) | vivo |
| CS | Callie Schweitzer | https://callieschweitzer.com/ (+ /bio, /journalistic-roots, /contact) | vivo (Squarespace) |
| IE | Ian Enders | http://ianenders.com/ (+ /resume.html) | Wayback 2016-10-02 (`20161002140100`) |
| XV | Ximena Vengoechea | https://www.ximenavengoechea.com/ (+ /bio, /press, /faqs, /books, /articles, /newsletter, /illustrations, /uxresearch, /the-life-audit, /contact) | vivo (Squarespace) |
| DB | Deda (Deidre Bain) | http://www.deda.me/ (+ /work.html) | Wayback 2016-12-07 (`20161207164645`) |
| AS | Allison Stadd | http://www.allisonstadd.com/ (+ /bio, /contact, /fun-facts, /writing, /social-media-marketing, /speaking, /photography) | Wayback 2016-03-25 (`20160325165718`); site atual (2026) também baixado para contraste |
| AE | Ana Enders | http://anaenders.com/ | Wayback 2017-04-26 (`20170426094811`); o `id_` veio comprimido/ilegível, usei a versão replay do mesmo snapshot |
| MR | Marty (Ringlein) | http://marty.com/ | Wayback 2016-01-11 (`20160111050325`, timeline horizontal) + site atual https://marty.com/ (+ /cv, /cv/investor, /cv/entrepreneur, /cv/innovation, /contact) |
| AM | andrevv (Andrew McCarthy) | https://andrevv.com/ (+ /info, 8 páginas de projeto) | vivo (SPA) + Wayback 2016-03-04 (`20160304234230`, + /work, /contact) |
| MF | Matt Farley | https://mattfarley.ca/ (+ /about, /consulting, /mentorship, /posts, /contact, /startup-inquiry, /project-planner) | vivo |
| SC | Sarah Li Chang | http://www.sarahlichang.com/ (+ /about, /work, /thoughtsketches) | Wayback 2016-03-13 (`20160313074414`); /map, /photography, /musings não estavam arquivados |
| KH | Kristi Hines | http://kristihines.com/ (+ /about, /freelance-writing, /testimonials, /freelance-writing-faq, /contact, /blog, /online-marketing-tools-small-business-resources, /policies) | Wayback 2016-12-29 (`20161229164141`) |
| KL | Kristi Leilani | https://kristileilani.wordpress.com/ (+ /about, /contact) | vivo (WordPress.com) |
| DS | Devon Stank | http://www.devonstank.com/ (+ /home, /squarespace-code-shop, /portfolio, /about, /resume, /blog, /contact, 2 projetos) | Wayback 2016-04-02 (`20160402150934`); também 2014-08-03 (só home) e site atual (2026, virou negócio) |
| AR | Andy Rutledge | https://andyrutledge.com/ (+ 6 cases, /book, /the-employable-web-designer.html) | vivo |
| BN | Bitnomial | https://bitnomial.com/services (+ home, /market, /about, /blog, /help, /disclosures, /exchange/docs) | vivo (institucional) |
| JK | Jake Knapp | https://jakeknapp.com/ (+ /sprint, /make-time, /workshops, /speaking, /posts, /contact) | vivo (Squarespace) |
| ST | Surinder | https://www.surinder.design/ (+ /work, /process, /about, 3 cases, /ask/library, 1 /ask/…) | vivo |
| NP | Nordpixel | https://nordpixel.ch/ (+ /about, /preise, /ratgeber, /kontakt, /webdesign, /ki, /website-check, /partner, /jobs) | vivo (agência, em alemão) |
| FS | Finseo | https://www.finseo.ai/ (+ /de, /enterprise, /pricing, 5 páginas de produto) | vivo (SaaS) |

LinkedIn (999) foi ignorado. Nenhum servidor local ou processo em background foi deixado rodando.

---

## Parte A. Lista consolidada (o superconjunto)

Formato: **Nome normalizado** (nomes originais): descrição. → referências.

### A1. Páginas principais

1. **Home / Landing** (Home, Startseite, "About Jake"): ponto de entrada; em 9 sites é one-page com tudo dentro (BC, PvG, DB, IE, AE, MR-2016, KH, AR, AM-2016). → todas as 24.
2. **About** (About, About me, Bio, Info, Profile, Sobre, Über uns, "Work./Play."): quem é a pessoa; às vezes em 1ª pessoa curta na home + bio longa em 3ª pessoa numa página (CS, XV, JK). → 23 (todas menos FS).
3. **Work / Projects** (Work, Projects, Portfolio, Work and Play, Designs, Case Studies, My Work, Projekte/Referenzen, Illustrations, Demos, "All Projects" archive): lista de trabalhos. → BC, AH, PvG, RL, RM, XV, DB, AE, MR, AM, MF, SC, KH, KL, DS, AR, ST, NP.
4. **Case study / página por projeto** (View Details, Deep dive, /work/slug, /work-and-play/slug): página dedicada com desafio → abordagem → resultado (ST), ou brief → objetivos → outcome + CTA (AR). → AH, RM, MR, AM, DS, AR, ST.
5. **Experience / Resume / CV** (Experience, Experiences/Careers, Résumé, Resume, cv, Journalistic Roots, Working Experience, Career History, Executive Summary, Previous Roles, timeline): histórico profissional com datas. → BC, PvG, RL, RM, CS, IE, AE, MR, DS, ST.
6. **Skills / Stack** (Skills, Abilities, Tech stack, Technologies, "Tools I ship with", Agent Skills, Languages, Tools): competências, muitas vezes com nível/percentual ou tags por projeto. → BC, AH, PvG, RL, RM, AM, MF, DS.
7. **Writing / Blog** (Writing, Blog, Articles, Posts, Popular Posts, #designerthoughts, Thought Sketches, Musings, Ratgeber, Notes, Tutorial, Ask library): textos próprios; em BC e JK são links para Medium. → BC, RL, RM, XV, AS, AE, MF, SC, KH, KL, DS, AR, BN, JK, ST, NP.
8. **Contact** (Contact, Contato, Kontakt, Say Hello, Get in touch, Help, "Hey there!"): página ou seção final; vai de só um e-mail (CS, XV, JK) a formulário + agenda + WhatsApp (NP). → 20 (ausente em BC, IE, AE, AR, que só têm redes/e-mail inline).
9. **Services / Hire me** (Services, Consulting, Mentorship, Advisory, Office Hours, Workshops, Writing Services, Code Shop, Angebot, "Hire me for", "How I help", "Ways to work together"): o que se pode contratar, com escopo e às vezes preço. → AH, RM, XV, DB, AS, MF, KH, DS, AR, BN, JK, ST, NP, FS.
10. **Speaking** (Speaking, Keynotes): temas, onde já falou, formatos, formulário de pedido. → XV, AS, JK.
11. **Books** (Books, Sprint, Make Time, My Books): página por livro com capa, praise e links de compra. → XV, AR, JK.
12. **Newsletter** (Newsletter, Field notes, Code Shop Newsletter, Subscribe): página própria com arquivo + inscrição (XV, AS) ou bloco no footer (RM, DS, KL). → RM, XV, AS, KL, DS.
13. **Press / Awards / Credenciais** (Awards, Press, Selected press, "As Seen On", News, Credentials, Patents, Certifications): reconhecimento externo. → AH, RL, IE, XV, DB, KH, BN, ST, NP.

### A2. Seções da home e de páginas internas

14. **Hero / tagline**: frase de posicionamento no topo ("Designer, Frontend Developer & Mentor"; "People never say where a product hurt them. They just leave."). → 21 (IE, AE e SC começam direto no conteúdo).
15. **Testimonials / praise** (Testimonials, Happy Mentees, "What clients say", Stimmen, "Hear it from the founders", blurbs de livro): citações de terceiros. → XV, MF, KH, JK, ST, NP, FS.
16. **Clientes / logos** ("I'm proud to have collaborated with", "Clients since 2007", Incredible Partners, Kundenlogos, "Trusted by"): parede de marcas. → RM, AE, MR, MF, JK, ST, NP, FS.
17. **FAQ** (FAQs, "Common Questions", "Häufige Fragen", "What agents and teams usually ask"): perguntas frequentes; na XV é página e filtra pedidos antes do contato. → RM, XV, KH, DS, BN, ST, NP, FS.
18. **Pricing** (Preise, Spot Mentoring $150…, "$3,000 fixed · One flow · One week"): preços explícitos. → MF, DS, ST, NP, FS.
19. **Education** (Educations, Education, Professional certifications): formação, geralmente dentro do CV/About. → PvG, RM, IE, DB, AE, MR, DS, ST.
20. **Interesses / fun facts / play** ("things I love" grid, Fun Facts, "Play.", "A few fun facts", "A look into my life", Interests, "Sports Fan"): gostos pessoais. → AH, PvG, RL, IE, AS, AE, DS.
21. **Process / como trabalho** (Process, "The week", "My Process", "In vier Schritten", "How it works", "Behind the method", goals → outcome nos cases): metodologia em etapas. → RL (tutorial), RM, DB, AR, ST, NP.
22. **Galeria / fotografia** (Photography, Illustrations, screenshots de projeto, before/after rail, slideshow): imagens como conteúdo. → AH, RL, XV, DB, AS, AM, SC, KL, AR, ST, NP.
23. **Side projects / produtos próprios** (My Startup Projects, Products, Demos, Code Shop, The Life Audit, ProUX, Halcyon Theme, Markets): coisas que a pessoa criou e mantém, com status (acquired / exited / on hold no MF). → BC, AH, RL, RM, XV, MF, DS, BN, ST, FS.
24. **Loja / cursos / recursos** (Code Shop, Courses, Templates, Recommended Resources, links de compra de livro): venda direta ou afiliados. → KH, DS, JK (AS atual também: Templates + cart).
25. **Números / stats** ("Shipped, measured.", "+21% checkout", "100k+ installs", percentuais de skill, "19 years in UX", GitHub activity): prova quantitativa. → BC, AH, PvG, RL, RM, ST, FS.
26. **Timeline (datas)**: cronologia explícita; no MR-2016 o site inteiro é uma linha do tempo navegável por teclado. → BC, PvG, RL, RM, IE, MR, DS, BN, ST.
27. **Mapa / viagens** (Map): página de mapa (SC; não arquivada, só na nav). → SC.

### A3. Componentes recorrentes

28. **Formulário de contato** (name/email/message; MF tem 3 formulários distintos por intenção: contact, startup-inquiry, project-planner; DS tem Feature Request). → AH, RL, RM, DB, MF, SC, KH, KL, DS, JK, NP.
29. **Agendar conversa** (Cal.com "Book a 15-min intro", intro.co "Schedule a Meeting", "Erstgespräch buchen", Calendly "Book Demo"). → RM, MR, NP, FS.
30. **Botão de contato flutuante (FAB)** (`#v2-contact-float` do ST com "Email me / WhatsApp me"; widget de chat do FS). → ST, FS.
31. **CTA ao fim da página** ("Start a project / Let's do this", "Interested? get in touch", "Hire a Squarespace Specialist today" em todo preFooter, "Start Trading" em toda página, "Lass uns über dein Projekt sprechen", "If you have a … project" nos cases do AR, "Get in touch / Book a workshop / Learn More" no JK). → AH, PvG, RL, RM, DB, MR, MF, KH, DS, AR, BN, JK, ST, NP, FS.
    > **Nota:** o padrão "cada página termina com um convite para conversar" (jakeknapp: Speaking termina em "Get in touch", Workshops em "Book a private workshop", livros em "Learn More"; mattfarley: toda página termina em "Start a project / Book a consult / Be my guest") é a ideia a adotar como **FAB fixo** no site do Lucas: um único "vamos conversar" sempre visível, em vez de repetir um bloco no fim de cada página. O único personal site que já faz isso é o surinder.design.
32. **Redes sociais no header/footer** (GitHub, LinkedIn, Twitter/X, Instagram, Dribbble, Behance, Medium, Substack, Goodreads, CodePen, npm, Telegram, Mastodon, Bluesky). → 21 (DB só e-mail/telefone; AR nenhuma; NP só telefone/e-mail/WhatsApp).
33. **Currículo em PDF** ("View Full Résumé", Ana_Enders_Resume.pdf, Resume → PDF). → BC, RM, DB, AE, DS.
34. **Colophon / "feito com" / código aberto** ("Loosely designed in Figma and coded in VS Code… Next.js, Tailwind, Vercel, Inter"; "See project on Github"; "Handcrafted by me"; "This website was designed in browser with code"; "Built with Astro · Svelte · Three.js · GSAP · This website was made using AI"; tutorial de como construiu). → BC, PvG, RL, RM, AM, MF.
35. **Busca** (Search no blog). → SC, KH, DS.
36. **RSS**. → RM, AE, SC, KH, KL, DS.
37. **Páginas legais** (Privacy, Terms, Payment terms, Impressum, Datenschutz, Return Policy, Disclosures). → RM, KH, DS, BN, ST, NP, FS.
38. **Troca de idioma** (EN/PT, EN/DE). → RM, FS.
39. **Vídeo embutido** (vlog "A look into my life", palestras, demo de produto, hero em vídeo). → RM, AM, DS, BN, JK, ST, NP, FS.
40. **Ferramenta interativa / jogo** (currículo-jogo side-scroller, "planeta" de skills, interactive resume com scrollspy e bicicleta animada, máquina do processo, timeline por teclado, calculadora "Run your numbers", Website-Check em 60s, demos WebGL). → AH, PvG, RL, RM, DB, MR, ST, NP.
41. **Legível por agentes de IA** (`llms.txt`, `AGENTS.md` "Hire me from your agent", endpoint MCP, `POST /api/hire`, "Ask anything about Surinder" com biblioteca de respostas). → RM, ST.
42. **Nav fixa / scrollspy** (sidebar fixa com "in-page jump links", navbar com scrollspy, nav pill, barra de progresso de scroll). → BC, AH, PvG, RM, DB, ST, NP, FS.
43. **Voltar ao topo**. → DB, AS, KL, DS, AR, NP.
44. **Dark mode toggle**. → nenhum (AM, MR, FS, RM só respeitam `prefers-color-scheme`).

### A4. Páginas e extras / diferenciais (aparecem em 1 ou 2 sites)

- **Currículo como videogame** (RL): níveis = seções (Level 1 intro, Level 2 skills com barras Beginner→Expert, Level 3 experiência com % Graphic/Animation/Code, Level 4 awards & press), formulário no fim; página "Tutorial" explicando como foi feito.
- **CV por persona** (MR atual): home apresenta 3 identidades (Investor, Entrepreneur, Innovation/Partner), cada uma com "Deep dive" para `/cv/<persona>`; 2016: o site inteiro era uma timeline horizontal 1999→2016 navegável por teclado.
- **Portfolio "agent-ready"** (RM): `llms.txt`, `llms-full.txt`, MCP público, OpenAPI, AGENTS.md para que um agente contrate por API; indicador de disponibilidade em marquee; contador de atividade pública no GitHub; EN/PT.
- **"Ask me" com biblioteca de respostas** (ST): campo "Ask anything about Surinder" e `/ask/library` com perguntas reais respondidas, cada uma com página própria; calculadora de ROI em `/process`; certificados em PDF.
- **Ferramenta gratuita como isca** (NP): Website-Check que analisa uma URL em 60 s e gera score + lead gate; quiz de potencial de IA com e-mail gate.
- **Viagem no tempo** (BC): link "Click to time travel" para versões anteriores do site; `/archive` com tabela de todos os projetos (ano, feito em, feito com, link).
- **Grid de "coisas que eu amo"** (AH): Scuba diving, Studio Ghibli, Game of Thrones, Travel, 3D Printing, My Family… como ícones; página Awards; área de Login.
- **Bio em frases "I …"** (IE): home inteira é uma lista de frases curtas ("I lived in Toronto. I moved to San Francisco. I read comic books…"), zero imagens, link para résumé HTML com Patents.
- **Work. / Play.** (AE): about dividido em dois blocos (profissional / pessoal: gostos e desgostos), tabela de Education, resume PDF, RSS.
- **Code Shop** (DS): loja de snippets/plugins com preços, Feature Request e newsletter própria; vlog em vídeo; em 2026 virou negócio (Courses, Services, Press, My Favorites, Video Projects).
- **Fun Facts** como página (AS 2016); em 2026: Office Hours (1:1 pago com agenda), Templates (loja), Un-Blah Book List (44 livros).
- **Map** como página do blog pessoal (SC), ao lado de Photography e Musings: as "seções de relax" que já estavam no REFERENCES.md.
- **Recommended Resources** (KH): página de ferramentas recomendadas (afiliados); "As Seen On" na home; Terms & Conditions.
- **Journalistic Roots** (CS): página separada só para o histórico de origem (jornalismo), fora da Bio.
- **Sub-site de livro** (AR): `/book` com carrossel, Foreword, Preface e capítulos; cases com CTA "If you have a … that could use…".
- **Pacotes e comparação** (NP, FS): tabela de planos + "Vergleich"/"compare"; FAQ de pricing.
- **Página de produto por mercado/feature** (BN, FS): nav em mega-menu por produto; "Start Trading"/"Ready to…" como CTA idêntico em toda página.

---

## Parte B. Matriz referência × seção

Legenda: **P** = página própria · **✓** = seção/elemento dentro de outra página · **—** = ausente. Siglas na tabela de referências do cabeçalho.

### B1. Páginas principais

| Ref | Home | About | Work / Projects | Case study (pág. por projeto) | Experience / Resume / CV | Skills / Stack | Writing / Blog | Contact | Services / Hire me | Speaking | Books | Newsletter | Press / Awards / Credenciais |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| BC | P | ✓ | P | — | ✓ | ✓ | ✓ | — | — | — | — | — | — |
| AH | P | P | P | P | — | P | — | P | ✓ | — | — | — | P |
| PvG | P | ✓ | ✓ | — | ✓ | ✓ | — | ✓ | — | — | — | — | — |
| RL | P | ✓ | P | — | ✓ | ✓ | P | ✓ | — | — | — | — | ✓ |
| RM | P | P | P | P | ✓ | P | P | P | P | — | — | ✓ | — |
| CS | P | P | — | — | P | — | — | P | — | — | — | — | — |
| IE | P | ✓ | — | — | P | — | — | — | — | — | — | — | ✓ |
| XV | P | P | P | — | — | — | P | P | P | P | P | P | P |
| DB | P | ✓ | P | — | — | — | — | ✓ | ✓ | — | — | — | ✓ |
| AS | P | P | — | — | — | — | P | P | P | P | — | P | — |
| AE | P | ✓ | P | — | ✓ | — | P | — | — | — | — | — | — |
| MR | P | ✓ | ✓ | P | P | — | — | P | — | — | — | — | — |
| AM | P | P | P | P | — | ✓ | — | P | — | — | — | — | — |
| MF | P | P | ✓ | — | — | ✓ | P | P | P | — | — | — | — |
| SC | P | P | P | — | — | — | P | ✓ | — | — | — | — | — |
| KH | P | P | ✓ | — | — | — | P | P | P | — | — | — | ✓ |
| KL | P | P | ✓ | — | — | — | ✓ | P | — | — | — | ✓ | — |
| DS | P | P | P | P | P | ✓ | P | P | P | — | — | ✓ | — |
| AR | P | ✓ | ✓ | P | — | — | P | — | ✓ | — | P | — | — |
| BN | P | P | — | — | — | — | P | P | P | — | — | — | P |
| JK | P | ✓ | — | — | — | — | P | P | P | P | P | — | — |
| ST | P | P | P | P | ✓ | — | P | ✓ | ✓ | — | — | — | ✓ |
| NP | P | P | ✓ | — | — | — | P | P | P | — | — | — | ✓ |
| FS | P | — | — | — | — | — | — | ✓ | P | — | — | — | — |

### B2. Seções de conteúdo (home e páginas internas)

| Ref | Hero / tagline | Testimonials / praise | Clientes / logos | FAQ | Pricing | Education | Interesses / fun facts / play | Process / como trabalho | Galeria / fotografia | Side projects / produtos próprios | Loja / cursos / recursos | Números / stats | Timeline (datas) | Mapa / viagens |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| BC | ✓ | — | — | — | — | — | — | — | — | ✓ | — | ✓ | ✓ | — |
| AH | ✓ | — | — | — | — | — | ✓ | — | ✓ | ✓ | — | ✓ | — | — |
| PvG | ✓ | — | — | — | — | ✓ | ✓ | — | — | — | — | ✓ | ✓ | — |
| RL | ✓ | — | — | — | — | — | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ | — |
| RM | ✓ | — | ✓ | ✓ | — | ✓ | — | ✓ | — | ✓ | — | ✓ | ✓ | — |
| CS | ✓ | — | — | — | — | — | — | — | — | — | — | — | — | — |
| IE | — | — | — | — | — | ✓ | ✓ | — | — | — | — | — | ✓ | — |
| XV | ✓ | ✓ | — | P | — | — | — | — | P | ✓ | — | — | — | — |
| DB | ✓ | — | — | — | — | ✓ | — | ✓ | ✓ | — | — | — | — | — |
| AS | ✓ | — | — | — | — | — | P | — | P | — | — | — | — | — |
| AE | — | — | ✓ | — | — | ✓ | ✓ | — | — | — | — | — | — | — |
| MR | ✓ | — | ✓ | — | — | ✓ | — | — | — | — | — | — | ✓ | — |
| AM | ✓ | — | — | — | — | — | — | — | ✓ | — | — | — | — | — |
| MF | ✓ | ✓ | ✓ | — | ✓ | — | — | — | — | ✓ | — | — | — | — |
| SC | — | — | — | — | — | — | — | — | P | — | — | — | — | P |
| KH | ✓ | P | — | P | — | — | — | — | — | — | ✓ | — | — | — |
| KL | ✓ | — | — | — | — | — | — | — | ✓ | — | — | — | — | — |
| DS | ✓ | — | — | ✓ | ✓ | ✓ | ✓ | — | — | ✓ | P | — | ✓ | — |
| AR | ✓ | — | — | — | — | — | — | ✓ | ✓ | — | — | — | — | — |
| BN | ✓ | — | — | ✓ | — | — | — | — | — | P | — | — | ✓ | — |
| JK | ✓ | ✓ | ✓ | — | — | — | — | — | — | — | ✓ | — | — | — |
| ST | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | P | ✓ | ✓ | — | ✓ | ✓ | — |
| NP | ✓ | ✓ | ✓ | ✓ | P | — | — | ✓ | ✓ | — | — | — | — | — |
| FS | ✓ | ✓ | ✓ | ✓ | P | — | — | — | — | P | — | ✓ | — | — |

### B3. Componentes

| Ref | Formulário de contato | Agendar conversa (link/calendário) | Botão de contato flutuante (FAB) | CTA ao fim da página | Redes sociais (header/footer) | Currículo em PDF | Colophon / 'feito com' / código aberto | Busca | RSS | Páginas legais | Troca de idioma | Vídeo embutido | Ferramenta interativa / jogo | Legível por agentes de IA | Nav fixa / scrollspy | Voltar ao topo | Dark mode toggle |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| BC | — | — | — | — | ✓ | ✓ | ✓ | — | — | — | — | — | — | — | ✓ | — | — |
| AH | ✓ | — | — | ✓ | ✓ | — | — | — | — | — | — | — | ✓ | — | ✓ | — | — |
| PvG | — | — | — | ✓ | ✓ | — | ✓ | — | — | — | — | — | ✓ | — | ✓ | — | — |
| RL | ✓ | — | — | ✓ | ✓ | — | ✓ | — | — | — | — | — | ✓ | — | — | — | — |
| RM | ✓ | ✓ | — | ✓ | ✓ | ✓ | ✓ | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| CS | — | — | — | — | ✓ | — | — | — | — | — | — | — | — | — | — | — | — |
| IE | — | — | — | — | ✓ | — | — | — | — | — | — | — | — | — | — | — | — |
| XV | — | — | — | — | ✓ | — | — | — | — | — | — | — | — | — | — | — | — |
| DB | ✓ | — | — | ✓ | — | ✓ | — | — | — | — | — | — | ✓ | — | ✓ | ✓ | — |
| AS | — | — | — | — | ✓ | — | — | — | — | — | — | — | — | — | — | ✓ | — |
| AE | — | — | — | — | ✓ | ✓ | — | — | ✓ | — | — | — | — | — | — | — | — |
| MR | — | ✓ | — | ✓ | ✓ | — | — | — | — | — | — | — | ✓ | — | — | — | — |
| AM | — | — | — | — | ✓ | — | ✓ | — | — | — | — | ✓ | — | — | — | — | — |
| MF | ✓ | — | — | ✓ | ✓ | — | ✓ | — | — | — | — | — | — | — | — | — | — |
| SC | ✓ | — | — | — | ✓ | — | — | ✓ | ✓ | — | — | — | — | — | — | — | — |
| KH | ✓ | — | — | ✓ | ✓ | — | — | ✓ | ✓ | ✓ | — | — | — | — | — | — | — |
| KL | ✓ | — | — | — | ✓ | — | — | — | ✓ | — | — | — | — | — | — | ✓ | — |
| DS | ✓ | — | — | ✓ | ✓ | ✓ | — | ✓ | ✓ | ✓ | — | ✓ | — | — | — | ✓ | — |
| AR | — | — | — | ✓ | — | — | — | — | — | — | — | — | — | — | — | ✓ | — |
| BN | — | — | — | ✓ | ✓ | — | — | — | — | ✓ | — | ✓ | — | — | — | — | — |
| JK | ✓ | — | — | ✓ | ✓ | — | — | — | — | — | — | ✓ | — | — | — | — | — |
| ST | — | — | ✓ | ✓ | ✓ | — | — | — | — | ✓ | — | ✓ | ✓ | ✓ | ✓ | — | — |
| NP | ✓ | ✓ | — | ✓ | — | — | — | — | — | ✓ | — | ✓ | ✓ | — | ✓ | ✓ | — |
| FS | — | ✓ | ✓ | ✓ | ✓ | — | — | — | — | ✓ | ✓ | ✓ | — | — | ✓ | — | — |

---

## Parte C. Contagem por frequência

44 seções/componentes distintos na matriz (13 páginas, 14 seções de conteúdo, 17 componentes), mais os ~17 extras pontuais da Parte A4. Ordenado por total de referências (P + ✓).

| # | Seção / componente | Grupo | Total | P (página) | ✓ (seção) |
|---|---|---|---|---|---|
| 1 | Home | Página | 24/24 | 24 | 0 |
| 2 | About | Página | 23/24 | 14 | 9 |
| 3 | Hero / tagline | Seção | 21/24 | 0 | 21 |
| 4 | Redes sociais (header/footer) | Componente | 21/24 | 0 | 21 |
| 5 | Contact | Página | 20/24 | 14 | 6 |
| 6 | Work / Projects | Página | 18/24 | 11 | 7 |
| 7 | Writing / Blog | Página | 16/24 | 14 | 2 |
| 8 | CTA ao fim da página | Componente | 15/24 | 0 | 15 |
| 9 | Services / Hire me | Página | 14/24 | 10 | 4 |
| 10 | Formulário de contato | Componente | 11/24 | 0 | 11 |
| 11 | Galeria / fotografia | Seção | 11/24 | 3 | 8 |
| 12 | Experience / Resume / CV | Página | 10/24 | 4 | 6 |
| 13 | Side projects / produtos próprios | Seção | 10/24 | 2 | 8 |
| 14 | Press / Awards / Credenciais | Página | 9/24 | 3 | 6 |
| 15 | Timeline (datas) | Seção | 9/24 | 0 | 9 |
| 16 | Clientes / logos | Seção | 8/24 | 0 | 8 |
| 17 | Education | Seção | 8/24 | 0 | 8 |
| 18 | FAQ | Seção | 8/24 | 2 | 6 |
| 19 | Ferramenta interativa / jogo | Componente | 8/24 | 0 | 8 |
| 20 | Nav fixa / scrollspy | Componente | 8/24 | 0 | 8 |
| 21 | Skills / Stack | Página | 8/24 | 2 | 6 |
| 22 | Vídeo embutido | Componente | 8/24 | 0 | 8 |
| 23 | Case study (pág. por projeto) | Página | 7/24 | 7 | 0 |
| 24 | Interesses / fun facts / play | Seção | 7/24 | 1 | 6 |
| 25 | Números / stats | Seção | 7/24 | 0 | 7 |
| 26 | Páginas legais | Componente | 7/24 | 0 | 7 |
| 27 | Testimonials / praise | Seção | 7/24 | 1 | 6 |
| 28 | Colophon / 'feito com' / código aberto | Componente | 6/24 | 0 | 6 |
| 29 | Process / como trabalho | Seção | 6/24 | 1 | 5 |
| 30 | RSS | Componente | 6/24 | 0 | 6 |
| 31 | Voltar ao topo | Componente | 6/24 | 0 | 6 |
| 32 | Currículo em PDF | Componente | 5/24 | 0 | 5 |
| 33 | Newsletter | Página | 5/24 | 2 | 3 |
| 34 | Pricing | Seção | 5/24 | 2 | 3 |
| 35 | Agendar conversa (link/calendário) | Componente | 4/24 | 0 | 4 |
| 36 | Books | Página | 3/24 | 3 | 0 |
| 37 | Busca | Componente | 3/24 | 0 | 3 |
| 38 | Loja / cursos / recursos | Seção | 3/24 | 1 | 2 |
| 39 | Speaking | Página | 3/24 | 3 | 0 |
| 40 | Botão de contato flutuante (FAB) | Componente | 2/24 | 0 | 2 |
| 41 | Legível por agentes de IA | Componente | 2/24 | 0 | 2 |
| 42 | Troca de idioma | Componente | 2/24 | 0 | 2 |
| 43 | Mapa / viagens | Seção | 1/24 | 1 | 0 |
| 44 | Dark mode toggle | Componente | 0/24 | 0 | 0 |

---

## Parte D. Por referência (nomes originais)

**BC · Brittany Chiang** (brittanychiang.com, vivo)
- One-page com sidebar fixa: nome, "Frontend Engineer", nav com jump links **About / Experience / Projects**, redes (GitHub, LinkedIn, CodePen, Instagram, Goodreads).
- Seções: About · Experience (cargos com datas e tags de tecnologia, "View Full Résumé" → PDF) · Projects (4 destaques, "View Full Project Archive" → página `/archive` "All Projects") · Writing (4 artigos no Medium).
- Footer: colophon ("Loosely designed in Figma and coded in Visual Studio Code… Next.js, Tailwind CSS, Vercel, Inter") e "Click to time travel" para versões antigas. Sem contato nem formulário.

**AH · Adam Hartwig** (adamhartwig.co.uk, vivo)
- SPA. Nav: **Home / About / Skills / Work and Play / Awards / Contact** (+ Login privado). Footer: Behance, Facebook, Twitter, LinkedIn.
- Home: "Hai, I'm Adam" + frases rotativas (I love digital, Creative Network, Multi discipline, New Media, I love to play, Apps apps apps!, "Interested? … get in touch!").
- About: "anatomia" com vistas love/core/work e grid de coisas que ama (Scuba diving, Studio Ghibli, Travel, 3D Printing, My Family…). Skills: "planeta" interativo com 9 skills e percentuais. Work and Play: projetos com galeria de screenshots. Contact: formulário (name, email, url, message).

**PvG · Pascal van Gemert** (pascalvangemert.nl; snapshot 2016 + repo; atual inacessível)
- One-page "Interactive Resume" com navbar scrollspy: **Profile** (About me, Details) · **Experiences** (Educations, Careers) · **Abilities** (Skills, Languages, Tools) · **Projects** (6) · **Contact**.
- Links: Twitter, LinkedIn, e-mail ofuscado, "See project on Github" (site é open source: models career/contact/education/interest/language/profile/project/skill/tool). Animação de bicicleta; aviso de navegador antigo.
- Atual (Vue SPA) não pôde ser lido; [references](/research/references/) indica "mesmo espírito". É a origem do item "How It's Calculated" do superconjunto antigo (não localizado no HTML de 2016).

**RL · Robby Leonardi** (rleonardi.com, vivo, SSL expirado)
- Home-hub: **Interactive Resume / Illustration Portfolio / Design Portfolio** (cada um "Launch website") + **About** + **Tutorial**; footer com Facebook, Twitter, Dribbble, LinkedIn, e-mail.
- Interactive Resume (jogo side-scroller, teclado/swipe): Level 1 "Multidisciplinary Designer, Live and Work in NYC, Sports Fan" · Level 2 skills (Design/Illustration/Code/Animation; software por categoria, Beginner→Expert) · Level 3 Working Experience (3 empregos com % Graphic/Animation/Code) · Level 4 Awards & Press (Webby, FWA, Awwwards, CSS Design Awards, Business Insider, CNET, Mashable…) · fim: formulário de contato.
- Portfolios são galerias ilustradas; Tutorial explica como construiu o site.

**RM · Ruben Marcus** (rubenmarcus.dev, vivo)
- Nav: **Portfolio / AI / Skills / Demos / Blog / About / Contact / Agents / MCP**, EN/PT, "Book a project". Footer: Pages, Products (6 externos), Developers (API Docs), Privacy, Socials (GitHub, X, LinkedIn, npm, Telegram), newsletter "Field notes", "Public GitHub activity", colophon "Built with Astro · Svelte · Three.js · GSAP · This website was made using AI".
- Home: hero · "Hire me for" (3 serviços) · "Shipped, measured." (stats) · client proof (logos) · "Tools I ship with, daily." · Writing (3 posts) · "Hire me from your agent." (AGENTS.md + `POST /api/hire`) · FAQ · Contact CTA ("Start a conversation", "Book a 15-min intro" via Cal.com).
- About: intro, timeline, skills, education, github-stats. Portfolio: arquivo com filtros por era/empresa/tecnologia. Skills: "agent skills" versionadas. Demos: experimentos WebGL. `llms.txt`, RSS, marquee de disponibilidade.

**CS · Callie Schweitzer** (callieschweitzer.com, vivo, Squarespace)
- Nav: **Home / Bio / Journalistic Roots / Contact**. Header com tagline "Defining digital-age journalism with honesty, integrity and transparency" e endereço (New York, NY).
- Home: intro curta em 1ª pessoa ("Hi! I'm Callie…") + "Read full bio". Bio: longa, em 3ª pessoa. Journalistic Roots: histórico de origem. Contact: só e-mail.
- Footer: links sociais. Nenhum formulário, nenhuma imagem de projeto.

**IE · Ian Enders** (ianenders.com, Wayback 2016-10-02)
- Home: lista de frases "I …" (I lived in Toronto… I read comic books… I write code [GitHub] and idiotic comments [Twitter]… I was Creative Director at PagerDuty… I am the CTO of NewlyWish… I have a more detailed résumé).
- `/resume.html` "A Résumé of Sorts": **Synopsis / Career History / Education / Patents**. Zero imagens, zero formulário.

**XV · Ximena Vengoechea** (ximenavengoechea.com, vivo, Squarespace)
- Nav com dropdowns: **About** (Bio, Press, FAQs) · **Writing** (Books, Articles, Newsletter) · **Portfolio** (Illustrations, UX Research, The Life Audit) · **Speaking** · **Consulting** · **Contact**. Footer: LinkedIn, Substack, Instagram.
- Home: "Hi, I'm Ximena! I like making things and meeting new people." + slideshow. Books: 4 livros (praise, "Available at Amazon | Bookshop…", Learn more) + "Previously". Articles: "My work has appeared in Inc., Newsweek…". Newsletter: "Letters from Ximena" (archive + subscribe). Illustrations: galeria por série. UX Research: métodos. The Life Audit: produto (Praise, Events & Workshops, Journal). Press: "Selected press". FAQs: filtra pedidos antes do contato. Contact: "Let's chat" + e-mail.

**DB · Deda / Deidre Bain** (deda.me, Wayback 2016-12-07)
- One-page: **home / work / about / process / credentials / contact** (+ `work.html` com links dos projetos).
- Work: 6 projetos com descrição. About: narrativa pessoal (primeiro emprego aos 15, SCAD, agência). Process: concept → arch → create → launch como "máquina". Credentials: "why I do", business, award. Contact: formulário (name, email, phone, company, message), e-mail, telefone, "yell". Voltar ao topo; currículo em PDF.

**AS · Allison Stadd** (allisonstadd.com, Wayback 2016-03-25; atual 2026 para contraste)
- 2016, Squarespace. Nav: **Home / Bio / Contact / Fun Facts / Writing / Social Media Marketing / Speaking / Photography / Blog / Newsletter**; ícones Facebook, Twitter, Instagram, LinkedIn, G+, Pinterest; Back to Top.
- Home: headline "Insatiably curious. Perpetually plugged in. Driven to create." + feed do blog com categorias/tags. Bio: "Essentially:" / "The official version:". Writing e Social Media Marketing são páginas de serviço (Content production, Topics of expertise, Deliverables). Contact: Twitter, LinkedIn, newsletter, e-mail (sem formulário).
- 2026: About ("By the numbers"), Newsletter (Substack), Office Hours (1:1 pago, "Pick a time"), Templates (loja + cart), Advisory ("What clients say"), Speaking, Un-Blah Book List; home "Ways to work together" + "Read on.".

**AE · Ana Enders** (anaenders.com, Wayback 2017-04-26)
- One-page; nav para `/`, `/portfolio`, `/blog` (não arquivados). Seções: **Work.** (o que faz) · **Play.** (gostos e desgostos) · **Engineering Manager** (papel atual) · **education** (tabela de cursos e datas).
- Links: Ana_Enders_Resume.pdf, feed.rss, Twitter, Facebook, Instagram, Pinterest, LinkedIn, GitHub, clientes/empregadores linkados, link para o marido (ianenders.com).

**MR · Marty Ringlein** (marty.com; Wayback 2016-01-11 + atual)
- 2016: site = timeline horizontal (nav#dates de 1999 a 2016: Innovation Fellow, @design Manager, Columbia Univ., Acquired Taste!, Yale, Thinking Different, canvas.co/work, Adj. Professor, Running PUMA, Designing Ogilvy, Venture Bound, Univ. of Maryland…), cada item com MORE/LESS; pane "Hello. I'm @smarty" (angel investor, entrepreneur…); Twitter, LinkedIn, Dribbble; teclado.
- Atual: home com 3 personas (**Investor / Entrepreneur / Innovation**) e "Deep dive" para `/cv/investor`, `/cv/entrepreneur`, `/cv/innovation`; `/cv` ("built future-proof": Brief Bio, Previous Roles, Incredible Partners); `/contact` ("say hello!": Schedule a Meeting via intro.co, e-mail marty@marty.com, "Socially Awkward" redes). Footer: Say hi!, LinkedIn, Twitter, Dribbble. Scroll horizontal.

**AM · andrevv / Andrew McCarthy** (andrevv.com; atual + Wayback 2016-03-04)
- 2016: nav **About / Work / Contact**. Home = About ("Based in Berlin, From Phoenix", "Available" mailto, link de skateboarding). Work: 12 projetos (título + serviços + descrição) em seções com id. Contact: e-mail.
- Atual (SPA): home = lista de projetos (Dewy, CH Projects, Miller McCormick, Lafour, Retinaa, IJJI, Krisztian Eder, You Must Create) com página por projeto; **Info** (overlay): bio, "This website was designed in browser with code", e-mail, lista de stack (Craft CMS, Hydrogen, Next.js, React, Sanity, Shopify, Sveltekit, Tailwind, Three.js). Vídeo nas páginas de projeto.

**MF · Matt Farley** (mattfarley.ca, vivo)
- Nav: **Mentorship / Say Hello**. Footer: Twitter, Dribbble, LinkedIn, IndieHackers, ProductHunt, e-mail, "Handcrafted by me", Bulma.
- Home: hero "Designer, Frontend Developer & Mentor" · "Hi, I'm Matt" · 3 pilares (Designer / Frontend Developer / Mentor) · **My Recent Work** (6 projetos, "See more on Dribbble") · "I'm proud to have collaborated with" (logos) · **My Startup Projects** (status acquired / exited / on hold) · "Interested in collaborating?" → `/startup-inquiry` · **Testimonials** · "Start a project" → `/project-planner`.
- Páginas: /about, /consulting, /mentorship (3 planos $150/$500/$1,200, Benefits, mentees logos, "My Mentoring Style", Happy Mentees), /posts (#designerthoughts), /contact, /startup-inquiry, /project-planner (3 formulários distintos). Toda página termina em CTA.

**SC · Sarah Li Chang** (sarahlichang.com, Wayback 2016-03-13, Squarespace)
- Nav: **About / Work / Map / Thought Sketches / Photography / Musings / Search**; e-mail no header; footer Facebook, LinkedIn, Twitter, e-mail; bloco "contact us" com formulário.
- Home = Thought Sketches (blog com categorias: Life Philosophy, Models, Improvement, The Self, Consulting, Guide). Map, Photography e Musings não estavam arquivados (só na nav). RSS.

**KH · Kristi Hines** (kristihines.com, Wayback 2016-12-29, WordPress)
- Nav: **Writing Services / Testimonials / FAQ / Contact / About / Blog**. Footer: Recommended Resources, Terms & Conditions, crédito do tema.
- Home one-page: #about ("My name is Kristi Hines…"), #portfolio, #services, #blog, "As Seen On" (logos de imprensa), "Want to learn more? Contact Me" (CTA).
- Páginas: Freelance Writing Services, Testimonials, Freelance Writing FAQ, Contact (Ninja Forms), About, Blog (arquivo + busca), Recommended Online Marketing Tools (afiliados), Terms & Conditions. RSS.

**KL · Kristi Leilani** (kristileilani.wordpress.com, vivo, WordPress.com)
- Nav: **Home / About / Contact**. Home: foto única + bio placeholder (lorem ipsum). Footer: LinkedIn, Mastodon, Tumblr, Bluesky, Medium, RSS Feed.
- Componentes da plataforma: Subscribe (follow por e-mail), share buttons, comentários, formulário de contato, voltar ao topo. Essencialmente um fotoblog.

**DS · Devon Stank** (devonstank.com; Wayback 2016-04-02; 2014 e atual para contraste)
- 2016, Squarespace. Nav: **Home / Code Shop / Portfolio / About / Resume / Blog / Contact**; redes Instagram, LinkedIn, Twitter, Behance, Vimeo, Facebook; footer Terms, Return Policy, Privacy.
- Home: header hero · "Understanding my passion" · vídeo "A look into my life" · "My latest projects" · Code Shop (Code Snippets / Video Training / Tips & Tricks) · Hire me · about · "Latest Blog Posts" · preFooter com newsletter (fname/lname/email) + "Hire a Squarespace Specialist today" (repete em toda página) + nav secundária. Busca.
- Portfolio ("Half design / half code", Behance) com página por projeto ("Technology used"). Resume: Technologies (Day-to-day Comfort / Experience with), Work Experience, Education. Code Shop: produtos com preço, Feature Request, Code Shop Newsletter, FAQ. About: "A few fun facts", "A look into my life", "I work from home". 2014: Resume era PDF. Atual: Courses, Services ("My Process"), My Work, Press, My Favorites, Video Projects, cart.

**AR · Andy Rutledge** (andyrutledge.com, vivo)
- Nav fullscreen: **Designs / Books / Articles** (âncoras na home). Sem redes sociais.
- Home: intro ("commence"), design-intro, **Some of My Designs** (6 cases → "View Details"), **My Books** (Artistic Foundations of Bonsai Design → sub-site `/book` com carrossel, Foreword, Preface), **Some of My Articles** (ex.: The Employable Web Designer).
- Páginas de case: objetivos/outcome por etapa, terminando em CTA "If you have a … that could use…". Back to top no `/book`. Sem contato na home.

**BN · Bitnomial** (bitnomial.com/services, vivo, institucional)
- Nav: **Trade / Markets (Spot, Perpetuals, Futures, Options, Data) / Services / Docs / About / Sign In / Blog / News / Help**; footer GitHub, X, LinkedIn, entidades, Privacy, Terms, Disclosures, Security.
- `/services`: **Clearing Services** (Digital Asset Margin & Settlement, Prediction Market Clearing) · **Listing Services** · **Regulatory Services** · "Start Trading" (CTA idêntico em toda página, `section.get-started`).
- Home: hero, products, features, FAQ ("Questions? We're Here to Help"), Press/News, Blog. About: hero, timeline (7 passos), team (pop-ups), investors, blog. Help: endereço, contato, FAQ. Vídeo.

**JK · Jake Knapp** (jakeknapp.com, vivo, Squarespace)
- Nav: **About Jake (home) / Sprint / Make Time / Workshops / Speaking / Popular Posts / Contact**. Footer: Medium.
- Home: bio curta em 3ª pessoa + foto. Sprint e Make Time: página por livro (capa, praise de Beth Comstock, Tim Brown, Ev Williams…, "Learn More"). Workshops: "Design Sprint Workshops… Book a private workshop" + formulário. Speaking: temas, onde já falou, "Get in touch" + formulário. Popular Posts: lista com "Read on Medium" + "More from Jake on Medium…". Contact: "Hey there!" roteando (thesprintbook.com, aba speaking, e-mail).
- Cada página termina com um CTA específico (Learn More / Get in touch / Book). Vídeos em Speaking.

**ST · Surinder Thakur** (surinder.design + /process, vivo)
- Nav pill fixa: **Work / Process / About / ProUX** (produto externo); **botão de contato flutuante** (`#v2-contact-float`: Email me, WhatsApp me); tab dock mobile; campo "Ask anything about Surinder" + `/ask/library` ("Real questions, answered.", cada pergunta com página). Footer: e-mail, LinkedIn, WhatsApp, certificados (PDF NN/g, Credly), Privacy, Terms, Payment terms.
- Home: hero "People never say where a product hurt them. They just leave." com cards por público (Fintech onboarding, eCommerce conversion, Mobile apps, AI product design, Design mentorship) · **Trusted by founders** (reviews) · Who it's for · Hiring takes months · **How I help** · How it works · "One flow first." · **Pricing** ($3,000 fixed · One flow · One week; $8,000/month) · How I think ("Screens are easy. Behaviour is hard.": Persuasion, Emotion, Trust) · **Hear it from the founders** (testimonials) · about-intro · **FAQ** · "Custom scope?" CTA.
- Work: cases Puffy, ProUX, MyHouz, Purpose com estrutura Challenge → Key Insights → One Hypothesis → My Approach & Solution → Outcome Highlights → próximo case. Process: "No guesswork." · The week (Book a call → Design → Review and iterate → Shipped → Monthly) · Behind the method · "Run your numbers" (calculadora) · closing offer. About: "19 years in UX", Executive Summary, timeline de cargos, Clients since 2007, Professional certifications.

**NP · Nordpixel** (nordpixel.ch, vivo, agência, alemão)
- Nav: **Angebot / Preise / Projekte / Website-Check / Gespräch buchen**; mega-menu (Webdesign, KI & Automation, Website-Check, SEO, Hosting; Startseite, Preise, Ratgeber, Über uns, Partner werden, Jobs, Kontakt; Impressum, Datenschutz, AGB). Header fixo + barra de progresso de scroll; voltar ao topo; cookie banner; selo Awwwards. Footer: telefone, e-mail, WhatsApp, "Projekt besprechen →".
- Home: hero + Garantie · Kundenlogos · **Projekte / Design-Referenzen** (rail horizontal, before/after) · Vorteile · Angebot · **Preise** (Demo / Landing / Startup / Scale + Hosting) · Vergleich · **Stimmen** (slider de depoimentos) · founder · **FAQ** · **Kontakt** (formulário + WhatsApp + "Erstgespräch buchen").
- Páginas: Website-Check (analisa URL em 60 s, score, lead gate), KI (4 casos de uso, quiz de potencial com e-mail gate, FAQ), Kontakt (Nachricht senden / E-Mail / Erstgespräch buchen / formulário), Ratgeber (blog por segmento), Über uns ("Ein klarer Prozess", "Woran du nie Abstriche machst"), Partner, Jobs, Preise.

**FS · Finseo** (finseo.ai, vivo, SaaS)
- Nav: mega-menu **Product** (AI Visibility Tracking, AEO Tasks, Prompt Research, Competitor Analysis, Brand Sentiment, Citation Tracking, Shopping Visibility, Ads Tracking, Query Fanouts, Traffic Analytics, Attribution, Bot Traffic, Report Builder) · **AI Platforms** (ChatGPT/Claude/Perplexity/Gemini tracking) · Solutions (brands, agencies) · Integrations · **Enterprise** · **Pricing** · EN/DE · Login · Book Demo · Get started. Footer: Product, AI Platforms, Solutions, Integrations, Company (careers, customers), Legal, System Status, REST API, MCP Server, X, LinkedIn.
- Home: hero "Win AI search in every answer." · grid de features · carrossel de customer stories (Panasonic, Lidl, Kellogg's) · "AI search touches everything" · stats ("The AI search revolution") · features · "Trusted by world-class teams" (logos + citação) · CTA final. Pricing: planos, "compare", FAQ de pricing. Toda página de produto repete: hero → features → FAQ → "Trusted by" → "Ready to…?". Widget de chat flutuante, cookie banner, vídeo "Watch the product film", Calendly para demo.
