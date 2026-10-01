---
layout: default
title: Surinder section map
---

Fonte: HTML cru baixado em 2026-09-30 de https://www.surinder.design/ (home), /process, /about, /work (o site estava no ar; não foi preciso usar o fallback `v1/surinder/`). Os recortes de tela (1440 px) ficam no lab privado.

Comparação feita contra a adaptação v4 do Surinder (`index.html` e `process.html`, no lab privado).

## Em uma frase: o que o site do Surinder é

Uma **página de vendas de um serviço fixo**: "fractional design lead", 1 fluxo redesenhado por semana por US$ 3.000 (pilot week) ou US$ 8.000/mês (3 fluxos + 1 semana de medição). Toda seção da home existe para empurrar o visitante (founder/head of product de fintech ou e-commerce) para o botão **"Book a call"** (Cal.com, `surinder/design-intro-meeting`, aparece 16 vezes na home). A ordem das seções segue um funil clássico: dor → prova social → "é pra você?" → objeção (contratar vs. me contratar) → o que eu faço → como funciona → preço → filosofia → mais prova → quem sou → FAQ → pedido customizado.

O site do Lucas é um **perfil pessoal** ("a pessoa deve sair com a sensação de que me conheceu melhor", [pages-decisions](/research/pages-decisions/)). Não tem produto, preço nem funil. Por isso várias seções do Surinder só funcionam se trocarem de função, não só de texto.

---

## HOME (`/`)

### 01. Hero — "People never say where a product hurt them. They just leave."
- **Id/âncora:** `#hero` (`data-ga-section="hero"`).
- **O que ele coloca:** fundo noturno azul-marinho com estrelas; pills "Dubai, UAE" e "AI Product Designer"; h1 em duas cores (branco + laranja na frase de impacto "They just leave."); sub: *"I find that point with a systematic approach and remove the friction, in fintech, eCommerce and mobile apps."* À direita, um **mini-card de oferta** com texto digitando ("Fractional design lead for **onboarding people finish**" alternando), dois chips de preço (*"$3,000 fixed · One flow · One week"* / *"$8,000 / month retainer"*), legenda *"Pilot Flow: The flow we agree on, redesigned in one week."* e o botão **Book a call**. Abaixo: um traço de "jornada" (linha curva verde→laranja→azul com ícones flutuando) e um **slider wireframe ↔ design final** (5 slides: dashboard ProUX, PDP Puffy, cart etc. — *"Drag the image to compare"*). Tem também 5 "lanes" de texto (01 Fintech "Users sign up, then vanish at KYC", 02 eCommerce "+67% YoY revenue at Puffy", 03 Mobile, 04 AI, 05 Design mentorship) que alimentam a animação. Fechando o hero, uma **faixa de carrossel de trabalhos** ("Selected work": eCommerce PDP, Fintech App, Real Estate App, Luxury Product, Cart Conversion, eCommerce Home, Travel App, EdTech, Video Editing App, Web3 Marketplace).
- **Função pra ele:** dor do cliente em 3 linhas + oferta e preço na primeira tela + CTA. É literalmente um anúncio: o visitante sabe o que compra, por quanto, e onde clicar, sem rolar.
- **Como a v4 reaproveitou:** motto *"Often studying, sometimes teaching, always learning."* como h1, bio curta como sub; o card de oferta virou "Now · GenAI Manager / Studied · M.Sc. Data Science" com os chips de preço trocados por empresa e faculdade; as 5 lanes viraram Deloitte → Safra → BTG → Bain → Now; o slider virou "Concept ↔ Shipped" com imagens placeholder; CTA "Let's grab a coffee". **Faz sentido parcialmente:** motto e bio encaixam, mas o card à direita é um *card de preço* vestido de currículo (dois chips lado a lado lêem como duas opções de plano) e o slider antes/depois não tem par no conteúdo do Lucas (não existe "wireframe → final" de um projeto dele).
- **Sugestão:** **adaptar.** Manter fundo, tipografia bicolor, pills e o traço de jornada. Trocar o card de oferta por mini-fatos (H2 do [pages-decisions](/research/pages-decisions/): cargo atual, M.Sc., anos de carreira) sem a forma de "dois planos". Trocar o slider por um visual próprio (ex.: screenshot do Mission Control ou a timeline). A faixa de carrossel pode virar o **logo wall** (H7) ou "projetos em destaque" (H4).

