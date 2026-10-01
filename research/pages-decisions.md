---
layout: default
title: Pages decisions
---

Baseado na primeira versão do superconjunto de páginas (`pages-superset.md`, no lab privado; a versão publicada é a [v2, sobre os sites originais](/research/pages-superset/)). Códigos (A1 #n, Hn, Cn, En) referem-se àquele arquivo. Este documento é a spec da v5.

## Mentalidade

- O site é um perfil pessoal, não uma empresa. A pessoa deve sair com a sensação de que me conheceu melhor.
- Mobile ready é obrigatório.
- Inspirar no design das referências (até nas cores), mas com estrutura própria. Nada de cópia próxima.

## Páginas principais (A1)

| Decisão | Itens |
|---|---|
| **Mantém como página/seção principal** | Home (1), About (2), Experience (3), Education (4), Skills (5), Projects (7), Contact (14), Resume (15, lugar a definir), Testimonials (16, lugar a definir) |
| **Agrupar numa página pessoal única** ("me conhecer melhor") | Interests (11), Travel (12), Photography (13), Map (E1), Musings (E2), Fun Facts (E3) |
| **Vira modal, não página** | How It's Calculated (6): ideia + metodologia inteiras cabem num modal. Ponto. |
| **Fora da nav principal, lugar a definir (footer)** | Code Shop (8), FAQ (E9), Honors & Awards (9) continua, mas dentro do About |
| **Detalhe pequeno, discreto** | Languages (10): nunca uma seção grande e chamativa |
| **Páginas de detalhe obrigatórias** (C23) | Experiências profissionais, experiências acadêmicas e projetos, no mínimo |

## Seções da home (A2)

| Código | Seção | Decisão |
|---|---|---|
| H1 | Hero com headline, motto, CTAs | Sim |
| H2 | Mini-fatos no hero | Sim |
| H3 | Pilares de valor | Sim |
| H4 | Projetos em destaque | Sim |
| H5 | Code Shop teaser | A definir onde (Code Shop não é principal) |
| H6 | Experience & Education teaser | Sim, super importante |
| H7 | Logo wall | Sim: parede com logos de empresas, escolas, olimpíadas, projetos |
| H8 | Números / stats | Sim |
| H9 | FAQ | Não na home. Vira página acessível só pelo footer; perguntas a definir |
| H10 | Interesses teaser | Sim |
| H11 | Explore the site / sitemap | Footer |
| H12 | CTA "Let's grab a coffee and talk ideas" | Sim |

Extra pra home: mensagens rotativas estilo "loading de jogo" (ou tela do Claude Design) com fun facts, lugares visitados e musings.

## Componentes (A3)

| Código | Componente | Decisão |
|---|---|---|
| C1 | Ícones sociais | Sim, no footer |
| C2 | Footer | Sim: social, sitemap, FAQ, Code Shop, tip jar, versão markdown |
| C3 | Nav fixa / sticky | Sim |
| C4 | Nav mobile | Sim, só em viewport mobile |
| C5 | Formulário de contato | Sim |
| C6 | Formulário em toda página | Não o formulário; sim um botão que chama (estilo jakeknapp) |
| C7 / C8 | CTA em toda página / FAB | Sim, como FAB. Definir comportamento no mobile |
| C9 | Back to top | Sim, muito importante |
| C10 | Sidebar fixa | Não (compete com a nav). Talvez híbrido nav → sidebar ao rolar, a avaliar |
| C11 | Nav agrupada / dropdown | A avaliar |
| C12 | Teaser + "ver mais" | Sim (implícito nos teasers da home) |
| C13 | Copy snippet | Só se houver Code Shop |
| C14 | Busca | Sim |
| C15 | Skip link | Sim |
| C16 | Share buttons | Sim |
| C17 | Seletor de idioma | Sim (EN agora, PT depois) |
| C18 | Barra de progresso de scroll | Sim, horizontal, nunca vertical |
| C19 | Navegação por teclado | Sim: cima/baixo = seções da mesma página; esquerda/direita = outras páginas |
| C21 | Timeline visual | Sim, muito. Melhor referência: o Surinder |
| C22 | Scroll reveal | Não, por enquanto |
| C23 | Página de detalhe | Sim (experiências, formação, projetos) |
| C25 | Newsletter | Não (não tenho) |
| C26 | Dark mode | Pode, baixa prioridade |

## Extras (A4)

| Código | Extra | Decisão |
|---|---|---|
| E1, E2, E3 | Map, Musings, Fun Facts | Sim, agrupados na página pessoal (e no ticker da home) |
| E4 | Let's Talk como página separada | Não precisa; o FAB e o Contact cobrem |
| E5 | Process / The Method | Interessante, mas NÃO é o How It's Calculated. Avaliar como "como eu trabalho" |
| E6 | Resume | Sim, lugar a definir |
| E7 | Testimonials | Sim, lugar a definir |
| E8 | Code Shop com páginas por snippet | Sim, mas fora da nav principal |
| E9 | FAQ | Sim, via footer |
| E10, E11 | Stats, Logo wall | Sim |
| E12 | Tip jar | Sim |
| E13 | Versão machine-readable / agent-ready | Sim, muito legal |
| E14 | 404 customizada | Sim |
| E15 | Formato interativo | Não |
| E16 | Home em prosa | Não |
| E17 | Explore the site | A entender (provavelmente footer) |

## Sobre os dois protótipos da v4

- **Callie + Spot:** "genial, é literalmente isso". Evoluir: mais imagens e todas as seções aprovadas acima.
- **Surinder adaptado:** ainda cópia próxima demais. Preferiu as cores originais do Surinder, mas quer estrutura bem diferente. Seções que não fizeram sentido com o conteúdo: Honors & Awards (estrutura ok, conteúdo não), Interests, Experience como "Before/Now" (parece comparação de planos), Code Shop como loja de produto, Languages grande demais, Photography e Been there/Bucket list na home. O que gostou: timeline de Education e a foto com traços circulando mais descrição detalhada. Pedido: mapear o que cada seção do Surinder original contém, pra entender a proposta dele antes de redesenhar.
