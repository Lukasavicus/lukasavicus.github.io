// Build script for lukasavicus.github.io (version A, Callie-inspired shell) — static pages out at the repo root,
// plus _layouts/default.html (same shell) for the Jekyll-rendered articles/ and research/.
// Run: node build.js   (idempotent; spot body comes from spot-body.html next to this file)
const fs = require('fs'), path = require('path');
const OUT = path.resolve(__dirname, '..');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------------- content (from ../content.md) ----------------
const NAV = [['index.html', 'Home'], ['about.html', 'About'], ['experience.html', 'Experience'], ['projects.html', 'Projects'], ['articles/', 'Articles'], ['personal.html', 'Personal'], ['contact.html', 'Contact']];
// Nav and footer use absolute paths (the site lives at the domain root); keep js/site.js PAGES in sync with NAV.
const abs = h => '/' + (h === 'index.html' ? '' : h);
const MAILTO = 'mailto:lukasavicus@gmail.com?subject=[A]%20Hello%20from%20your%20site';
const ABOUT = [
  "I believe two things can truly change a person's reality: education and God. Thankfully, I had access to education, and it let me find my way into the world of technology.",
  "Today I use technology not as an end, but as a means — an extremely powerful tool to reach business goals, whether they are concrete or fuzzy.",
  "I thrive in challenging environments where I have to reinvent myself: where the questions haven't been asked yet and the answers don't exist yet. More and more, I enjoy being around people who challenge my views, who push me to keep studying and improving, and who are highly skilled and talented. I've had the privilege of leading people like that.",
  "Simply put, I'm living my golden age."];