### 02. Reviews — "Trusted by founders"
- **Id:** `#reviews` (classe `reviews light`).
- **O que ele coloca:** selo *"4.98/5 from 300+ founders"* com avatares, h2, sub *"Since 2007. The work, in the words of the people who paid for it."*, **faixa de logos de clientes** (Puffy, Lucyd, Medellin.co, AJElite, Ooliv, …) e **3 cards de depoimento**, cada um com um **número como título**: *"+21% mobile checkout conversion"* (Arthur Andreasyan, Founder, Puffy), *"3 months design to market"* (Carlos Arias, Founder, Medellin.co), *"On time every time"* (Avin Kline, CEO, Lucyd). Cada card tem foto, nome e cargo.
- **Função pra ele:** prova social imediata, logo depois da promessa. Note que o título de cada card é um **resultado**, não um elogio: ele transforma depoimento em métrica.
- **Como a v4 reaproveitou:** virou "Honors & Awards": badge "4 honors & awards", faixa de logos (ITA, USP, PUC Minas, UFSCar, TELUS, Bain, BTG, Safra) e 4 cards: "4th place OBI", "Honorable Mention OBMEP", "Poetry award Barueri", "Courses Alura". Rodapé de cada card: "Lucas Lukasavicus — Honors & Awards" (o espaço de nome/cargo da pessoa que deu o review). **Não faz sentido:** cards de review precisam de uma *terceira pessoa* falando; prêmios autodeclarados assinados pelo próprio Lucas ficam estranhos, e o selo "4.98/5" perdeu a razão de existir. A faixa de logos, essa sim, encaixa bem (é o logo wall H7).
- **Sugestão:** **adaptar, trocando o conteúdo.** Este é o lugar natural dos **Testimonials** do Lucas (E7, "lugar a definir") se existirem (ex-chefes, colegas, alunos). Manter a estrutura "título = resultado" (ex.: "Montou o time de dados do zero") + foto + nome/cargo. Manter a faixa de logos. Honors & Awards sai daqui e vai pro About, como já decidido (A1).

### 03. Who it's for — "Teams where the journey is the business. Find your line."
- **Id:** sem id; classe `who`, `data-ga-section="who_for"`.
- **O que ele coloca:** 4 cards com ilustrações coloridas (farol, funil vazando, escada azul, montanhista com bandeira), cada um com uma **persona** e um par problema → promessa: **Founder** (*"Users drop off. Is a designer really the fix?"* → *"1 senior name finds where they leave, ships the fix on Day 5, and shows the number."*), **Head of product** (*"Conversion is falling. The board meets on a fixed date."*), **Head of design** (*"Too many flows to map. Not enough senior hands."*), **Junior designer** (*"Your case studies look junior."* → *"30 minutes with someone senior. 3 honest fixes, not a grade."*).
- **Função pra ele:** qualificação do lead. O visitante se encontra num card e lê a promessa feita sob medida pra ele. É segmentação de público.
- **Como a v4 reaproveitou:** virou "Interests" com os mesmos 4 cards: Travel, Building, Home (cooking and reading), Competing. Os textos tentam imitar a cadência "problema → solução" (*"Many ideas in, the right few out."*). **Não faz muito sentido:** o layout é de **personas**; interesses não são "pra quem é". E as ilustrações do Surinder (farol, funil, escada, pico) ficaram sem relação com os temas.
- **Sugestão:** **adaptar como "Pilares de valor" (H3)** ou "o que eu trago": 4 cards do tipo "Dados & engenharia / IA aplicada / Liderança de time / Ensino", cada um com uma frase de posicionamento. Alternativa: "para quem é o site" (recrutador, colega, aluno, curioso) — mesma lógica de persona do Surinder, mas pra um perfil pessoal. Interesses vão pra página pessoal (A1) com um teaser pequeno na home (H10).

### 04. Hiring takes months — "And the leak won't wait. Here is the difference, line by line."
- **Id:** sem id; classe `hire`, `data-ga-section="hiring"`.
- **O que ele coloca:** duas fotos (um recrutador e ele num call) e uma **tabela comparativa de duas colunas**: *"A senior hire in Dubai"* vs *"Working with me"* (coluna destacada). Linhas: **Start** (Months vs 5 days), **Trial** (None/probation vs 1 week pilot AED 11,000), **Cost** (*"AED 45,000+ ($12,250+) a month. Plus visa, medical, hardware, gratuity."* vs *"AED 29,400 ($8,000) a month"*), **Output** (A queue vs *"3 flows a month plus 1 measure week"*), **Commitment** (Open-ended vs *"Month to month. No minimum term."*). Fecha com Book a call.
- **Função pra ele:** matar a objeção principal ("por que não contrato um designer em vez de você?"). É uma **comparação de planos** por natureza: coluna ruim vs coluna boa.
- **Como a v4 reaproveitou:** virou "Experience" como tabela "Before: Data & AI Manager" vs "Now: GenAI Manager" (Role, Company, Period, About, Tech), e abaixo a lista completa de empregos em texto. **Não faz sentido** — e o Lucas já apontou isso: a estrutura é de comparação ruim/bom; dois cargos na mesma empresa colocados lado a lado parecem dois planos, e o "Before" fica implicitamente desvalorizado.
- **Sugestão:** **descartar o layout.** Experience merece uma **timeline** (C21) igual à do Education, não uma tabela. Se quiser um comparativo em algum lugar, o único que faria sentido no perfil é algo lúdico ("2017 vs 2026": linguagens, cargo, cidade), e mesmo assim é baixo valor.

