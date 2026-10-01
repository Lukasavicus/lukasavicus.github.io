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

def detail(file, parent, kick, title, meta, body_html, tech, back, back_label, ph_desc):
    main = (f'<section class="page-hero"><p class="kick">{kick}</p><h1>{esc(title)}</h1><p>{esc(meta)}</p></section>'
            f'<div class="page"><section class="detail">'
            f'<p class="back"><a href="{back}">&larr; {back_label}</a></p>'
            + ph('ph-mid', 'Placeholder · Imagem', ph_desc) + body_html +
            f'<p class="tech"><strong>Tech:</strong> {esc(tech)}</p>{SHARE}'
            f'<p class="back"><a href="{back}">&larr; Back</a></p></section></div>')
    page(file, parent, title, meta, main)

role_html = lambda e: '<ul class="cv">' + ''.join(f'<li>{esc(b)}</li>' for b in e['cvText']) + '</ul>' if e.get('cvText') else ''.join(f'<p>{esc(p)}</p>' for p in e['body'])
for e in D['EXP']:
    d = duration(e['period'])
    detail(f'experience/{e["slug"]}.html', 'experience', 'Experience', e['role'], ' · '.join(filter(None, [e['co'], e['period'], d])),
           role_html(e), e['tech'], '../experience.html', 'Experience', f'Logo of {e["short"]} or a photo from this period')
for e in D['EDU']:
    detail(f'education/{e["slug"]}.html', 'experience', 'Education', e['degree'], ' · '.join([e['school'], e['period'], duration(e['period'])]),
           '<p>[PLACEHOLDER] What I studied, thesis or final project, and what stayed with me.</p>', '[PLACEHOLDER]',
           '../experience.html', 'Experience &amp; Education', f'Logo of {e["short"]}')
for pr in D['PROJECTS']:
    if not pr['href'].startswith('projects/'): continue
    paras = [pr['text']] + (['[PLACEHOLDER] Full write-up: context, what was built, results.'] if pr.get('phDesc') else [])
    detail(pr['href'], 'projects', 'Project', pr['title'], 'Personal project' if pr['meta'] == 'personal' else pr['meta'],
           ''.join(f'<p>{esc(p)}</p>' for p in paras), pr['tech'], '../projects.html', 'Projects', pr.get('phDesc') or 'Screenshot of the Mission Control board')

# spot: body verbatim (PT), share before the closing back link, same as build.js
spot = rd(ROOT + '/_build/spot-body.html').strip()
spot = sub1(spot, r'<p class="back"><a href="projects\.html">&larr; Back to Projects</a></p>\s*$', SHARE + '\n<p class="back"><a href="projects.html">&larr; Back to Projects</a></p>', name='spot back')
page('spot.html', 'projects', 'Spot — case study', 'Spot: a data-quality gateway that compares two Tableau workbooks data point by data point (case study, in Portuguese).',
     '<div class="page case">' + spot + '</div>')
print('ok')