// start/end: decimal years (Jan=.0 … Dec=.9; 'Present' = 2026.75) for the home timeline bars.
// body: description from content.md. cvText (optional, array of bullets from ../cv-experience.md): when present it replaces body on experience.html and the detail page.
const EXP = [
  { slug: 'genai-manager-telus-digital', role: 'GenAI Manager', co: 'TELUS Digital (WillowTree / Poatek)', short: 'TELUS Digital', period: 'Oct 2026 – Present', start: 2026.75, end: 2026.75, line: '[PLACEHOLDER] One-line summary.', body: ['[PLACEHOLDER — not in the CV yet]'], tech: '[PLACEHOLDER]' },
  { slug: 'data-ai-manager-telus-digital', role: 'Data & AI Manager', co: 'TELUS Digital (WillowTree / Poatek)', short: 'TELUS Digital', period: 'Jun 2024 – Sep 2026', start: 2024.5, end: 2026.75, line: 'Led data engineering and AI initiatives for a large telecom client.', body: ['Led data engineering and AI initiatives: data infrastructure, ML solutions, team development, data governance and technology adoption. Built data pipelines on GitLab + AWS for a large telecom client, and led an R&D project to set up data engineering best practices and a data platform.'], tech: 'AWS, GitLab, Python, PySpark, Terraform',
    cvText: ['Leading data engineering and AI initiatives to drive business innovation.', 'Managing data infrastructure and implementing machine learning solutions for advanced analytics.', 'Overseeing team development, data governance, and strategic technology adoption.', 'Implemented data pipelines using gitlab, and AWS suit for a large Telecom company.', 'Leading P&D project and implementation of Data Engineering best practices and Data Platform.'] },
  { slug: 'senior-data-engineer-bain', role: 'Senior Data Engineer', co: 'Bain & Company', short: 'Bain', period: 'Apr 2023 – Jun 2024', start: 2023.25, end: 2024.5, line: 'Batch ingestion on Azure, Dash Enterprise data apps and a QA framework for analytics pipelines.', body: ['Batch ingestion pipelines on Azure, Dash Enterprise data apps, a QA framework for analytics pipelines, Databricks ↔ Tableau integration, and infrastructure for fraud detection and text analysis projects.'], tech: 'Azure, Databricks, Tableau, Dash Enterprise',
    cvText: ['Developed batch data ingestion pipelines using Microsoft Azure.', 'Built and maintained Dash Enterprise applications for data analysis.', 'Designed and implemented a Quality Assurance Framework for data pipelines.', 'Integrated Databricks with Tableau for enhanced data visualization.', 'Established data architecture for business intelligence and analytics projects.', 'Infrastructure to projects related to fraud detection and text analysis solutions.'] },
  { slug: 'data-engineer-team-leader-btg-pactual', role: 'Data Engineer & Team Leader', co: 'BTG Pactual', short: 'BTG Pactual', period: 'Jun 2021 – Dec 2022', start: 2021.5, end: 2023, line: 'Batch and real-time ingestion on AWS; co-led the data engineering, governance and visualization teams.', body: ["Batch and real-time ingestion on AWS, an in-house ingestion framework (PySpark + EMR), a Lambda architecture for BTG+ Digital payment channels, the bank's BI portal, and pipeline observability. Co-led the data engineering, governance and visualization teams."], tech: 'AWS (EMR, Lambda), PySpark, Angular, Datadog, Kubernetes',
    cvText: ['Managed data modeling and governance for business intelligence initiatives.', 'Developed batch and real-time ingestion pipelines using AWS services.', 'Designed a custom ingestion framework with PySpark and AWS EMR.', 'Implemented Lambda architecture for payment processing, integrating batch and near real-time data.', 'Led cross-functional data teams, coordinating engineering, governance, and visualization efforts.', 'Developed a business intelligence portal using AWS and Angular.', 'Used data observability systems integrating Datadog, and AWS.'] },
  { slug: 'data-engineer-safra', role: 'Data Engineer', co: 'Safra', short: 'Safra', period: 'Nov 2019 – Jul 2021', start: 2019.85, end: 2021.6, line: 'ETL job-scheduler framework; Product Owner of the anti-money-laundering rules engine.', body: ['Data modeling for visualization and an ETL job-scheduler framework. Tech lead of the internal budgeting system. Product Owner of the anti-money-laundering rules engine (Red Hat PAM + Apache Camel) and of the fraud-prevention ecosystem (Feedzai).'], tech: 'Red Hat PAM, Apache Camel, Feedzai',
    cvText: ['Designed data models and developed data visualization tools.', 'Built and optimized an ETL job scheduler for data transformation.', 'Led the internal budget system project for financial planning.', 'Served as Product Owner for a money laundering prevention system using Red Hat Process Automation Manager and Apache Camel.', "Managed the fraud prevention ecosystem, deploying Feedzai's risk assessment suite."] },
  { slug: 'trainee-safra', role: 'Trainee', co: 'Safra', short: 'Safra', period: 'Jan 2019 – Oct 2019', start: 2019, end: 2019.85, line: 'Job rotation across Credit, Back Office, Risk & Audit, Trading, Products and IT.', body: ['Job rotation across Credit, Back Office, Risk & Audit, Trading, Products and IT. Delivered data visualization, PMO and marketing machine-learning projects presented to the board, and ran workshops on banking products and programming logic.'], tech: '[PLACEHOLDER]',
    cvText: ['Rotated through key departments, including Credit, Risk, Audit, Back Office, and IT.', 'Developed data-driven projects in business intelligence, PMO, and machine learning.'] },
  { slug: 'market-intelligence-analyst-b2w', role: 'Market Intelligence Analyst', co: 'B2W Digital', short: 'B2W', period: 'Oct 2018 – Dec 2018', start: 2018.75, end: 2019, line: 'Business process automation and data structuring for commercial reports and KPIs.', body: ['Business process automation and data structuring for commercial reports and KPIs.'], tech: '[PLACEHOLDER]',
    cvText: ['Automated business intelligence processes and improved reporting structures.'] },
  { slug: 'advanced-analytics-consultant-deloitte', role: 'Advanced Analytics Consultant', co: 'Deloitte', short: 'Deloitte', period: 'Feb 2017 – Oct 2018', start: 2017.1, end: 2018.85, line: 'Process optimization for a telecom M&A, RPA POCs and Tableau executive dashboards.', body: ['Process mapping and optimization (PMBOK, Lean Six Sigma) for a multinational telecom going through M&A, Qlik insights, RPA training and POCs, and Tableau executive dashboards on AWS big data for a pharma company.'], tech: 'Qlik, Tableau, AWS, RPA',
    cvText: ['Applied PMBOK and Lean Six Sigma methodologies to optimize business processes.', 'Conducted process mapping and technology integration for multinational clients.', 'Developed executive dashboards in Tableau, connected to Amazon Big Data environments.', 'Led robotic process automation (RPA) training and proof-of-concept initiatives.'] },
  { slug: 'full-stack-developer-squid', role: 'Full-Stack Developer', co: 'Squid', short: 'Squid', period: 'Jan 2017 – Feb 2017', start: 2017, end: 2017.15, line: 'MEAN stack (later React), social-media data analysis and self-service BI tools.', body: ['MEAN stack (later React), plus social-media data analysis and self-service BI tools.'], tech: 'MongoDB, Express, Angular, Node, React',
    cvText: ['Developed web applications using the MEAN stack (MongoDB, Express.js, AngularJS, Node.js).', 'Applied data analytics to social media insights.'] },
  { slug: 'growth-hacking-intern-instacarro', role: 'Growth Hacking Intern', co: 'InstaCarro.com', short: 'InstaCarro', period: 'Jun 2016 – Aug 2016', start: 2016.45, end: 2016.65, line: 'KPIs across AdWords, Analytics and Facebook Ads; led an 8-person customer service team.', body: ['KPIs crossing AdWords, Analytics, Facebook Ads and internal data. Led an 8-person customer service team, and implemented NPS and referral acquisition.'], tech: 'AdWords, Google Analytics, Facebook Ads',
    cvText: ['Managed marketing data and implemented customer acquisition strategies.', 'Led customer service automation projects (NPS, SMS, WhatsApp, email).'] },
];
// Full role text as HTML: CV bullets when present, else the content.md paragraphs.
const roleHtml = e => e.cvText ? `<ul class="cv">${e.cvText.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : e.body.map(p => `<p>${esc(p)}</p>`).join('');
const EDU = [
  // ITA M.Sc. Data Science (started 2022) is NOT concluded. Kept here, commented out, so it is never presented as a degree.
  // { slug: 'msc-data-science-ita', degree: 'M.Sc. Data Science', school: 'Instituto Tecnológico de Aeronáutica (ITA)', short: 'ITA', period: '2022 – (in progress)', start: 2022 },
  { slug: 'mba-business-intelligence-puc-minas', degree: 'MBA, Business Intelligence & Business Analytics', school: 'PUC Minas', short: 'PUC Minas', period: '2021 – 2023', start: 2021, end: 2023 },
  { slug: 'mba-data-science-usp', degree: 'MBA, Data Science', school: 'Universidade de São Paulo (USP)', short: 'USP', period: '2020 – 2021', start: 2020, end: 2021 },
  { slug: 'bsc-computer-science-ufscar', degree: 'B.Sc. Computer Science', school: 'Federal University of São Carlos (UFSCar)', short: 'UFSCar', period: '2013 – 2017', start: 2013, end: 2017 },
  { slug: 'technical-it-ete-basilides-de-godoy', degree: 'Technical Degree, Information Technology', school: 'ETE Prof. Basilides de Godoy', short: 'ETE', period: '2011 – 2012', start: 2011 },
  { slug: 'technical-electronics-senai', degree: 'Technical Degree, Electronics & Electrotechnics', school: 'SENAI', short: 'SENAI', period: '2010 – 2011', start: 2010 },
];
// Skills grouped by class; color is a subtle per-group hue used as a left border on about.html.
const SKILL_GROUPS = [
  { name: 'Leadership & product', color: '#8a6d9e', items: ['Technical leadership & team management', 'Product ownership (PMBOK, Lean Six Sigma)', 'AI-driven product development'] },
  { name: 'Data engineering & cloud', color: '#517a9e', items: ['Data engineering (batch & real-time pipelines, data architecture)', 'Cloud: AWS, Microsoft Azure, Databricks', 'DevOps & observability: Terraform, Kubernetes, Datadog'] },
  { name: 'Data science & ML', color: '#5e9e7a', items: ['Machine Learning & Data Science (fraud detection, text analysis)', 'Competitive programming / algorithms'] },
  { name: 'Languages & code', color: '#b08a4a', items: ['Python / PySpark', 'SQL', 'JavaScript / Angular / HTML / CSS', 'C / C++ / Java'] },
  { name: 'BI & visualization', color: '#9e6a5e', items: ['BI & visualization: Tableau, Dash Enterprise, Qlik'] },
];
const HONORS = ['4th place — Brazilian Olympiad in Informatics (OBI), regional phase', 'Honorable Mention — OBMEP (Brazilian Public Schools Math Olympiad) [to confirm]', 'Poetry award — Barueri, SP', 'Courses (Alura): HTML5 & CSS3 II (40h), JavaScript (20h), Angular 2 part 2 (18h), Linux I (4h), Linux II (8h)', 'Professional certifications: none yet (on the roadmap)'];
const INTERESTS = ['Competitive programming', 'AI-based product development', 'Cooking', 'Reading (a book list will come later)', 'Going to new places with my wife', 'Spending time with my son — playing and watching him learn'];
const BEEN = ['Rio de Janeiro (Brazil)', 'Foz do Iguaçu (Brazil)', 'Buenos Aires (Argentina)', 'Los Angeles (USA)'];
const BUCKET = [['Europe', 'Italy, Portugal, Spain, France, Lithuania (where my family comes from), Poland, Czech Republic'], ['Africa', 'South Africa, Egypt'], ['Asia & Oceania', 'South Korea, China, Australia'], ['North America', 'more of the USA, Canada'], ['Central America & Caribbean', 'Mexico, the Caribbean'], ['South America', 'Uruguay, Paraguay, Chile, Ecuador, Venezuela']];
const FUN = ['My family comes from Lithuania.', '4th place at the Brazilian Olympiad in Informatics (OBI), regional phase.', 'I once won a poetry award in Barueri, SP.', "Currently learning Korean (a little)."];
const TICKER = ['Been to Foz do Iguaçu', '4th place at OBI regionals', 'Currently learning Korean', 'Often studying, sometimes teaching, always learning', 'Been to Buenos Aires', 'Lithuania is on the bucket list — my family comes from there', 'Cooking is a serious hobby', 'Been to Los Angeles', '[PLACEHOLDER] musing', 'Watching my son learn is the best part of the day'];
// Real logos live in /assets/logos (shared by versions A and B); sources in /assets/logos/SOURCES.md. file:null → labelled grey placeholder.
const LOGOS = [['TELUS Digital', 'telus-digital.svg'], ['Bain & Company', 'bain.svg'], ['BTG Pactual', 'btg-pactual.svg'], ['Banco Safra', 'safra.svg'], ['B2W Digital', 'b2w.png'], ['Deloitte', 'deloitte.svg'], ['Squid', 'squid.png'], ['InstaCarro', 'instacarro.svg'], ['ITA', 'ita.svg'], ['PUC Minas', 'puc-minas.png'], ['USP', 'usp.svg'], ['UFSCar', 'ufscar.png']];
// Derived numbers (from content.md): first job Jun 2016 → today (Sep 2026) = 10 years; 8 distinct companies; 5 degrees (ITA M.Sc. in progress, not counted); 3 countries; 2 languages (PT, EN).
const COMPANIES = [...new Set(EXP.map(e => e.short))];
const NUMBERS = [['10', 'years in tech (since 2016)'], [COMPANIES.length, 'companies'], [EDU.length, 'degrees & diplomas'], ['3', 'countries visited'], ['2', 'languages']];
// Featured projects (EN text from the lab's docs/featured-projects-content.md, verbatim; hedges like "about", "estimated",
// Lucas confirmed Claro, Pismo and Circular 3.978 on 2026-10-02; "an RPA tool" stays generic). text = card; page = [label, text]
// pairs rendered as bold lead-in paragraphs on the detail page (**bold** and `code` allowed); links = free text, URLs auto-linked.
const PROJECTS = [
  { title: 'Mission Control', meta: 'personal · 2026 – today · in development', href: 'projects/mission-control.html', text: 'My portfolio operating system: it takes an idea from capture through market research, hypothesis validation and refinement, and then tracks the project on a board and watches its deployment on GCP. Still in development, and already the tool I use every day.', tech: 'GCP, Neon (Postgres), GitHub App, Cloud Run, React frontend, TypeScript.', phDesc: 'Screenshot of the Mission Control board',
    page: [['What it is.', 'A control plane for my own project portfolio. Ideas enter with almost no friction and move through research, validation and refinement with "skills": focused agents that run on top of a project, through a chat/harness interface built for it.'], ['What I see.', 'A Kanban-style board with the stage of every project, whether it is linked to a GitHub repository, and its deployment state.'], ['Deployment control.', 'Most of my projects run on GCP. Mission Control checks that each one has the resources it needs (a bucket, a Cloud Run service, and so on) and lets me create or fix them from one place.'], ['Status.', 'In development; some features are not finished. It already governs a GitHub organization of 17 repositories through a `mission-control.yaml` in each repo and a GitHub App.']],
    links: 'Code is private. Public organization: https://github.com/Mission-Control-Hub' },
  { title: 'PhYnances', meta: 'personal · 2022', href: 'projects/phynances.html', text: 'Personal finance in one place: Python pipelines (Airflow among them) read broker statements, credit-card bills and PDF/Excel reports, then categorize and reconcile everything into a single cash-flow view.', tech: 'Python, Jupyter, Airflow, pandas', phDesc: 'Screenshot of the consolidated cash-flow view',
    page: [['Problem.', 'My money lived in a dozen statements with different formats.'], ['What I built.', 'A set of Python scripts and notebooks, orchestrated with Airflow, that ingest broker reports, credit-card expenses, PDFs and spreadsheets, normalize them, categorize entries and reconcile them against each other.'], ['Result.', 'One consolidated view of inflows and outflows, categorized and reconciled; it ran my personal finances.'], ['Status.', 'Not touched for a while; it did its job.']] },
  { title: 'Baby Health', meta: 'personal', href: 'projects/baby-health.html', text: 'Samsung Health for babies: a mobile-first PWA where parents and caretakers log water, feeding, vaccines, medication and development milestones for children from 0 to 3.', tech: 'Mobile-first PWA, Python API backend', phDesc: 'Screenshot of the Baby Health PWA',
    page: [['Idea.', 'Take what Samsung Health does for an adult and adapt it to a baby, with the parent or caretaker as the user ("Caretaker" inside the app).'], ['What it tracks.', 'Water intake, breastfeeding and meals, vaccines, medication, and development across motor, cognitive and affective dimensions.'], ['Build.', 'Mobile-first PWA with a Python API backend.'], ['Status.', 'Dormant; one of the projects I most enjoyed building.']],
    links: 'Public: https://github.com/Mission-Control-Hub/baby-health' },
  { title: 'Spot', meta: 'Bain & Company (NPS Prism) · 2023', href: 'spot.html', text: 'A data-quality gateway that compares two Tableau workbooks data point by data point via API: 4 people × 2 weeks → 1 person × 30 minutes per validation cycle, covering 100% of data points instead of a sample. It became the NPS Prism data team\'s largest product.', tech: 'Python, Tableau REST + Metadata API, pandas, stdlib concurrency' },
  { title: 'SOS: Safra\'s budgeting system', meta: 'Safra · 2020', href: 'projects/sos-safra-budgeting.html', text: 'Replaced bank-wide budgeting by spreadsheet with a web system the whole bank adopted: instant validation, calendars, and full visibility for the budget owners. I led a team of four and wrote a good part of the backend.', tech: 'Angular (v9), Node.js with TypeORM, SQL database', phDesc: 'Screenshot or diagram of the budgeting system',
    page: [['Problem.', 'Each area planned its budget (office expenses up to travel, sponsorships and philanthropy) in Excel. About 30 budget "champions" sent files to the planning area, which validated, consolidated and reconciled everything by hand and sent errors back. Slow, manual, error-prone.'], ['What we built.', '"SOS" (Sistema de Orçamento do Safra), a responsive web system on the bank\'s intranet. Users enter the budget with validation at input time, so there is no back-and-forth; the budget manager sees who filled what and when, sets calendars and deadlines, and approves; approved budgets flow to finance for release.'], ['My role.', 'Tech lead and backend developer. I coordinated a team of four (design, frontend, backend) and built the backend and the database with the other backend developer.'], ['Result.', 'The whole bank moved to it.']] },
  { title: 'Red Hat AML onboarding', meta: 'Safra · ~2020', href: 'projects/aml-onboarding-safra.html', text: 'When the Central Bank required a single, auditable view of customer onboarding across channels, I was the product owner who got eight channels, five teams and Red Hat to deliver it in just under three months.', tech: 'Red Hat Process Automation Manager (Drools/jBPM), Apache Camel', phDesc: 'Diagram of the onboarding gateway (channels → one process → regulator)',
    page: [['Trigger.', 'Central Bank of Brazil Circular 3.978/2020 on anti-money-laundering (PLD/FT) required banks to run know-your-customer and background checks under one consolidated, auditable process, whatever the channel the customer came through.'], ['What we built.', 'With Red Hat\'s team, a single onboarding gateway on Red Hat Process Automation Manager and Apache Camel, in a hexagonal architecture: every channel feeds the same process, the same rules decide, and the bank reports to the regulator from one place and can block a customer it does not trust.'], ['The rules engine.', 'Deliberately white-box. The regulator had to be able to audit the rules and look for bias, so we built a simple, explicit rules engine instead of an opaque model.'], ['My role.', 'Product owner and delivery lead; I did not write code. I coordinated eight channels spread over five teams, set the meeting cadence and the communication plan (status to each team and to the regulator), unified what had been channel-specific processes into central rules with some flexibility per team, and unblocked access, change management (the bank\'s GMD process) and other internal procedures for the Red Hat team.'], ['People.', 'Red Hat: two consultants, a scrum master, an account manager. Safra: about 14 people, from five channel teams, the AML area, my director and superintendent.'], ['Result.', 'Compliant in a little under three months, fast for the complexity involved.']] },
  { title: 'Address-resolution RPA', meta: 'Deloitte · 2018', href: 'projects/address-rpa-deloitte.html', text: 'A rules engine plus RPA that fixed bad customer addresses before invoices went to the post, saving Claro, a Brazilian telecom operator, an estimated R$1M a year in returned mail.', tech: 'Python, regex, Levenshtein, an RPA tool, Qlik', phDesc: 'Diagram of the address-resolution flow (rules → human review → RPA → dashboard)',
    page: [['Problem.', 'Customers signed up through many channels (mall kiosks, subway campaigns, the website) and addresses arrived wrong or in inconsistent forms ("R." for Rua, "AV", "DR", missing side of the street). Invoices went out by post and every returned letter cost extra. The estimate was about R$1M per year in returns, in the finance area (collections).'], ['What I built: the brain.', 'An address-resolution rules engine with roughly 12 to 20 rules, derived from empirical tests on the client\'s data: simple normalizations, regexes, then fuzzy matching with Levenshtein distance. Only when the rules could not resolve an address did a small app ask a person to correct it.'], ['What the team built: the hands.', 'An RPA bot that took the corrected address and replicated it across the client\'s systems, plus a Qlik dashboard fed in near real time so the directors could watch the process live.'], ['My role.', 'Analyst on the Deloitte side: rules engine, data analysis, dashboard; RPA training and proof of concept.'], ['Result.', 'Savings of approximately R$1M per year for the client\'s finance area (estimate at the time).']] },
  { title: 'Data lake for BTG+ payments', meta: 'BTG Pactual · 2021 – 2022', href: 'projects/btg-payments-data-lake.html', text: 'An AWS Kappa-style pipeline for BTG+ payment events. Most of it existed when I arrived; I documented it end to end, brought observability in, and proposed the file consolidation that made the daily load viable.', tech: 'AWS SNS, SQS, Lambda, S3, Glue, Aurora, Athena, EMR, PySpark, Datadog', phDesc: 'Architecture diagram: hot lane (SNS → SQS → Lambda → S3 → Glue → Aurora) and cold lane (D-1 files)',
    page: [['Context.', 'BTG\'s digital bank received payment events (Pix, TED, DOC, utility bills) from Pismo, the core-banking platform behind BTG+, through an SNS topic. The architecture aimed at two lanes: a hot lane (stream) and a cold lane (daily files).'], ['Hot lane.', 'SNS → SQS → Lambda (with a dead-letter queue) → JSON events in an S3 data lake partitioned by year/month/day → a Glue job loading an Aurora database.'], ['Cold lane.', 'The same partner delivered D-1 files by FTP; a daily job pulled them, and a reconciliation process compared the two lanes to make sure nothing was lost.'], ['Honest scope.', 'I was not the author of this architecture; a good part of it was in place when I arrived. My contributions:', ['**Documentation** of the whole platform, which did not exist.', '**Observability**: how to use Datadog to watch the pipelines and the databases (table sizes, flow, failures) and start looking at things nobody was looking at, such as processing cost and the data swamp forming in S3.', '**Small-files consolidation** (my proposal): thousands of tiny JSONs made the Aurora load slow. We measured an optimal file size of about 256 MB and designed a scheduled Lambda that sweeps the partition and merges files, with a final merge at the end of each day.', 'Supporting the move from Aurora to **Athena**, proposed by the directors: better fit for the query pattern and faster development since Glue already produced the data.']]] },
];
// Inline markup for page bullets: **bold**, `code`, bare URLs → links.
const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`(.+?)`/g, '<code>$1</code>');
const linkify = s => esc(s).replace(/https?:\/\/[^\s<]+/g, u => `<a href="${u}" rel="noopener">${u.replace(/^https?:\/\//, '')}</a>`);
const projectHtml = pr => pr.page.map(([label, text, sub]) => `<p><strong>${esc(label)}</strong> ${inline(text)}</p>${sub ? `<ul>${sub.map(s => `<li>${inline(s)}</li>`).join('')}</ul>` : ''}`).join('\n');
// Carousel: horizontal scroll-snap track + arrows + dots (js/site.js wires the controls).
const carousel = (cards) => `<div class="carousel" data-carousel>
  <button type="button" class="car-btn prev" aria-label="Previous projects">&lsaquo;</button>
  <div class="car-track" role="list">${cards.join('')}</div>
  <button type="button" class="car-btn next" aria-label="Next projects">&rsaquo;</button>
  <div class="car-dots" role="tablist" aria-label="Carousel pages"></div>
</div>`;

// ---------------- shell ----------------
const FONTS = (r) => `<style>
@font-face{font-family:'Varela Round';font-style:normal;font-weight:400;font-display:swap;src:url('${r}fonts/41b8a1d8-7942-4f45-a349-40f6d981bf6f-latin-ext.woff2') format('woff2');unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:'Varela Round';font-style:normal;font-weight:400;font-display:swap;src:url('${r}fonts/92a34b70-af15-4f19-a2b3-f11eb0299f02-vietnamese.woff2') format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}
@font-face{font-family:'Varela Round';font-style:normal;font-weight:400;font-display:swap;src:url('${r}fonts/786a1aea-210e-4065-95ba-346ca24144b1-latin.woff2') format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:'Varela Round';font-style:normal;font-weight:400;font-display:swap;src:url('${r}fonts/b6350098-b762-4c63-8e64-35528cb5850a-hebrew.woff2') format('woff2');unicode-range:U+0307-0308,U+0590-05FF,U+200C-2010,U+20AA,U+25CC,U+FB1D-FB4F}
</style>`;
const BODY_CLASS = 'page-borders-thick canvas-style-normal header-subtitle-address banner-alignment-center social-icon-style-round hide-article-author button-style-outline button-corner-style-square collection-type-page collection-layout-default mobile-style-available site-title';
const SOCIAL = `<a href="https://github.com/Lukasavicus" target="_blank" rel="noopener" class="sqs-svg-icon--wrapper github" aria-label="GitHub"><div><svg class="sqs-svg-icon--social" viewBox="0 0 64 64"><use class="sqs-use--icon" xlink:href="#github-icon"></use><use class="sqs-use--mask" xlink:href="#github-mask"></use></svg></div></a>
  <a href="https://www.linkedin.com/in/lucas-lukasavicus-silva" target="_blank" rel="noopener" class="sqs-svg-icon--wrapper linkedin" aria-label="LinkedIn"><div><svg class="sqs-svg-icon--social" viewBox="0 0 64 64"><use class="sqs-use--icon" xlink:href="#linkedin-icon"></use><use class="sqs-use--mask" xlink:href="#linkedin-mask"></use></svg></div></a>
  <a href="${MAILTO}" class="sqs-svg-icon--wrapper email" aria-label="Email"><div><svg class="sqs-svg-icon--social" viewBox="0 0 64 64"><use class="sqs-use--icon" xlink:href="#email-icon"></use><use class="sqs-use--mask" xlink:href="#email-mask"></use></svg></div></a>`;
const SYMBOLS = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display:none" data-usage="social-icons-svg"><symbol id="github-icon" viewBox="0 0 64 64"><path d="M32,16c-8.8,0-16,7.2-16,16c0,7.1,4.6,13.1,10.9,15.2c0.8,0.1,1.1-0.3,1.1-0.8c0-0.4,0-1.4,0-2.7c-4.5,1-5.4-2.1-5.4-2.1c-0.7-1.8-1.8-2.3-1.8-2.3c-1.5-1,0.1-1,0.1-1c1.6,0.1,2.5,1.6,2.5,1.6c1.4,2.4,3.7,1.7,4.7,1.3c0.1-1,0.6-1.7,1-2.1c-3.6-0.4-7.3-1.8-7.3-7.9c0-1.7,0.6-3.2,1.6-4.3c-0.2-0.4-0.7-2,0.2-4.2c0,0,1.3-0.4,4.4,1.6c1.3-0.4,2.6-0.5,4-0.5c1.4,0,2.7,0.2,4,0.5c3.1-2.1,4.4-1.6,4.4-1.6c0.9,2.2,0.3,3.8,0.2,4.2c1,1.1,1.6,2.5,1.6,4.3c0,6.1-3.7,7.5-7.3,7.9c0.6,0.5,1.1,1.5,1.1,3c0,2.1,0,3.9,0,4.4c0,0.4,0.3,0.9,1.1,0.8C43.4,45.1,48,39.1,48,32C48,23.2,40.8,16,32,16z"/></symbol><symbol id="github-mask" viewBox="0 0 64 64"><path fill-rule="evenodd" d="M0,0v64h64V0H0z M32,16c-8.8,0-16,7.2-16,16c0,7.1,4.6,13.1,10.9,15.2c0.8,0.1,1.1-0.3,1.1-0.8c0-0.4,0-1.4,0-2.7c-4.5,1-5.4-2.1-5.4-2.1c-0.7-1.8-1.8-2.3-1.8-2.3c-1.5-1,0.1-1,0.1-1c1.6,0.1,2.5,1.6,2.5,1.6c1.4,2.4,3.7,1.7,4.7,1.3c0.1-1,0.6-1.7,1-2.1c-3.6-0.4-7.3-1.8-7.3-7.9c0-1.7,0.6-3.2,1.6-4.3c-0.2-0.4-0.7-2,0.2-4.2c0,0,1.3-0.4,4.4,1.6c1.3-0.4,2.6-0.5,4-0.5c1.4,0,2.7,0.2,4,0.5c3.1-2.1,4.4-1.6,4.4-1.6c0.9,2.2,0.3,3.8,0.2,4.2c1,1.1,1.6,2.5,1.6,4.3c0,6.1-3.7,7.5-7.3,7.9c0.6,0.5,1.1,1.5,1.1,3c0,2.1,0,3.9,0,4.4c0,0.4,0.3,0.9,1.1,0.8C43.4,45.1,48,39.1,48,32C48,23.2,40.8,16,32,16z"/></symbol><symbol id="email-icon" viewBox="0 0 64 64"><path fill-rule="evenodd" d="M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z"/></symbol><symbol id="email-mask" viewBox="0 0 64 64"><path fill-rule="evenodd" d="M0,0v64h64V0H0z M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z"/></symbol><symbol id="linkedin-icon" viewBox="0 0 64 64"><path d="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z"/></symbol><symbol id="linkedin-mask" viewBox="0 0 64 64"><path d="M0,0v64h64V0H0z M25.8,44h-5.4V26.6h5.4V44z M23.1,24.3c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,1.4-3.1,3.1-3.1 c1.7,0,3.1,1.4,3.1,3.1C26.2,22.9,24.8,24.3,23.1,24.3z M46,44h-5.4v-8.4c0-2,0-4.6-2.8-4.6c-2.8,0-3.2,2.2-3.2,4.5V44h-5.4V26.6 h5.2V29h0.1c0.7-1.4,2.5-2.8,5.1-2.8c5.5,0,6.5,3.6,6.5,8.3V44z"/></symbol></svg>`;

function navList(r, active, cls) {
  return `<nav class="main-nav${cls}"><ul>${NAV.map(([h, t]) => `<li class="page-collection${active === h ? ' active-link' : ''}"><a href="${abs(h)}">${t}</a></li>`).join('')}</ul>${cls ? '' : '<div class="page-divider"></div>'}</nav>`;
}
function footer(r) {
  const col = (title, items) => `<div><h3>${title}</h3><ul>${items.map(([h, t, extra]) => `<li><a href="${h}"${extra || ''}>${t}</a></li>`).join('')}</ul></div>`;
  return `<div class="info-footer-wrapper clear"><div class="info-footer">
  <div id="socialLinks" class="social-links sqs-svg-icon--list">${SOCIAL}</div>
</div></div>
<footer id="footer" class="clear">
  <h3 class="explore">Explore the site</h3>
  <p class="search"><label><span class="sr">Search the site map</span><input type="search" id="sitesearch" placeholder="Search pages…" autocomplete="off"></label></p>
  <div class="sitemap" id="sitemap">
    ${col('Main', NAV.map(([h, t]) => [abs(h), t]))}
    ${col('More', [['/code-shop.html', 'Code Shop'], ['/faq.html', 'FAQ'], ['#', 'Résumé (PDF)', ' title="PDF coming soon"'], ['#', 'Tip jar', ' title="coming soon"'], ['/llms.txt', 'This site as markdown'], ['/research/', 'Research']])}
    ${col('Meta', [['/404.html', '404'], ['https://callieschweitzer.com/', 'Design inspired by callieschweitzer.com', ' target="_blank" rel="noopener"'], ['/b/', 'Version B'], ['/2016/', '2016 version'], ['/contact.html', 'Contact']])}
  </div>
  <p class="nomatch" id="nomatch" hidden>No page matches that.</p>
  <p class="copy-line">© 2026 Lucas Lukasavicus · <button type="button" id="darktoggle" class="linklike" aria-pressed="false">Dark mode</button></p>
</footer>`;
}
// page: {file, title, body, nav (active href), heroTitle, bodyClass, depth, root (overrides depth), head}
function shell(p) {
  const r = p.root || (p.depth ? '../' : '');
  const navIdx = NAV.findIndex(([h]) => h === p.nav);
  const home = p.file === 'index.html';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${p.title ? (p.raw ? p.title : esc(p.title)) + ' — ' : ''}Lucas Lukasavicus</title>
<meta name="description" content="${esc(p.desc || 'Lucas Lukasavicus — AI Leader & Tech Innovator. Often studying, sometimes teaching, always learning.')}">
${FONTS(r)}
<link rel="stylesheet" href="${r}css/site.css"><link rel="stylesheet" href="${r}css/custom.css">
<style>body,p,nav li,li{font-size:18px !important}body,p{color:hsl(0,0%,27%) !important}ul{line-height:1.7 !important}h1.logo{font-size:26px !important}.site-info{display:none !important}</style>
${p.head || ''}
</head>
<body class="${BODY_CLASS}${home ? ' homepage hide-page-title' : ''}${p.bodyClass ? ' ' + p.bodyClass : ''}" data-nav="${navIdx}" data-root="${r}">
<a class="skip" href="#page">Skip to content</a>
<div id="progress" aria-hidden="true"></div>
<div id="canvas">
  <div id="mobileNav"><div class="wrapper">${navList(r, p.nav, ' mobileNav')}</div></div>
  <div id="mobileMenuLink"><a role="button" aria-label="Menu" aria-controls="mobileNav" aria-expanded="false">&#9776;</a></div>
  <header id="header" class="clear">
    <div id="upper-logo"><h1 class="logo"><a href="/">Lucas Lukasavicus</a></h1></div>
    <div class="lang" aria-label="Language"><a href="#" aria-current="true">EN</a> · <span title="coming soon" aria-disabled="true">PT</span></div>
  </header>
  <div id="topNav">${navList(r, p.nav, '')}</div>
  <div class="page-divider top-divider"></div>
  ${p.heroTitle ? `<div id="hero"><div class="wrapper"><h1 class="page-title">${esc(p.heroTitle)}</h1></div></div>` : ''}
  <section id="page" class="clear${p.pageClass ? ' ' + p.pageClass : ''}" role="main" tabindex="-1">
    <div class="sqs-layout sqs-grid-12 columns-12" data-type="page"><div class="row sqs-row"><div class="col sqs-col-12 span-12"><div class="sqs-block html-block sqs-block-html"><div class="sqs-block-content"><div class="sqs-html-content">
${p.body}
    </div></div></div></div></div></div>
  </section>
  ${footer(r)}
</div>
${SYMBOLS}
<a class="fab" href="${MAILTO}" title="Let's grab a coffee"><span>Let's grab a coffee</span> &#9749;</a>
<button type="button" id="totop" aria-label="Back to top" hidden>&uarr;</button>
<script src="${r}js/site.js" defer></script>
</body>
</html>
`;
}
const ph = (cls, label, desc) => `<div class="ph ${cls}"><b>${label}</b><span>${desc}</span></div>`;
const share = `<div class="share"><span>Share:</span> <button type="button" data-share="copy">Copy link</button> <a href="#" data-share="linkedin" target="_blank" rel="noopener">LinkedIn</a> <a href="#" data-share="x" target="_blank" rel="noopener">X</a></div>`;
const write = (file, html) => { const f = path.join(OUT, file); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, html); console.log('wrote', file); };

// ---------------- home ----------------
// Gantt-style bars: axis 2016 → 2027 (so the "Present" bar, ending 2026.75, has room). One bar per company
// (roles merged: first start → last end), linking to the first role there. Stints under 6 months go to a thin
// strip below the main lane, labels alternating below/above so InstaCarro and Squid don't collide.
const T0 = 2016, T1 = 2027, tlYears = Array.from({ length: T1 - T0 }, (_, i) => T0 + i);
const pct = y => ((Math.max(y, T0) - T0) / (T1 - T0) * 100).toFixed(2);
const bar = (cls, href, title, label, s, e) => `<a role="listitem" class="tl-bar ${cls}" style="left:${pct(s)}%;width:${(pct(e) - pct(s)).toFixed(2)}%" href="${href}" title="${esc(title)}"><span>${esc(label)}</span></a>`;
const byCo = COMPANIES.map(c => { const rs = EXP.filter(e => e.short === c).sort((a, b) => a.start - b.start), last = rs[rs.length - 1]; return { short: c, first: rs[0], start: rs[0].start, end: Math.max(...rs.map(r => r.end)), title: `${rs.map(r => r.role).join(' → ')} · ${rs[0].period.split(' – ')[0]} – ${last.period.split(' – ')[1]}` }; });
const edus = EDU.filter(e => e.end > T0);
const isShort = c => c.end - c.start < 0.5;
const workBar = (c, cls) => bar(cls, `experience/${c.first.slug}.html`, c.title, c.short, c.start, c.end);
const timelineH = `<div class="tl-h-wrap"><div class="tl-h" role="list" aria-label="Career timeline 2016–2026">
  ${tlYears.map(y => `<i class="tl-h-grid" style="left:${pct(y)}%"></i>`).join('')}
  <div class="tl-lane"><b>Schools</b>${edus.map(e => bar('edu', `education/${e.slug}.html`, `${e.degree} · ${e.period}`, e.short, e.start, e.end)).join('')}</div>
  <div class="tl-lane"><b>Companies</b>${byCo.filter(c => !isShort(c)).map(c => workBar(c, 'work')).join('')}</div>
  <div class="tl-lane tl-lane-thin">${byCo.filter(isShort).map((c, i) => workBar(c, i % 2 ? 'thin up' : 'thin dn')).join('')}</div>
  <div class="tl-axis">${tlYears.map(y => `<span style="left:${pct(y)}%">${y}</span>`).join('')}</div>
</div></div>`;
const SHOW_TESTIMONIALS = false; // false → the section is still emitted, but inside an HTML comment
const homeBody = `
<section id="hero-sec" class="hero">
  <img class="avatar" src="assets/lucas-pro.jpg" width="160" height="160" alt="Lucas Lukasavicus">
  <h2 class="hero-name">Lucas Lukasavicus</h2>
  <p class="hero-headline">AI Leader &amp; Tech Innovator</p>
  <p class="motto">Often studying, sometimes teaching, always learning.</p>
  <p class="ctas"><a class="btn" href="projects.html">See my projects</a> <a class="btn" href="about.html">Read my story</a> <a class="btn btn-primary" href="contact.html">Let's grab a coffee</a></p>
  <ul class="ticker" aria-live="polite" aria-label="Loading-screen style fun facts">${TICKER.map((t, i) => `<li${i ? '' : ' class="on"'}>${esc(t)}</li>`).join('')}</ul>
</section>
<section id="facts">
  <p class="badges"><span>2 MBAs</span><span>2 languages</span><span>${COMPANIES.length} companies</span><span>10 years in tech</span></p>
</section>
<section id="pillars">
  <h3>What I'm about</h3>
  <p class="pillars-p">As an <strong>AI Leader</strong>, I enjoy being around highly skilled people who challenge my views — and I've had the privilege of leading people like that. As a <strong>Tech Innovator</strong>, I use technology not as an end, but as a means — an extremely powerful tool to reach business goals, whether they are concrete or fuzzy. And as a <strong>Lifelong Learner</strong>, I thrive in environments where I have to reinvent myself: where the questions haven't been asked yet and the answers don't exist yet.</p>
</section>
<section id="featured">
  <h3>Featured projects</h3>
  ${carousel(PROJECTS.map(pr => `<a class="card" role="listitem" href="${pr.href}">${ph('ph-small', 'Imagem · projeto', esc(pr.title))}<h4>${esc(pr.title)}</h4><p class="meta">${esc(pr.meta)}</p></a>`))}
  <p class="more"><a href="projects.html">View all projects &rarr;</a></p>
</section>
<section id="career">
  <h3>Experience &amp; Education</h3>
  <p class="center">Ten years, ${COMPANIES.length} companies, ${EDU.length} diplomas — from a growth-hacking internship to leading Data &amp; AI teams.</p>
  ${timelineH}
  <p class="more"><a href="experience.html">Full timeline &rarr;</a></p>
</section>
<section id="logos">
  <h3>Companies &amp; schools</h3>
  <div class="logos">${LOGOS.map(([l, f]) => f ? `<span class="logo" title="${esc(l)}"><img src="assets/logos/${f}" alt="${esc(l)}" loading="lazy"></span>` : `<div class="ph ph-logo"><b>Logo</b><span>${esc(l)}</span></div>`).join('')}</div>
</section>
<section id="numbers">
  <h3>A few numbers</h3>
  <div class="numbers">${NUMBERS.map(([n, l]) => `<div><strong>${n}</strong><span>${esc(l)}</span></div>`).join('')}</div>
</section>
<section id="interests-teaser">
  <h3>Off the clock</h3>
  <p class="center">Competitive programming, cooking, reading, going to new places with my wife, and watching my son learn.</p>
  <p class="more"><a href="personal.html">Get to know me better &rarr;</a></p>
</section>
${SHOW_TESTIMONIALS ? '' : '<!-- testimonials: hidden until there are real quotes (SHOW_TESTIMONIALS in _build/build.js)\n'}<section id="testimonials">
  <h3>Testimonials</h3>
  <div class="cols3">${[1, 2, 3].map(() => ph('ph-small', 'Placeholder · Depoimento', '[PLACEHOLDER] quote, name and role')).join('')}</div>
</section>${SHOW_TESTIMONIALS ? '' : '\n-->'}
<section id="cta" class="cta">
  <h3>Let's grab a coffee and talk ideas.</h3>
  <p class="ctas"><a class="btn btn-primary" href="contact.html">Get in touch</a></p>
</section>`;
write('index.html', shell({ file: 'index.html', nav: 'index.html', bodyClass: 'wide', body: homeBody }));

// ---------------- about ----------------
const aboutBody = `
<section id="story">
  <img class="fun" src="assets/lucas-casual.jpg" width="640" height="640" alt="Lucas, casual portrait">
  ${ABOUT.map(p => `<p>${esc(p)}</p>`).join('')}
  <p class="langs">Portuguese (native) · English (full professional) · Korean (beginner) · Spanish &amp; Italian (interested)</p>
</section>
<section id="education">
  <h3>Education</h3>
  <!-- M.Sc. Data Science · ITA · 2022 – (in progress; intentionally not listed until concluded) -->
  <ul class="plain">${EDU.map(e => `<li><a href="education/${e.slug}.html"><strong>${esc(e.degree)}</strong></a> — ${esc(e.school)} — ${esc(e.period)}</li>`).join('')}</ul>
</section>
<section id="skills">
  <h3>Skills</h3>
  <p>Scored 0–10 using the "How It's Calculated" heuristic. Scores are [PLACEHOLDER]. <a href="#" data-open="howcalc">How it's calculated</a></p>
  ${SKILL_GROUPS.map(g => `<div class="skill-group" style="--g:${g.color}"><h4>${esc(g.name)}</h4><ul class="skills">${g.items.map(s => `<li>${esc(s)} <span>[PLACEHOLDER]/10</span></li>`).join('')}</ul></div>`).join('')}
  <dialog id="howcalc" class="modal">
    <h3>How It's Calculated</h3>
    <p>Each skill's score (0–10) combines two axes:</p>
    <ol><li><strong>Time</strong> — how long I've actually worked with or studied the subject.</li><li><strong>Coverage</strong> — every topic in the domain is listed (e.g., for C: pointers, memory management, the preprocessor, and so on), and each one is checked as mastered or not.</li></ol>
    <p>Proven time plus the share of topics mastered gives the score.</p>
    <form method="dialog"><button class="btn">Close</button></form>
  </dialog>
</section>
<section id="honors">
  <h3>Honors &amp; Awards</h3>
  <ul>${HONORS.map(h => `<li>${esc(h)}</li>`).join('')}</ul>
</section>
<section id="resume">
  <h3>Résumé</h3>
  <p><a class="btn" href="#" title="PDF coming soon">Download résumé (PDF)</a> <small>[PLACEHOLDER — PDF not uploaded yet]</small></p>
</section>`;
write('about.html', shell({ file: 'about.html', title: 'About', nav: 'about.html', heroTitle: 'About', body: aboutBody }));

// ---------------- experience ----------------
const tlV = (items) => `<ol class="tl-v">${items.join('')}</ol>`;
const expBody = `
<section id="work">
  <h3>Work</h3>
  ${tlV(EXP.map(e => `<li><span class="when">${esc(e.period)}</span><a href="experience/${e.slug}.html"><strong>${esc(e.role)}</strong></a> · ${esc(e.co)}${roleHtml(e)}<p class="tech"><strong>Tech:</strong> ${esc(e.tech)}</p></li>`))}
  <p class="more"><a href="about.html#education">Education &rarr;</a></p>
</section>`;
write('experience.html', shell({ file: 'experience.html', title: 'Experience', nav: 'experience.html', heroTitle: 'Experience', bodyClass: 'wide', body: expBody }));

// ---------------- detail pages ----------------
function detail({ file, title, meta, paras, html, tech, links, back, backLabel, nav, phDesc }) {
  const body = `
<p class="back"><a href="${back}">&larr; ${backLabel}</a></p>
<h2 class="case-title">${esc(title)}</h2>
<p class="meta">${esc(meta)}</p>
${ph('ph-mid', 'Imagem · logo/foto do projeto', phDesc)}
${html || paras.map(p => `<p>${esc(p)}</p>`).join('')}
<p class="tech"><strong>Tech:</strong> ${esc(tech)}</p>
${links ? `<p class="links"><strong>Links:</strong> ${linkify(links)}</p>\n` : ''}${share}
<p class="back"><a href="${back}">&larr; Back</a></p>`;
  write(file, shell({ file, title, nav, pageClass: 'case', depth: 1, body }));
}
EXP.forEach(e => detail({ file: `experience/${e.slug}.html`, title: e.role, meta: `${e.co} · ${e.period}`, html: roleHtml(e), tech: e.tech, back: '../experience.html', backLabel: 'Experience', nav: 'experience.html', phDesc: `Logo of ${e.short} or a photo from this period` }));
EDU.forEach(e => detail({ file: `education/${e.slug}.html`, title: e.degree, meta: `${e.school} · ${e.period}`, paras: ['[PLACEHOLDER] What I studied, thesis or final project, and what stayed with me.'], tech: '[PLACEHOLDER]', back: '../about.html#education', backLabel: 'About · Education', nav: 'about.html', phDesc: `Logo of ${e.short}` }));
// Project detail pages (Spot has its own case study, spot.html): page bullets as bold lead-in paragraphs, then Tech (stack), then Links.
PROJECTS.filter(pr => pr.href.startsWith('projects/')).forEach(pr => detail({ file: pr.href, title: pr.title, meta: pr.meta === 'personal' ? 'Personal project' : pr.meta, html: projectHtml(pr), tech: pr.tech, links: pr.links, back: '../projects.html', backLabel: 'Projects', nav: 'projects.html', phDesc: pr.phDesc }));

// ---------------- projects ----------------
const projBody = `<section id="projects-list">${carousel(PROJECTS.map(pr => `<div class="card" role="listitem">${ph('ph-small', 'Imagem · projeto', esc(pr.title))}<h4><a href="${pr.href}">${esc(pr.title)}</a></h4><p class="meta">${esc(pr.meta)}</p><p>${esc(pr.text)}</p><p class="tech"><strong>Tech:</strong> ${esc(pr.tech)}</p><p><a href="${pr.href}">Read more &rarr;</a></p></div>`))}</section>`;
write('projects.html', shell({ file: 'projects.html', title: 'Projects', nav: 'projects.html', heroTitle: 'Projects', bodyClass: 'wide', body: projBody }));

// ---------------- personal ----------------
const personalBody = `
<p class="center">A page to get to know me a bit better.</p>
<section id="interests"><h3>Interests</h3><ul>${INTERESTS.map(i => `<li>${esc(i)}</li>`).join('')}</ul></section>
<section id="travel"><h3>Travel</h3>
  <p><strong>Been there:</strong> ${BEEN.map(esc).join(', ')}</p>
  ${ph('ph-wide', 'Mapa · lugares visitados', 'World map with pins on ' + BEEN.map(b => b.split(' (')[0]).join(', '))}
  <p><strong>Bucket list</strong> (especially the natural side of each place):</p>
  <ul>${BUCKET.map(([k, v]) => `<li><strong>${esc(k)}:</strong> ${esc(v)}</li>`).join('')}</ul>
</section>
<section id="photography"><h3>Photography</h3><p>[PLACEHOLDER — photos to come]</p><div class="grid3">${[1, 2, 3, 4, 5, 6].map(i => ph('ph-small', 'Foto', `Photo ${i}`)).join('')}</div></section>
<section id="musings"><h3>Musings</h3><div class="cols3">${[1, 2, 3].map(() => ph('ph-small', 'Nota', '[PLACEHOLDER] musing')).join('')}</div></section>
<section id="fun-facts"><h3>Fun facts</h3><ul>${FUN.map(f => `<li>${esc(f)}</li>`).join('')}</ul></section>`;
write('personal.html', shell({ file: 'personal.html', title: 'Personal', nav: 'personal.html', heroTitle: 'Personal', bodyClass: 'wide', body: personalBody }));

// ---------------- contact ----------------
const contactBody = `
<section id="contact-form">
  <p class="center">Let's grab a coffee and talk ideas.</p>
  <form id="mailform" class="mailform" action="${MAILTO}" method="get">
    <label>Name<input name="name" required autocomplete="name"></label>
    <label>Email<input name="email" type="email" required autocomplete="email"></label>
    <label>Message<textarea name="message" rows="6" required></textarea></label>
    <p class="ctas"><button class="btn btn-primary" type="submit">Send via your email app</button></p>
    <p class="hint">Opens your email client with the message addressed to <a href="${MAILTO}">lukasavicus@gmail.com</a>.</p>
  </form>
</section>
<section id="elsewhere">
  <h3>Elsewhere</h3>
  <p class="center"><a href="https://github.com/Lukasavicus" target="_blank" rel="noopener">github.com/Lukasavicus</a> · <a href="https://www.linkedin.com/in/lucas-lukasavicus-silva" target="_blank" rel="noopener">linkedin.com/in/lucas-lukasavicus-silva</a></p>
  <div class="social-links sqs-svg-icon--list center">${SOCIAL}</div>
</section>`;
write('contact.html', shell({ file: 'contact.html', title: 'Contact', nav: 'contact.html', heroTitle: 'Contact', body: contactBody }));

// ---------------- footer-only pages ----------------
const snippets = [['retry_with_backoff.py', 'Retry with exponential backoff, no dependencies.', `def retry(fn, tries=3, delay=1):
    for i in range(tries):
        try:
            return fn()
        except Exception:
            time.sleep(delay * (2 ** i))
    raise RuntimeError("all retries failed")`], ['debounce.ts', 'Function debounce without lodash.', `function debounce(fn: Function, ms = 300) {
  let t: any;
  return (...args: any[]) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}`]];
const shopBody = `<p class="center">Free snippets. [PLACEHOLDER — sample snippets until real ones are chosen]</p>
${snippets.map(([n, d, c]) => `<section class="snippet"><h3>${esc(n)}</h3><p>${esc(d)}</p><div class="codebox"><button type="button" class="copy" data-copy>Copy</button><pre><code>${esc(c)}</code></pre></div></section>`).join('')}`;
write('code-shop.html', shell({ file: 'code-shop.html', title: 'Code Shop', nav: '', heroTitle: 'Code Shop', body: shopBody }));

const FAQ = ['Can I hire you?', "What's Mission Control?", 'What is Spot?', 'Which stack do you work with?', 'Can we grab that coffee remotely?'];
const faqBody = `<section id="faq">${FAQ.map(q => `<details><summary>${esc(q)}</summary><p>[PLACEHOLDER]</p></details>`).join('')}</section>`;
write('faq.html', shell({ file: 'faq.html', title: 'FAQ', nav: '', heroTitle: 'FAQ', body: faqBody }));

const nfBody = `<section id="nf" class="center">
  <p class="big">404</p>
  <p>This page is like my professional certifications: none yet, on the roadmap.</p>
  <p>Often studying, sometimes teaching, <em>occasionally mistyping URLs</em>.</p>
  <p class="ctas"><a class="btn btn-primary" href="index.html">Take me home</a> <a class="btn" href="projects.html">See projects instead</a></p>
</section>`;
write('404.html', shell({ file: '404.html', title: 'Page not found', nav: '', heroTitle: 'Not found', body: nfBody }));

// ---------------- spot (existing case study, re-wrapped) ----------------
let spotBody = fs.readFileSync(path.join(__dirname, 'spot-body.html'), 'utf8').trim();
spotBody = spotBody.replace(/<p class="back"><a href="projects.html">&larr; Back to Projects<\/a><\/p>\s*$/, share + '\n<p class="back"><a href="projects.html">&larr; Back to Projects</a></p>');
write('spot.html', shell({ file: 'spot.html', title: 'Spot — case study', nav: 'projects.html', heroTitle: 'Work Examples', pageClass: 'case', body: spotBody }));

// ---------------- llms.txt (machine-readable version) ----------------
const md = `Machine-readable version of lukasavicus.github.io

# Lucas Lukasavicus
AI Leader & Tech Innovator — Often studying, sometimes teaching, always learning.

## About
${ABOUT.join('\n\n')}

## Experience
${EXP.map(e => `- **${e.role}** — ${e.co} — ${e.period}\n${(e.cvText || e.body).map(b => `  - ${b}`).join('\n')}\n  Tech: ${e.tech}`).join('\n')}

## Education
${EDU.map(e => `- **${e.degree}** — ${e.school} — ${e.period}`).join('\n')}

## Skills
Scored 0–10 using the "How It's Calculated" heuristic. Scores are [PLACEHOLDER].
${SKILL_GROUPS.map(g => `### ${g.name}\n${g.items.map(s => `- ${s} — [PLACEHOLDER]/10`).join('\n')}`).join('\n\n')}

### How It's Calculated
Each skill's score (0–10) combines two axes:
1. **Time** — how long I've actually worked with or studied the subject.
2. **Coverage** — every topic in the domain is listed and each one is checked as mastered or not.
Proven time plus the share of topics mastered gives the score.

## Projects
${PROJECTS.map(p => `- **${p.title}** — ${p.meta}\n  ${p.text}\n  Tech: ${p.tech}`).join('\n')}

## Interests
${INTERESTS.map(i => `- ${i}`).join('\n')}

## Travel
**Been there:** ${BEEN.join(', ')}
**Bucket list:**
${BUCKET.map(([k, v]) => `- **${k}:** ${v}`).join('\n')}

## Honors & Awards
${HONORS.map(h => `- ${h}`).join('\n')}

## Languages
Portuguese (native) · English (full professional) · Korean (beginner) · Spanish, Italian (interested)

## Contact
- Email: lukasavicus@gmail.com
- GitHub: https://github.com/Lukasavicus
- LinkedIn: https://www.linkedin.com/in/lucas-lukasavicus-silva
`;
write('llms.txt', md);

// ---------------- Jekyll layout (articles/, research/) — same shell, absolute asset paths ----------------
write('_layouts/default.html', shell({ file: '_layouts/default.html', raw: true, title: '{{ page.title }}', nav: 'articles/', pageClass: 'case', root: '/', head: '<!-- analytics: GoatCounter snippet goes here -->', body: '<h2 class="case-title">{{ page.title }}</h2>\n{{ content }}' }));