### 05. How I help — "1 senior lead across the journeys that earn. 1 shipped flow at a time."
- **Id:** `#services` (`data-ga-section="how_i_help"`).
- **O que ele coloca:** fundo gradiente azul escuro. 4 **cards de serviço** (`card-fintech`, `card-ecommerce`, `card-mobile`, `card-ai`) + 1 card "coming soon" (`card-mentorship`). Cada card abre num painel com: pergunta-gancho (*"Users quit at KYC?"*), título, o insight (*"People quit KYC when a step asks for trust it has not earned yet."*), **WHAT I FIX** (3 itens), **WHAT YOU GET ON DAY 5** (*"The shipped flow, your files, and the number to watch: KYC completion"*), **PROOF** (2 números: *"+67% YoY revenue at Puffy"*, *"-14% Cart abandonment"*; *"+45% Daily engagement at Purpose"*; *"ProUX, my own AI product, live"*), link "Ask about …" (abre o chat "Ask Surinder" com pergunta pré-preenchida) e Book a call. Rodapé: *"$3,000 pilot week · $8,000 a month · 2 pilot weeks open a month"*.
- **Função pra ele:** catálogo de serviços, um por vertical de mercado, cada um com prova numérica. É o "o que você compra" detalhado.
- **Como a v4 reaproveitou:** virou "Projects" (Mission Control + 2 placeholders profissionais) e, no card extra, "Skills" com lista de 13 skills "[PLACEHOLDER]/10" e link "How it's calculated →". **Faz sentido em parte:** a cartela escura com cards expansíveis serve bem para **Projetos em destaque (H4)**; já a lista de skills entalada no card "coming soon" não cabe (ficou um bloco de texto onde o original tinha um card de 3 linhas).
- **Sugestão:** **adaptar para Projetos.** Manter a estrutura do painel trocando os rótulos: "WHAT I FIX" → "O problema", "WHAT YOU GET" → "O que entreguei", "PROOF" → números do projeto (Spot/NPS Prism tem case completo). Skills vai pra outra seção (ou pro modal "How it's calculated", conforme A1).

### 06. How it works — "1 flow. 5 working days. Shipped on Day 5."
- **Id:** sem id; classe `ha`, `data-ga-section="how_it_works"`.
- **O que ele coloca:** kicker *"Your week, on real dates"*; **calendário mensal real** (gerado em JS com a data de hoje: *"Sep to Oct 2026 · Dubai · Mon to Fri"*) com os dias marcados Call → Design → day 2 → Review → Iterate → Shipped, e uma linha de resumo *"Book today. Call Thu 1 Oct, shipped Fri 9 Oct."*. Ao lado, 4 passos numerados: **01 Before day 1** Book a call, **02 Day 1 to 2** Design it, **03 Day 3 to 4** Review and iterate, **04 Day 5** Shipped. Book a call.
- **Função pra ele:** tirar o medo do "quanto tempo demora": mostra o processo cabendo numa semana de calendário de verdade. É o processo de entrega.
- **Como a v4 reaproveitou:** virou "Education" com o calendário recalibrado para anos (2010–2030, células por ano com SENAI, ETE, UFSCar, B.Sc., USP, MBA, PUC, ITA, M.Sc.) e os 4 passos viraram 6 itens de formação. **Faz sentido**, e o Lucas gostou: o componente "calendário + lista numerada" é genérico o bastante para virar timeline. O único ruído é o grid 7 colunas (dias da semana) aplicado a anos, que gera células vazias (2025–2030) sem significado.
- **Sugestão:** **manter e evoluir.** Usar o mesmo componente para Education **e** Experience (H6 "super importante"), de preferência uma régua de anos contínua em vez de grade 7×N. É a melhor referência de timeline do conjunto (C21).

