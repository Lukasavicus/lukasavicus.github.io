#!/usr/bin/env python3
"""One-off: closes the A/B parity gaps in b/ (static HTML). Idempotent-ish: skips patches already applied."""
import json, re, subprocess, os, html, datetime
ROOT = '/Users/lucassilva/Documents/90.LUKE/2.PROJECTS/lukasavicus.github.io'
B = ROOT + '/b'
HERE = os.path.dirname(os.path.abspath(__file__))
D = json.loads(subprocess.check_output(['node', HERE + '/data.js', ROOT + '/_build/build.js']))
esc = lambda s: html.escape(str(s), quote=False)
PAGES = ['404', 'about', 'code-shop', 'contact', 'experience', 'faq', 'index', 'personal', 'projects']
NOW = (2026, 10)
MON = {m: i + 1 for i, m in enumerate('Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split())}

def rd(p): return open(p, encoding='utf-8').read()
def wr(p, s):
    os.makedirs(os.path.dirname(p), exist_ok=True); open(p, 'w', encoding='utf-8').write(s); print('wrote', os.path.relpath(p, ROOT))

def sub1(s, pat, rep, flags=0, n=1, name=''):
    """regex replace that must hit exactly n times"""
    out, k = re.subn(pat, rep, s, flags=flags)
    assert k == n, f'{name or pat[:40]}: expected {n} hits, got {k}'
    return out

def duration(period):
    """'Jun 2024 – Sep 2026' → '2 yrs 4 mo'; '2010 – 2011' → '2 yrs'; '… – Present' → ''"""
    a, b = [x.strip() for x in period.split('–')]
    if b == 'Present': return ''
    def ym(x):
        p = x.split(); return (int(p[-1]), MON[p[0]] if len(p) == 2 else None)
    (y1, m1), (y2, m2) = ym(a), ym(b)
    if m1 is None: return f'{y2 - y1 + 1} yrs'
    n = (y2 - y1) * 12 + (m2 - m1) + 1
    y, m = divmod(n, 12)
    return ' '.join(filter(None, [f'{y} yr{"s" if y > 1 else ""}' if y else '', f'{m} mo' if m else '']))

# ---------------------------------------------------------------- 1. patch existing pages
ART_PILL = '<a href="/articles/" class="flex items-center gap-1 rounded-[10px] px-3 py-1.5 transition-colors duration-200 hover:bg-[#F2F0E9]" data-astro-cid-vlafu3dg> Articles </a>'
ART_DOCK = ('<a href="/articles/" aria-label="Articles" class="flex min-w-[44px] flex-col items-center justify-center gap-0.5 py-1" style="color:#A9A29A" data-astro-cid-7y3ofein> '
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v6h6M8 13h8M8 17h6"/></svg> '
            '<span class="font-mukta text-[10px]/[12px] font-medium text-[#A9A29A]" data-astro-cid-7y3ofein> Articles </span> </a>')
LANG = '<span class="lang" aria-label="Language"><a href="#" aria-current="true">EN</a> · <span title="coming soon" aria-disabled="true">PT</span></span>'
SEARCH = '<p class="fsearch"><label><span class="sr-only">Search the site map</span><input type="search" id="sitesearch" placeholder="Search pages…" autocomplete="off"></label></p>'
NOMATCH = '<p class="nomatch" id="nomatch" hidden>No page matches that.</p>'
DARK = '<button type="button" id="darktoggle" class="linklike" aria-pressed="false">Dark mode</button>'

def patch_shell(s):
    if '/articles/' in s: return s  # already done
    # nav pill
    s = sub1(s, r'(<a href="projects\.html"[^>]*> Projects </a>)', r'\1' + ART_PILL, name='pill')
    # open header (home only)
    s = re.sub(r'(<a href="projects\.html" data-astro-cid-vlafu3dg>Projects</a>)', r'\1<a href="/articles/" data-astro-cid-vlafu3dg>Articles</a>', s)
    # tab dock
    s = sub1(s, r'(<a href="projects\.html" aria-label="Projects".*? Projects </span> </a>)', r'\1' + ART_DOCK, flags=re.S, name='dock')
    # footer sitemap
    s = sub1(s, r'(<a href="projects\.html">Projects</a>)', r'\1<a href="/articles/">Articles</a>', name='sitemap')
    # EN · PT in the pill
    s = sub1(s, r'(<div class="pill-cta pr-0\.5")', LANG.replace('class="lang"', 'class="lang" data-astro-cid-vlafu3dg') + r' \1', name='lang')
    # footer: search above the sitemap, no-match line below, dark toggle + lang in the copyright line
    i = s.index('<nav aria-label="Footer" class="sitemap"'); j = s.index('</nav>', i) + 6
    s = s[:i] + SEARCH + s[i:j] + NOMATCH + s[j:]
    s = sub1(s, r'© 2026 Lucas Lukasavicus Silva\. All rights reserved\. ', r'© 2026 Lucas Lukasavicus Silva. All rights reserved. · ' + DARK + ' · ' + LANG + ' ', name='copy')
    return s

for p in PAGES:
    f = f'{B}/{p}.html'; s = rd(f); s2 = patch_shell(s)
    if s2 != s: wr(f, s2)

# footer sitemap, 4th column "Pages": every detail page, so the search finds Spot, roles, projects, schools and articles.
# Hidden by default; assets/site.js shows it only while a query is typed. Same list as build.js footer().
POSTS = [('/articles/' + re.sub(r'^\d{4}-\d{2}-\d{2}-', '', f)[:-3] + '/', re.search(r'^title:\s*"?(.+?)"?\s*$', rd(f'{ROOT}/_posts/{f}'), re.M).group(1))
         for f in sorted(os.listdir(ROOT + '/_posts')) if f.endswith('.md')]
PAGE_LINKS = ([(pr['href'], pr['title']) for pr in D['PROJECTS']] + [(f'experience/{e["slug"]}.html', f'{e["role"]} · {e["short"]}') for e in D['EXP']]
              + [(f'education/{e["slug"]}.html', f'{e["degree"]} · {e["short"]}') for e in D['EDU']] + POSTS)
PAGES_COL = '<div class="pages" hidden><h4>Pages</h4>' + ''.join(f'<a href="{h}">{esc(t)}</a>' for h, t in PAGE_LINKS) + '</div>'
for p in PAGES:
    f = f'{B}/{p}.html'; s = rd(f)
    if 'class="pages"' in s: continue
    i = s.index('<nav aria-label="Footer" class="sitemap"'); j = s.index('</nav>', i)
    wr(f, s[:j] + PAGES_COL + s[j:])

# links from the lists to the detail pages
s = rd(f'{B}/experience.html')
if 'experience/' not in s:
    for e in D['EXP']:
        s = sub1(s, re.escape(f'<li><h3>{esc(e["role"])}</h3>'), f'<li><h3><a href="experience/{e["slug"]}.html">{esc(e["role"])}</a></h3>', name=e['slug'])
    for e in D['EDU']:
        s = sub1(s, re.escape(f'<li class="edu"><h3>{esc(e["degree"])}</h3>'), f'<li class="edu"><h3><a href="education/{e["slug"]}.html">{esc(e["degree"])}</a></h3>', name=e['slug'])
    wr(f'{B}/experience.html', s)
s = rd(f'{B}/about.html')
if 'education/' not in s:
    for e in D['EDU']:
        s = sub1(s, re.escape(f'<li class="edu"><h3>{esc(e["degree"])}</h3>'), f'<li class="edu"><h3><a href="education/{e["slug"]}.html">{esc(e["degree"])}</a></h3>', name=e['slug'])
    wr(f'{B}/about.html', s)
s = rd(f'{B}/projects.html')
if 'spot.html' not in s:
    s = sub1(s, r'<p class="muted" style="margin:10px 0 0;font-size:13px">Full case study \(PT\): \[PLACEHOLDER link\]</p>',
             '<p style="margin:12px 0 0"><a href="spot.html" class="more-link" style="margin:0">Full case study →</a></p>', name='spot link')
    # B's card titles → A's slugs (B calls the third one "Ingestion framework")
    for title, pr in [('Mission Control', D['PROJECTS'][0]), ('Data Platform', D['PROJECTS'][2]), ('Ingestion framework', D['PROJECTS'][3])]:
        s = sub1(s, re.escape(f'<h3 style="font-size:24px;line-height:30px;font-family:Fraunces,serif">{title}</h3>'),
                 f'<h3 style="font-size:24px;line-height:30px;font-family:Fraunces,serif"><a href="{pr["href"]}">{title}</a></h3>', name=title)
        s = sub1(s, r'(Tech: ' + re.escape(esc(pr['tech']) if title != 'Ingestion framework' else 'AWS (EMR, Lambda), PySpark, Datadog') + r'</p>)',
                 r'\1' + f'<p style="margin:12px 0 0"><a href="{pr["href"]}" class="more-link" style="margin:0">Read more →</a></p>', name=title + ' more')
    wr(f'{B}/projects.html', s)
s = rd(f'{B}/index.html')
if 'spot.html' not in s:
    chip = 'Tech: Python, Tableau REST + Metadata API, pandas, stdlib concurrency</div></div>'
    i = s.index(chip) + len(chip)  # first hit = mobile accordion (a <div>, so a link is valid here)
    s = s[:i] + '<a href="spot.html" class="pj-more" style="margin:0">Full case study →</a>' + s[i:]
    # desktop card is a <button>: keep it valid by placing the link next to it, over the free bottom-left corner
    i = s.index('<button type="button" data-open="1"'); j = s.index('<button type="button" data-open="2"')
    s = s[:i] + '<div class="relative flex">' + s[i:j] + '<a href="spot.html" class="pj-more absolute bottom-6 left-8" style="margin:0">Full case study →</a></div>' + s[j:]
    wr(f'{B}/index.html', s)

# ---------------------------------------------------------------- 2. detail pages + spot, from the patched shells
def shell(page, depth):
    s = rd(f'{B}/{page}.html')
    i = s.index('<main id="main" class="relative">'); j = s.index('</main>') + 7
    head, tail = s[:i], s[j:]
    if depth:
        fix = lambda t: re.sub(r'(href|src)="(?!https?:|mailto:|/|#|data:)([^"]*)"', r'\1="../\2"', t)
        head, tail = fix(head), fix(tail)
    return head, tail

SHARE = '<div class="share"><span>Share:</span> <button type="button" data-share="copy">Copy link</button> <a href="#" data-share="linkedin" target="_blank" rel="noopener">LinkedIn</a> <a href="#" data-share="x" target="_blank" rel="noopener">X</a></div>'
ph = lambda cls, label, desc: f'<div class="ph {cls}"><b>{label}</b><span>{esc(desc)}</span></div>'

def page(file, parent, title, desc, main):
    head, tail = shell(parent, '/' in file)
    head = sub1(head, r'<title>.*?</title>', f'<title>{esc(title)} · Lucas Lukasavicus</title>', name='title')
    head = sub1(head, r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{html.escape(desc)}">', name='desc')
    wr(f'{B}/{file}', head + '<main id="main" class="relative">' + main + '</main>' + tail)

def detail(file, parent, kick, title, meta, body_html, tech, back, back_label, ph_desc, after=''):
    main = (f'<section class="page-hero"><p class="kick">{kick}</p><h1>{esc(title)}</h1><p>{esc(meta)}</p></section>'
            f'<div class="page"><section class="detail">'
            f'<p class="back"><a href="{back}">&larr; {back_label}</a></p>'
            + ph('ph-mid', 'Placeholder · Imagem', ph_desc) + body_html +
            f'<p class="tech"><strong>Tech:</strong> {esc(tech)}</p>{after}{SHARE}'
            f'<p class="back"><a href="{back}">&larr; Back</a></p></section></div>')
    page(file, parent, title, meta, main)

role_html = lambda e: '<ul class="cv">' + ''.join(f'<li>{esc(b)}</li>' for b in e['cvText']) + '</ul>' if e.get('cvText') else ''.join(f'<p>{esc(p)}</p>' for p in e['body'])
# role ↔ project cross-links (PROJECTS[].role = EXP slug), same as build.js roleOf / projectsOf
def role_of(pr, r):
    e = next((x for x in D['EXP'] if x['slug'] == pr.get('role')), None)
    return f'<p class="links"><strong>Role:</strong> <a href="{r}experience/{e["slug"]}.html">{esc(e["role"])} · {esc(e["short"])}</a></p>' if e else ''
def projects_of(e):
    ps = [p for p in D['PROJECTS'] if p.get('role') == e['slug']]
    return (f'<p class="links"><strong>Related project{"s" if len(ps) > 1 else ""}:</strong> ' + ' · '.join(f'<a href="../{p["href"]}">{esc(p["title"])}</a>' for p in ps) + '</p>') if ps else ''
for e in D['EXP']:
    d = duration(e['period'])
    detail(f'experience/{e["slug"]}.html', 'experience', 'Experience', e['role'], ' · '.join(filter(None, [e['co'], e['period'], d])),
           role_html(e), e['tech'], '../experience.html', 'Experience', f'Logo of {e["short"]} or a photo from this period', after=projects_of(e))
for e in D['EDU']:
    detail(f'education/{e["slug"]}.html', 'experience', 'Education', e['degree'], ' · '.join([e['school'], e['period'], duration(e['period'])]),
           '<p>[PLACEHOLDER] What I studied, thesis or final project, and what stayed with me.</p>', '[PLACEHOLDER]',
           '../experience.html', 'Experience &amp; Education', f'Logo of {e["short"]}')
# ---------------------------------------------------------------- 3. featured projects (branch featured-projects): cards on the home
# (mobile accordion + desktop buttons), the projects page list, and the detail pages. Text comes from build.js PROJECTS; the
# problem / delivery / numbers split below is B-only (no invented numbers: rows without a number in the source are omitted).
BCARDS = {  # title: (color, icon, short line, problem, delivery, numbers or None)
    'Mission Control': ('#3ade7e', 'MC', 'My portfolio operating system, still in development and already the tool I use every day.',
        'Taking an idea from capture through market research, hypothesis validation and refinement, then knowing where every project stands.',
        'A control plane that tracks each project on a board and watches its deployment on GCP.', 'Governs a GitHub organization of 17 repositories; in development.'),
    'PhYnances': ('#3ade7e', 'PH', 'Personal finance in one place.',
        'My money lived in a dozen statements with different formats: broker statements, credit-card bills, PDF and Excel reports.',
        'Python pipelines (Airflow among them) that read them all, then categorize and reconcile everything into a single cash-flow view.', None),
    'Baby Health': ('#3ade7e', 'BH', 'Samsung Health for babies.',
        'Take what Samsung Health does for an adult and adapt it to a baby, with the parent or caretaker as the user.',
        'A mobile-first PWA where parents and caretakers log water, feeding, vaccines, medication and development milestones for children from 0 to 3.', None),
    'Spot': ('#ffb454', 'SP', 'A data-quality gateway that compares two Tableau workbooks data point by data point.',
        'Validating Tableau workbooks took 4 people × 2 weeks per cycle, and only covered a sample of the data.',
        'A tool that compares two Tableau workbooks data point by data point via API, turning the review into an automated check.',
        "4 people × 2 weeks → 1 person × 30 minutes per cycle · 100% of data points instead of a sample · became the NPS Prism data team's largest product."),
    "SOS: Safra's budgeting system": ('#ff7a7a', 'SOS', "Safra's budgeting system: the whole bank moved from spreadsheets to it.",
        'Bank-wide budgeting ran on spreadsheets, validated and consolidated by hand.',
        'A web system the whole bank adopted: instant validation, calendars, and full visibility for the budget owners. I led a team of four and wrote a good part of the backend.',
        'Team of four · about 30 budget champions before · adopted by the whole bank.'),
    'Red Hat AML onboarding': ('#ff7a7a', 'AML', 'A single, auditable view of customer onboarding across channels.',
        'The Central Bank required a single, auditable view of customer onboarding across channels.',
        'As product owner, I got eight channels, five teams and Red Hat to deliver it.', '8 channels · 5 teams · just under three months.'),
    'Address-resolution RPA': ('#5fa8ff', 'RPA', 'Fixing bad customer addresses before invoices went to the post.',
        'Bad customer addresses meant returned mail for Claro, a Brazilian telecom operator.',
        'A rules engine plus RPA that fixed addresses before invoices went to the post.', 'An estimated R$1M a year saved in returned mail.'),
    'Data lake for BTG+ payments': ('#b99cff', 'BTG', 'An AWS Kappa-style pipeline for BTG+ payment events.',
        'Most of the pipeline existed when I arrived: no documentation, little observability, and a daily load slowed by thousands of tiny files.',
        'I documented it end to end, brought observability in, and proposed the file consolidation that made the daily load viable.',
        'Optimal file size measured at about 256 MB.'),
}
PLUS_SM = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" class="absolute right-5 top-5 size-6 shrink-0 transition-transform duration-300"><circle cx="16" cy="16" r="16" fill="#0E0E0E"></circle><path stroke="#fff" stroke-linecap="round" stroke-width="1.5" d="M15.997 8v16M8 16.003h16"></path></svg>'
PLUS_LG = PLUS_SM.replace('class="absolute right-5 top-5 size-6 shrink-0 transition-transform duration-300"', 'class="absolute bottom-6 right-6 size-8 hover:brightness-150"')
bmeta = lambda pr: pr['meta'][0].upper() + pr['meta'][1:]
btech = lambda pr: esc(pr['tech'].split('. ')[0])  # the stack list only; the rest of the Stack line is on the detail page
blink = lambda pr: ('Full case study' if pr['href'] == 'spot.html' else 'Read more') + ' →'
def bdl(pr, dt='', dd=''):
    _, _, _, problem, delivery, numbers = BCARDS[pr['title']]
    rows = [('The problem', problem), ('What I delivered', delivery)] + ([('Numbers', numbers)] if numbers else [])
    return ''.join(f'<dt{dt}>{esc(k)}</dt><dd{dd}>{esc(v)}</dd>' for k, v in rows)
def home_cards(prs):
    mob, desk = [], []
    for i, pr in enumerate(prs):
        color, ico, short = BCARDS[pr['title']][:3]
        tech = f'<div class="flex flex-wrap gap-2"><div class="rounded-full border border-white/20 px-3 py-1.5 font-mukta text-sm font-medium text-white/80">Tech: {btech(pr)}</div></div>'
        mob.append(f'<div class="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300" data-acc><button type="button" aria-expanded="false" class="flex w-full cursor-pointer flex-col items-start text-left"><p class="mb-2 font-mukta text-sm font-semibold" style="color:{color}">{esc(bmeta(pr))}</p><div class="flex w-full items-center gap-3 pr-8"><span class="pj-ico sm" aria-hidden="true">{ico}</span><h3 class="flex-1 font-inter text-lg/[1.3] font-bold tracking-[-0.02em]">{esc(pr["title"])}</h3></div><p class="mt-2 text-pretty font-mukta text-base text-white/70">{esc(short)}</p>{PLUS_SM}</button><div class="grid transition-[grid-template-rows] duration-300 ease-out grid-rows-[0fr]"><div class="overflow-hidden"><div class="mt-5 flex flex-col gap-5 border-t border-white/10 pt-5"><dl class="pj-dl">{bdl(pr)}</dl>{tech}<a href="{pr["href"]}" class="pj-more" style="margin:0">{blink(pr)}</a></div></div></div></div>')
        # desktop card is a <button>: the link sits next to it, over the free bottom-left corner, so the HTML stays valid
        desk.append(f'<div class="relative flex"><button type="button" data-open="{i}" class="relative flex w-[380px] flex-col items-start rounded-2xl border border-white/10 bg-white/[0.04] p-8 pb-[56px] text-left backdrop-blur-sm transition-[background-color,border-color] duration-300 hover:border-white/20 hover:bg-white/[0.07]"><p class="mb-4 font-mukta text-sm font-semibold" style="color:{color}">{esc(bmeta(pr))}</p><span class="pj-ico" aria-hidden="true">{ico}</span><h3 class="mb-3 mt-4 font-inter text-2xl/[1.3] font-bold tracking-[-0.02em]">{esc(pr["title"])}</h3><p class="max-w-[300px] text-pretty font-mukta text-base text-white/70">{esc(short)}</p><span data-more hidden class="mt-4 block max-w-[300px] font-mukta text-base text-white/85"><dl class="pj-dl">{bdl(pr)}</dl>{tech}</span>{PLUS_LG}</button><a href="{pr["href"]}" class="pj-more absolute bottom-6 left-8" style="margin:0">{blink(pr)}</a></div>')
    return ('<div class="mt-10 flex flex-col gap-3 px-4 lg:hidden">' + ''.join(mob) + '</div>'
            '<div class="relative hidden lg:block"><div class="mx-auto mt-14 flex max-w-[1240px] flex-wrap justify-center gap-5 px-5">' + ''.join(desk) + '</div></div>')
def list_cards(prs):
    out = []
    for pr in prs:
        short = BCARDS[pr['title']][2]
        out.append(f'<article class="card"><div class="ph ph-wide"><b>Placeholder · Screenshot</b><span>{esc(pr["title"])}</span></div><p class="muted" style="margin:0 0 4px;font-size:13px">{esc(bmeta(pr))}</p><h3 style="font-size:24px;line-height:30px;font-family:Fraunces,serif"><a href="{pr["href"]}">{esc(pr["title"])}</a></h3><p style="margin:8px 0 14px">{esc(short)}</p><dl class="pj-dl" style="color:#1a1714">{bdl(pr, " style=\"color:#8a7a5c\"", " style=\"color:#2b2723\"")}</dl><p class="tech" style="margin:12px 0 0;font:500 13px/18px Geist,sans-serif;color:#6b6358">Tech: {btech(pr)}</p><p style="margin:12px 0 0"><a href="{pr["href"]}" class="more-link" style="margin:0">{blink(pr)}</a></p></article>')
    return '<div class="grid2">' + ''.join(out) + '</div>'
def replace_between(s, start, end, new, keep_end=True):
    i = s.index(start); j = s.index(end, i)
    return s[:i] + new + (s[j:] if keep_end else s[j + len(end):])
PRS = D['PROJECTS']; n_pers = sum(p['meta'].startswith('personal') for p in PRS); n_pro = len(PRS) - n_pers
WORDS = {3: 'three', 5: 'five', 8: 'eight'}
blurb = f'{WORDS.get(n_pers, n_pers).capitalize()} personal projects and {WORDS.get(n_pro, n_pro)} professional builds.'
s = rd(f'{B}/index.html')
s = replace_between(s, '<div class="mt-10 flex flex-col gap-3 px-4 lg:hidden">', '<p class="mt-10 text-center"><a href="projects.html" class="pj-more">All projects →</a></p>', home_cards(PRS))
s = sub1(s, r'(The problem, what I delivered, and the numbers\. )[^<]*(</p>)', r'\g<1>' + blurb + r'\2', name='home blurb')
wr(f'{B}/index.html', s)
s = rd(f'{B}/projects.html')
s = replace_between(s, '<section id="list">', '</section>', '<section id="list">' + list_cards(PRS))
s = sub1(s, r'<section class="page-hero"><h1>Projects\.</h1><p>[^<]*</p>', f'<section class="page-hero"><h1>Projects.</h1><p>{blurb} The problem, what I delivered, the numbers.</p>', name='projects hero')
s = sub1(s, r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{html.escape(f"{WORDS.get(len(PRS), len(PRS)).capitalize()} projects: " + ", ".join(p["title"] for p in PRS) + ".")}">', name='projects desc')
wr(f'{B}/projects.html', s)

# detail pages: page bullets as bold lead-in paragraphs (**bold**, `code`), then Tech (stack), then Links (URLs auto-linked), same as build.js
inline = lambda t: re.sub(r'`(.+?)`', r'<code>\1</code>', re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', esc(t)))
linkify = lambda t: re.sub(r'https?://[^\s<]+', lambda m: f'<a href="{m.group(0)}" rel="noopener">{re.sub(r"^https?://", "", m.group(0))}</a>', esc(t))
def project_html(pr):
    out = ''
    for item in pr['page']:
        label, text, sub = (item + [None])[:3]
        out += f'<p><strong>{esc(label)}</strong> {inline(text)}</p>' + (f'<ul>{"".join(f"<li>{inline(x)}</li>" for x in sub)}</ul>' if sub else '')
    return out
for pr in D['PROJECTS']:
    if not pr['href'].startswith('projects/'): continue
    links = f'<p class="links"><strong>Links:</strong> {linkify(pr["links"])}</p>' if pr.get('links') else ''
    detail(pr['href'], 'projects', 'Project', pr['title'], 'Personal project' if pr['meta'] == 'personal' else pr['meta'],
           project_html(pr), pr['tech'], '../projects.html', 'Projects', pr['phDesc'], after=links + role_of(pr, '../'))

# spot: body verbatim (PT), role line + share before the closing back link, same as build.js; the title is the page's H1
spot = rd(ROOT + '/_build/spot-body.html').strip()
spot = sub1(spot, r'<h2 class="case-title">(.*?)</h2>', r'<h1 class="case-title">\1</h1>', name='spot h1')
spot = sub1(spot, r'<p class="back"><a href="projects\.html">&larr; Back to Projects</a></p>\s*$',
            role_of(next(p for p in D['PROJECTS'] if p['href'] == 'spot.html'), '') + '\n' + SHARE + '\n<p class="back"><a href="projects.html">&larr; Back to Projects</a></p>', name='spot back')
page('spot.html', 'projects', 'Spot — case study', 'Spot: a data-quality gateway that compares two Tableau workbooks data point by data point (case study, in Portuguese).',
     '<div class="page case">' + spot + '</div>')
print('ok')
