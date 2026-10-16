// Publishable editorial additions. Private research stays outside the repository.
module.exports = (PROJECTS, EXP) => {
PROJECTS.push(...[
  {
    "title": "Analytics tools: DataCutter & Selecter",
    "meta": "InstaCarro · growth analytics",
    "href": "projects/instacarro-analytics-tools.html",
    "role": "growth-hacking-intern-instacarro",
    "text": "Two tools I developed at InstaCarro to query Google Analytics reports and make selected results accessible in a web interface.",
    "tech": "HTML, JavaScript, PHP, Google Analytics API",
    "page": [
      [
        "Context.",
        "Marketing analysis needed specific entries from Google Analytics reports, rather than a full export every time."
      ],
      [
        "My contribution.",
        "I developed DataCutter and Selecter at InstaCarro. DataCutter searches report entries; Selecter accepts query parameters and presents results in a table."
      ],
      [
        "Design.",
        "A small web interface exposed a focused query workflow. The Selecter documentation describes retrieving more results than the reference query explorer allowed, while initially supporting path and medium as its dimensions."
      ],
      [
        "Delivered artifact.",
        "The archived implementations and author-attributed READMEs document these two tools. They do not establish adoption volume or a measured business gain."
      ],
      [
        "Limitations.",
        "Authorization still required a manually supplied code. More dimensions and a friendlier interface were documented as future work. The exact development dates remain unresolved; no date or efficiency metric is inferred from the archive."
      ]
    ]
  },
  {
    "title": "Orion: data lineage & maintainability",
    "meta": "Safra · 2019",
    "href": "projects/orion-safra.html",
    "role": "data-engineer-safra",
    "text": "I mapped the relationships behind an existing analytics platform and contributed to query diagnosis, template analysis and frontend modularization.",
    "tech": "SQL, Python, Excel, FreeMarker, Angular, Node.js",
    "page": [
      [
        "Problem.",
        "Knowledge of how source data became screens was concentrated in a few people. This made onboarding and maintenance of the existing Orion platform difficult."
      ],
      [
        "My contribution.",
        "I manually mapped screens, APIs, tables, procedures and source folders into a relationship inventory. The output was high-level documentation of the system and its dependencies."
      ],
      [
        "Performance work.",
        "I helped investigate a slow refresh job, examining embedded business rules, raw-data subqueries and infrastructure contention with colleagues. The available activity report points to a results worksheet but does not establish a verified final speedup."
      ],
      [
        "Engineering work.",
        "I wrote a Python analyzer for FreeMarker templates to report quality indicators and support corrections. In the Orion 2.0 initiative, I contributed to bringing branches together and modularizing frontend components for reuse."
      ],
      [
        "Decision.",
        "First make dependencies visible, then target changes to specific parts of the platform. Documentation and component boundaries supported maintenance without claiming ownership of the original system."
      ],
      [
        "Outcome & limits.",
        "The documented deliverable is a relationship inventory and supporting engineering work. This account is based on my own activity report; independent validation was planned, and platform-wide performance or financial benefits are not claimed."
      ]
    ]
  },
  {
    "title": "Account adoption metrics",
    "meta": "TELUS Digital / Poatek · telecom client · 2024",
    "href": "projects/account-adoption-metrics.html",
    "role": "data-ai-manager-telus-digital",
    "text": "A scoped engineering task to aggregate distinct accounts by feature and month, with shared denominators and a rolling 90-day view.",
    "tech": "AWS Athena, EMR, SQL, GitLab",
    "page": [
      [
        "Problem.",
        "Feature adoption metrics needed consistent account counts and denominators across monthly and rolling-period views."
      ],
      [
        "My scope.",
        "I was assigned the account-adoption aggregate table task: create the Athena table, backfill roughly three months and add a 90-day period. This is a contribution within a broader client programme."
      ],
      [
        "Model.",
        "The documented grain groups feature, application and month, with account counts, users and active subscribers. Distinct-account counts must be calculated for each reporting window rather than summed across months."
      ],
      [
        "Engineering work.",
        "The archive includes development inputs, an intermediate job-format implementation and execution guidance for the EMR/Athena workflow."
      ],
      [
        "Status & limits.",
        "These artifacts support the assigned task and implementation work. They do not confirm the final production release or a measured adoption impact. The related Self-Install ETL redesign included proposals and remains separate from any claim of completed delivery."
      ]
    ]
  }
]);
PROJECTS.push({
 title: 'DOMO to GCP: dependency mapping and migration',
 meta: 'TELUS Digital · data engineering',
 href: 'projects/domo-gcp-migration.html',
 role: 'data-ai-manager-telus-digital',
 text: 'Making migration dependencies visible, coordinating delivery and exporting the remaining data and flow definitions so work could continue after an earlier DOMO access cutoff.',
 tech: 'Python, DOMO API, dependency graphs, SQL, GCP, Dataproc',
 article: require('./domo-story.json').en,
 page: [['Context.', 'An established migration team needed visibility of remaining dependencies.'], ['Contribution.', 'Dependency mapping, delivery coordination and checked exports supported an earlier access cutoff.']]
});
const additions = {
 'sos-safra-budgeting': [['Decision.', 'Move validation to the point of entry and make ownership, deadlines and approval state visible. The diagram reconstructs the business workflow, not the private implementation.'], ['Scope & limits.', 'Backend and database work was shared with another developer; frontend, infrastructure and business teams contributed separately. Bank-wide adoption is my reported outcome, not an independently audited metric.']],
 'aml-onboarding-safra': [['Delivery decision.', 'Central rules and channel adapters allowed teams to integrate around a common process. My work was product ownership, coordination and removing delivery dependencies, rather than implementing the rule engine.'], ['Scope & limits.', 'The delivery timeline and channel counts are my account of the project. This page describes the delivered workflow; it does not provide an independent regulatory assessment.']],
 'address-rpa-deloitte': [['Decision.', 'Use explicit normalization and fuzzy matching, then route unresolved cases to a person. Separate the resolution logic from the RPA that propagated approved corrections.'], ['Scope & limits.', 'The correction rate and financial figures are reported estimates from the original case, not metrics independently recalculated from the archive. The exact match between archived CEP tools and the production engine still needs confirmation.']],
 'btg-payments-data-lake': [['Decision & limits.', 'Document and observe the existing flows before changing them. File consolidation was a proposal; the final release and its measured benefit are not established here. The diagram is conceptual and does not settle the architecture classification.']]
};
for (const p of PROJECTS) {
 if (!p.role) continue;
 const id = p.href.replace(/^projects\//, '').replace(/\.html$/, '');
 p.visual = 'assets/cases/' + id + '.svg';
 if (additions[id]) p.page.push(...additions[id]);
 if (id === 'sos-safra-budgeting') {
  p.article = require('./sos-story.json').en;
  p.text = 'How we worked with business teams to replace budgeting spreadsheets with a shared process, and the technical decisions behind the delivery.';
  p.gallery = [
    {src:'assets/cases/sos-workflow.gif',alt:'Animated walkthrough of the reconstructed SOS: edit a forecast, submit it, request a correction, resubmit, approve and inspect the history. Orange circles highlight clicks.',caption:'A complete walkthrough of the current reconstruction with fictional data: forecast entry, validation, correction, approval and history. Click the animation to view it at full resolution.'}
  ];
}
if (id === 'sos-safra-budgeting') p.tech = 'Angular, Node.js with TypeORM, SQL database';
 if (id === 'aml-onboarding-safra') {
  p.article = require('./pld-story.json').en;
  p.text = 'Mapping eight different onboarding journeys, aligning teams and SLAs, and coordinating their gradual adoption of a shared AML process in production.';
  p.tech = 'Red Hat Process Automation Manager, decision models, Apache Camel, Spring Boot, Helm, OpenShift';
 }
 if (id === 'address-rpa-deloitte') {
  p.article = require('./claro-story.json').en;
  p.text = 'From exploring customer-address data to composing Python rules, reviewing ambiguous matches and handing over a repeatable resolution process.';
 }
 if (id === 'btg-payments-data-lake') {
  p.article = require('./btg-story.json').en;
  p.text = 'Draft: joining an existing payments data platform, documenting its flows, adding observability and proposing improvements to file handling and reconciliation.';
 }
}
// Source-backed editorial drafts, kept on the current branch for review.
for (const d of require('./draft-cases.json')) {
 const href = 'projects/' + d.slug + '.html';
 let p = PROJECTS.find(p => p.href === href);
 if (!p) { p = {href}; PROJECTS.push(p); }
 Object.assign(p, {title: 'Draft · ' + d.title, meta: d.meta, role: d.role,
   text: d.summary, tech: d.tech, article: d.en, draft: true,
   visual: 'assets/cases/' + d.slug + '.svg',
   page: [['Context.', d.summary], ['Contribution.', 'Source-backed draft for editorial review.']]});
}
// Drafts remain addressable, but public navigation only uses validated cases.
for (const p of PROJECTS) {
 if (['aml-onboarding-safra', 'btg-payments-data-lake'].some(id => p.href === 'projects/' + id + '.html')) {
  p.draft = true;
  if (!p.title.startsWith('Draft · ')) p.title = 'Draft · ' + p.title;
 }
 if (p.article && !p.draft) p.article = p.article.replace(/<p class="editorial-draft">[\s\S]*?<\/p>/, '');
}
// Narrative links use plain labels while their destination awaits validation.
const draftHrefs = new Set(PROJECTS.filter(p => p.draft).map(p => '../' + p.href));
for (const e of EXP) {
 if (e.story) e.story = e.story.map(([label, text]) => [label, text.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
  (match, label, href) => draftHrefs.has(href) ? label : match)]);
}
const btg = EXP.find(e => e.slug === 'data-engineer-team-leader-btg-pactual');
btg.body = btg.body.map(t => t.replace('a Lambda architecture for BTG+ Digital payment channels', 'documentation, observability and improvement proposals for the existing BTG+ payments platform'));
btg.cvText = btg.cvText.map(t => t.startsWith('Implemented Lambda architecture') ? 'Documented and observed an existing payments platform with batch and near real-time ingestion; proposed file consolidation and supported changes to its query layer.' : t);
const bain = EXP.find(e => e.slug === 'senior-data-engineer-bain');
bain.story = bain.story.map(([l,t]) => l === 'Spot.' ? [l, 'I designed and implemented the Spot workbook comparison tool. The case reports approximately two weeks of manual review by 3–4 people reduced to about 30 minutes per validation. These figures are my account, not an independent audit. [Case study](../spot.html).'] : [l,t]);
const safra = EXP.find(e => e.slug === 'data-engineer-safra');
safra.story = safra.story.map(([l,t]) => [l,t.replace('Node + Express, Angular 8, TypeORM.', 'Node + Express, Angular, TypeORM.')]);
};