### 07. Pricing — "One flow first."
- **Id:** `#pricing` (`data-ga-section="pricing"`).
- **O que ele coloca:** dois **cards de plano** lado a lado. **Pilot week** (badge *"START HERE"*, *"Pilot Flow · sold once per client"*, **$3,000**, *"1 flow · 1 week · fixed price"*, Book a call *"30 minutes. No pitch."*, lista do que inclui, lista **Not included** com ×: *"Development or build. You get Figma files and developer-ready specs"*, *"A second flow. That is the next week."*, *"More than 1 round of feedback."*; link *"See the work: Puffy →"*). **Monthly** (**$8,000 /mo**, *"3 flows + 1 measure week a month · Month to month"*, *"Your pilot counts toward month 1"*, link *"See the work: Purpose →"*). Rodapé: *"Prices in USD. 50% upfront, 50% on completion. Custom or in-house work? Email hey@surinder.design"*, *"Only 2 pilot weeks a month"* e chip *"Ask Surinder about the pilot week"*.
- **Função pra ele:** a tabela de preços. Escassez ("2 pilot weeks a month"), ancoragem (pilot barato antes do mensal), limites claros ("Not included") pra evitar escopo infinito.
- **Como a v4 reaproveitou:** virou "Code Shop. Free snippets." com dois cards: `retry_with_backoff.py` **$0 free** e `debounce.ts` **$0 free**, botão "Copy the code", rodapé *"Free to use. No dependencies. More on github.com/Lukasavicus."* **Não faz sentido:** é um pricing table com preço zero; "$0 free" em destaque, "START HERE" e "Not included" só fazem sentido quando há compra. O Lucas descreveu certo: parece loja.
- **Sugestão:** **descartar o layout na home.** Code Shop vai pro footer/página própria (A1, E8) como lista de snippets com botão copiar (C13), sem cards de plano. A cartela escura gradiente pode ser reaproveitada para **Números/stats (H8)** ou pro CTA final.

### 08. How I think — "Screens are easy. Behaviour is hard."
- **Id:** `#how-i-think`.
- **O que ele coloca:** h2 com "Behaviour is hard." em itálico serifado laranja; sub *"Persuasion, Emotion, Trust. In fintech and eCommerce every step is a decision about money, so every step gets designed."*; 3 cards com ícone circular: **Persuasion** (*"anchors and defaults decide the basket before shoppers think"*), **Emotion** (*"Money makes people nervous. The moment of doubt at KYC or payment gets designed first."*), **Trust** (*"A new wallet or store is a stranger asking for your card."*). Rodapé: *"Certified Digital Persuasion Analyst (HFI)"*.
- **Função pra ele:** filosofia/metodologia em 3 pilares; mostra que há método por trás do serviço e amarra com a certificação.
- **Como a v4 reaproveitou:** virou "Languages. Always learning." com 3 cards: Portuguese (Native), English (Full professional), Korean (Beginner) + nota "Spanish, Italian: interested". **Não faz sentido** no peso: a seção foi desenhada para 3 **pilares de pensamento**, com h2 grande e cards; línguas num perfil são um detalhe de rodapé (A1: "nunca uma seção grande e chamativa").
- **Sugestão:** **adaptar para "pilares de valor" ou "como eu penso" (H3).** Três cards do tipo "Tecnologia como meio, não fim / Reinventar-se onde não há resposta ainda / Pessoas que me desafiam" — o texto do About longo do Lucas já tem exatamente 3 ideias assim. Languages vira uma linha discreta no About ou no footer.

### 09. Testimonials (vídeo) — "Hear it from the founders"
- **Id:** `#testimonials`.
- **O que ele coloca:** sub *"Unscripted clips from the people who signed the checks."*; 4 **vídeos verticais** com play (Avin Kline — Lucyd, CEO, USA; José Navarro — Barefoot Media, Founder, Australia; Sheila Raper — AJElite Homes, MD, USA; Uli Schönleber — Ooliv, Founder, Germany). Abaixo, **CTA intermediário**: *"Bring your numbers. I will show you where they leak."* + Book a call *"30 minutes. No pitch."*
- **Função pra ele:** segunda camada de prova social (vídeo é mais crível que texto) e um CTA no meio da página pra quem já se convenceu.
- **Como a v4 reaproveitou:** virou "Photography" com 4 placeholders de foto e CTA *"Let's grab a coffee and talk ideas."* **Faz pouco sentido na home** (o Lucas já tirou Photography da home); a grade 4×vertical até serve para fotos, mas aqui ela ocupa o slot de prova social antes do About.
- **Sugestão:** **adaptar:** a grade 4-up pode ser o **teaser de Interesses/página pessoal (H10)** (4 cards: viagens, fotos, livros, competitive programming → "ver mais"). O **CTA intermediário** vale manter em qualquer versão (H12).

### 10. About — "Surinder Thakur"
- **Id:** `#about-intro` (`data-ga-section="about"`), h2 `#about-name`.
- **O que ele coloca:** à esquerda, **foto circular P&B com arcos coloridos ao redor** e 4 pills orbitando (AI Product Designer, UI/UX Design Manager, Design Systems Manager, Design Mentor). À direita: nome grande, kicker *"Fractional Design Lead · Dubai, UAE"*, 3 parágrafos (*"I am Surinder Thakur, an AI Product Designer. I work with companies as a fractional design lead…"*, *"For 19 years I have designed user journeys…for $1B+ consumer and business brands."*, *"I have built new AI products from zero, and built my own AI product, ProUX."*), **3 selos de certificação** (NN/g UX Certified, HFI CUA, HFI CDPA) com legenda. Abaixo, **faixa de 5 stats**: *19 years designing user journeys · $1B+ brands · +67% YoY revenue at Puffy · +21% mobile checkout conversion · CUA · CDPA*.
- **Função pra ele:** humanizar (a única foto dele na home), credenciais e números-resumo. Vem **depois** do preço de propósito: quem chegou aqui já quer saber quem é a pessoa.
- **Como a v4 reaproveitou:** mesma estrutura com a foto do Lucas, pills "AI-driven products / Technical leadership / Machine Learning / Competitive programming", About longo completo, e no lugar dos selos "Certifications: none yet (on the roadmap)". **Faz sentido**, e o Lucas gostou. Só o slot dos selos ficou oco.
- **Sugestão:** **manter.** Usar o slot dos selos para Honors & Awards (OBI, OBMEP) ou logos de formação (ITA/USP/UFSCar) — mesmo peso visual de "credencial". Manter a faixa de stats logo abaixo (H8): anos de carreira, nº de empresas, nº de pessoas lideradas, nº de projetos, 2 MBAs + M.Sc. Pode subir na página: num perfil pessoal o About cabe mais cedo que no funil de vendas.

### 11. FAQ — "Everything you need to know about pricing, service, and terms."
- **Id:** `#faq`.
- **O que ele coloca:** coluna esquerda com link *"Browse all answers →"*, 3 abas-filtro (Services & Scope / Pricing & Process / General) e caixa *"Couldn't find what you were looking for? Send your question"*. Coluna direita: acordeão com 8 perguntas: *"What do I get for $3,000?"* (aberta: *"The pilot week. The flow we agree on, redesigned and shipped in 1 week… Sold once per client."*), *"What happens after the pilot week?"*, *"Can I start monthly without a pilot?"*, *"Which flows do you take on?"*, *"Do you design AI products?"*, *"Can't I build this myself with AI tools?"*, *"Do you build landing pages or template sites?"*, *"Do you offer mentorship for designers?"*
- **Função pra ele:** objeções de venda respondidas antes do call (e SEO de cauda longa). Note a pergunta *"Can't I build this myself with AI tools?"*: ele antecipa a objeção de 2026.
- **Como a v4 reaproveitou:** virou "Been there, and the bucket list." com abas "Been there / Bucket list", caixa *"Been somewhere on the list? Send me a tip"* e acordeão por região (Brazil, Argentina, USA, Europe, Africa…). **Faz sentido mecanicamente** (abas + acordeão servem para qualquer lista categorizada), mas é Travel na home, que o Lucas não quer.
- **Sugestão:** **mover.** O componente abas + acordeão é bom para a **página de FAQ via footer (H9/E9)** e para a página pessoal (Travel por região, com "Send me a tip" fazendo às vezes de **tip jar** de recomendações). Fora da home.

### 12. Custom scope — "Custom scope?"
- **Id:** sem id; classe `quote`, `data-ga-section="custom_quote"`.
- **O que ele coloca:** cartão claro flutuando sobre o topo do footer escuro: *"A bigger build, a team in-house, or a brief that doesn't fit a week. Email the details. A written quote comes back, not a sales call."* + botão `hey@surinder.design →`.
- **Função pra ele:** válvula de escape para quem não cabe nos dois planos (venda consultiva por e-mail).
- **Como a v4 reaproveitou:** "Let's talk ideas?" com e-mail, GitHub e LinkedIn. **Faz sentido**: é só um CTA de contato.
- **Sugestão:** **manter** como CTA final "Let's grab a coffee" (H12) com ícones sociais (C1). É o lugar natural do botão de contato antes do footer.

---

## PROCESS (`/process`)

A página inteira é o **detalhamento da "pilot week"**: o que acontece em cada dia, o que o cliente recebe, e uma calculadora para o cliente se convencer do ROI. Na v4 virou "How It's Calculated" (heurística de pontuação de skills), que o Lucas já decidiu transformar em **modal** (A1), não página.

### P01. Hero — "No guesswork."
-
- **Original:** fundo branco, h1 curto, sub *"1 flow, 1 week, 1 senior lead. Design Day 1 to 2, review Day 3, iterate Day 4, ship Day 5."*
- **Função:** promessa de previsibilidade em 1 frase.
- **v4:** "How It's Calculated. Each skill's score (0–10) combines two axes." Encaixa como hero de uma página de método, mas a página não deveria existir (vira modal).
- **Sugestão:** **adaptar** só se o Lucas fizer uma página "Como eu trabalho" (E5: "interessante, mas NÃO é o How It's Calculated").

### P02. The week — "From the call to a shipped flow in 5 working days."
-
- **Original:** fundo preto `#0E0E0E`, 5 blocos em zigue-zague com imagem + texto: **Step 1 Book a call** (*"AI reads your analytics, session recordings and support tickets for the drop-off pattern"*), **Step 2 Design** (*"AI drafts more directions faster, so weak ones die early. Surinder designs the final screens in a Figma system"*), **Step 3 Review and iterate**, **Step 4 Shipped** (*"AI checks every screen against the specs before handoff"*), **Or go monthly**. Cada bloco tem três sub-blocos fixos: descrição, **"AI in action"** e **"What you get"** (3 bullets). Rodapé: *"Pilot week $3,000 fixed, 50% upfront, 50% on completion."*
- **Função:** detalhar a entrega dia a dia; "AI in action" é posicionamento (designer que usa IA no processo, não que é substituído por ela).
- **v4:** "The method." em 3 passos (Time, Coverage, Score) + bloco "The skills". A estrutura de passos serve, mas sobra espaço (3 passos ocupando o layout de 5).
- **Sugestão:** **adaptar** para "Como eu trabalho" se essa página nascer (descoberta → arquitetura → entrega → operação, com "o que você recebe"); para o modal de skills, basta uma versão compacta de 3 linhas.

### P03. Behind the method — "Can they? / Will they?"
-
- **Original:** dois painéis grandes: **Can they?** (*"Usability friction. Where users get lost, stuck, or slowed. Research. Testing. Evidence."*) e **Will they?** (*"Emotional friction. Doubt, distrust, hesitation at the moment of decision. Persuasion. Emotion. Trust."*).
- **Função:** o framework em 2 eixos que justifica tudo (usabilidade × persuasão).
- **v4:** "Time / Coverage" — os 2 eixos da heurística de skills. **Faz sentido**: é exatamente um framework de 2 eixos.
- **Sugestão:** **manter a ideia** dentro do modal "How it's calculated" (2 eixos → nota). Boa tradução.

### P04. Link pra pricing — "Comparing me to an agency? The numbers are on the pricing page."
-
- **Original:** uma linha de texto com link, ponte para `/#pricing`.
- **v4:** *"The scores feed the skills on the home page."* Mesma função de ponte. **Faz sentido.**
- **Sugestão:** **descartar** (vira o próprio botão de fechar/voltar do modal).

### P05. Calculator — "Run your numbers."
- Id `#calculator`.
- **Original:** **calculadora interativa de ROI**: abas E-commerce store / Mobile app; sliders de *Conversion rate 1.5%*, *Average order value $146*, *Monthly sessions 50,000* → *Annual revenue $1,314,000*; botões de lift +5% / +10% / Custom; resultado *"Estimated increase +$65,700 − Pilot week $3,000 = Additional net revenue +$62,700"*. Disclaimer *"An estimate, not a promise."*
- **Função:** o cliente vê o serviço se pagando com os próprios números. É a peça de venda mais forte da página.
- **v4:** "The skills." — lista de 13 skills com placeholders e um painel "Selected skill" mostrando Time / Coverage / Score. **Faz sentido como ideia** (um widget interativo de skill → eixos → nota), mas é um painel estático de placeholders onde o original tem um brinquedo que o usuário mexe.
- **Sugestão:** **adaptar** como o conteúdo interativo do modal: clicar na skill mostra tempo, cobertura e nota. Só vale se as notas existirem; com placeholder, não publicar.

### P06. Close — "Every week, run by me. No handoffs and no juniors."
- `data-ga-section="process_close"`.
- **Original:** foto dele + *"From the call to the Day 5 ship, you work with me. Design manager at a $1B brand for 2 years · 19 years in mobile, SaaS & eCommerce"*; 2 mini-cards de preço (*"Pilot week · checkout flow $3,000"*, *"Pilot week · signup or onboarding $3,000"*), *"See all pricing"*, Book a call, *"2 pilot weeks open a month"*.
- **Função:** fechamento com rosto + preço + CTA.
- **v4:** motto + bio curta + "Let's grab a coffee / Talk ideas / See the skills / GitHub · LinkedIn". **Faz sentido** como CTA final.
- **Sugestão:** **manter** o padrão "foto + 1 frase + CTA" como fechamento de qualquer página interna.

---

## Componentes globais

| Componente | Original (o que é / pra que serve) | v4 do Lucas | Sugestão |
|---|---|---|---|
| **Nav desktop** (`#v2-nav-open` no topo do hero → `#v2-nav-pill` flutuante ao rolar) | Logo "Surinder T. · AI Product Designer", links Work / Process / About / ProUX↗ (produto dele), pill "Available" e **Book a call**. Vira pílula vítrea centralizada ao rolar (`#v2-top-veil` suaviza o topo). | "Lucas L. · AI Leader & Tech Innovator", Work / Method / About / GitHub, pill "Always learning", botão "Let's grab a coffee". Encaixa; "Method" só existe porque a página de skills existe. | **Manter** (C3). Links finais: About / Experience / Projects / Personal + CTA. "Always learning" no lugar de "Available" é boa troca. |
| **FAB de contato** (`#v2-contact-float`, canto superior direito; `#v2-mobile-topbar` no mobile) | Dois círculos: **Email** (`mailto:hey@surinder.design`) e **WhatsApp** (`wa.me/…`), com tooltip. Sempre visíveis. No mobile, barra superior com logo + os 2 ícones. | Replicado com e-mail. | **Manter** (C7/C8): e-mail + LinkedIn (ou GitHub) em vez de WhatsApp. |
| **Tab dock mobile** (`#v2-tab-dock`, `fixed bottom-6`) | Barra inferior vítrea escura com 4 abas: Home / Work / Process / About (ícone + rótulo), estilo app nativo. | Replicado: Home / Work / Method / About. | **Manter** (C4). Trocar para Home / Experience / Projects / About (ou Personal). |
| **Book a call** (botão, 16× na home) | Abre o embed **Cal.com** (`data-cal-link="surinder/design-intro-meeting"`, tema dark). É a conversão do site. | "Let's grab a coffee" (link/e-mail). | **Adaptar**: se o Lucas quiser agendamento, Cal.com é gratuito; senão, mailto. Reduzir a frequência (16× é coisa de landing page). |
| **Ask Surinder** (`.ad-root`, painel `role=dialog`, aba `.ad-tray`) | **Chatbot com IA** ancorado embaixo à direita: *"I'm Surinder's AI assistant, trained on everything he's published here… I answer from this site, nothing else."* Chips de perguntas comuns (*"What does the pilot week include?"*, *"How fast can we start?"*, *"What did you do at Puffy?"*, *"How do payments work?"*). Links Book a call / WhatsApp / See pricing. Os cards de serviço disparam o chat com pergunta pré-preenchida (`data-ask-topic`). | Não replicado. | **Descartar** por ora; a versão "machine-readable / agent-ready" (E13) cobre a mesma intenção com custo zero. |
| **Footer** (`footer.night`) | Fundo escuro com ondas; *"Working remotely with founders worldwide."*, *"2 pilot weeks open a month"*, Book a call, e-mail; sitemap (Home / Work / Process / About / Ask / Privacy / Terms / Payment terms); pill "Available"; © + **endereço físico em Dubai** e **telefone WhatsApp**; LinkedIn. | Replicado com motto, e-mail, sitemap curto, "Design inspired by surinder.design", GitHub, LinkedIn, e "Certifications: none yet". | **Manter e engordar** (C2): social, sitemap, FAQ, Code Shop, tip jar, versão markdown. Tirar "Certifications: none yet" do footer (ruído). |
| **Tip jar** | **Não existe no original.** O mais perto é o "Custom scope?" (pedido de orçamento) e o "Send your question" do FAQ. | O "Send me a tip" do Travel (v4) é dica de viagem, não gorjeta. | É item **novo** do Lucas (E12): vai pro footer, sem referência no Surinder. |
| **FAQ** | Seção da home (#11 acima) com abas + acordeão + "Send your question". Há também a página `/payment-terms`, `/terms`, `/privacy` linkadas no footer (texto legal de contrato). | Virou Travel. | **Mover** para página via footer (H9/E9), reaproveitando abas + acordeão. |
| **Páginas internas** | `/work` (3 cases: Puffy Ecommerce, ProUX, MyHouz), `/about` (hero *"19 years in UX. The last 2 rebuilding it with AI."*, **Executive Summary** = timeline de empregos 2007→2025 com duração, **Clients since 2007**, **Professional certifications** com 7 selos), `/process`. | Só home + process. | A `/about` do Surinder é a referência boa para a página **Experience** do Lucas: lista cronológica com cargo, empresa, período, duração e cidade. |

---

## Tabela resumo

| # | Seção original | Função no site dele | Conteúdo do Lucas que caberia | Decisão |
|---|---|---|---|---|
| 01 | Hero + carrossel de trabalhos | Dor + oferta + preço + CTA na 1ª tela | Motto, bio curta, mini-fatos (cargo, M.Sc., anos), CTA; carrossel → logo wall / projetos | **Adaptar** (sem card de 2 planos, sem slider antes/depois) |
| 02 | Reviews "Trusted by founders" | Prova social com números | Testimonials (terceiros) + faixa de logos; Honors vai pro About | **Adaptar** |
| 03 | Who it's for (4 personas) | Qualificar o lead | Pilares de valor (H3) ou "pra quem é o site" | **Adaptar** |
| 04 | Hiring takes months (tabela 2 colunas) | Matar objeção "contratar vs. me contratar" | Nada; Experience vira timeline | **Descartar** |
| 05 | How I help (cards de serviço) | Catálogo de serviços com prova | Projetos em destaque (problema / entrega / números) | **Adaptar** |
| 06 | How it works (calendário real + 4 passos) | Mostrar que cabe numa semana | Education **e** Experience em timeline | **Manter** |
| 07 | Pricing (2 planos) | Preço, escassez, limites | Nada na home; Code Shop vai pro footer como lista | **Descartar** |
| 08 | How I think (3 pilares) | Método + certificação | 3 ideias do About longo (tecnologia como meio etc.); Languages vira linha discreta | **Adaptar** |
| 09 | Testimonials em vídeo + CTA | Prova social 2 + conversão no meio | Teaser de Interesses/página pessoal (4-up) + CTA | **Adaptar** |
| 10 | About (foto com arcos + selos + stats) | Humanizar + credenciais | About longo, pills de atuação, Honors no slot dos selos, stats | **Manter** |
| 11 | FAQ (abas + acordeão) | Objeções + SEO | FAQ via footer; Travel por região na página pessoal | **Mover** |
| 12 | Custom scope (card sobre o footer) | Escape pra venda consultiva | CTA "Let's grab a coffee" + sociais | **Manter** |
| P01 | Process hero "No guesswork." | Promessa de previsibilidade | Hero de "Como eu trabalho", se existir | Adaptar / opcional |
| P02 | The week (5 passos com "AI in action") | Detalhe da entrega | "Como eu trabalho" ou 3 linhas do modal de skills | Adaptar |
| P03 | Behind the method (2 eixos) | Framework | Time × Coverage no modal | Manter a ideia |
| P04 | Link pra pricing | Ponte | — | Descartar |
| P05 | Calculadora de ROI | Convencer com números do cliente | Widget skill → eixos → nota (só com notas reais) | Adaptar |
| P06 | Close (foto + preço + CTA) | Fechamento | Foto + motto + CTA | Manter |

---

## Resumo

1. O original é uma landing page de venda de serviço (pilot week US$ 3.000 / US$ 8.000 mês) organizada como funil: dor → prova → persona → objeção → serviço → processo → preço → método → prova 2 → quem sou → FAQ → orçamento custom, com "Book a call" (Cal.com) 16 vezes.
2. As 12 seções da home e 6 do /process estão mapeadas acima (recortes de tela no lab privado).
3. Incompatibilidade 1: **Reviews → Honors & Awards.** A estrutura exige terceiros falando (foto, nome, cargo, resultado em número); prêmios assinados pelo próprio Lucas viram auto-elogio. Lugar certo pra Testimonials; Honors vai pro About.
4. Incompatibilidade 2: **Hiring (tabela ruim-vs-bom) → Experience Before/Now.** O componente é comparação de planos por natureza; dois cargos lado a lado parecem dois produtos. Experience deve ser timeline.
5. Incompatibilidade 3: **Pricing → Code Shop e How I think → Languages.** Pricing é um cartão de planos com "START HERE" e "Not included", sem sentido com $0; e os 3 pilares de método são grandes demais pra línguas. Code Shop vai pro footer; Languages vira uma linha.
6. Vale manter: **How it works** (calendário em datas reais + passos numerados) como timeline de Education e Experience; **About** (foto com arcos, pills, slot de selos → Honors/formação, faixa de stats); **Custom scope / Close** como CTA final; nav em pílula, FAB de contato, tab dock mobile e footer.
7. Vale adaptar com outro conteúdo: Hero (mini-fatos em vez de card de preço), Who it's for (pilares de valor), How I help (projetos em destaque), Testimonials 4-up (teaser da página pessoal), FAQ (página via footer / Travel na página pessoal).
8. O /process vira o modal "How it's calculated": a parte "Behind the method" (2 eixos) e a calculadora (skill → tempo, cobertura, nota) são as únicas peças que sobrevivem.
9. Não há tip jar nem chatbot equivalentes no conteúdo do Lucas: tip jar é novidade dele (footer); "Ask Surinder" pode ser descartado em favor da versão agent-ready.
10. A `/about` original (Executive Summary cronológico com duração e cidade, logos de clientes, 7 selos) é a melhor referência para a página Experience do Lucas.
