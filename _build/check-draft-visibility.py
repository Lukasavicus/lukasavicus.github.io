"""Check generated public navigation and direct-access editorial drafts in A/B."""
import json
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parent.parent
slugs = [p['slug'] for p in json.loads((ROOT / '_build/draft-cases.json').read_text())]
slugs += ['aml-onboarding-safra', 'btg-payments-data-lake']
drafts = {ROOT / prefix / 'projects' / (slug + '.html') for prefix in ['', 'b'] for slug in slugs}

class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.links = []; self.noindex = False; self.h1 = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if tag == 'meta' and a.get('name') == 'robots': self.noindex = 'noindex' in a.get('content', '')
        if tag == 'h1': self.h1 += 1

errors = []
checked = 0
for file in ROOT.rglob('*.html'):
    if any(x.startswith(('.', '_')) or x in ['node_modules', 'prototypes', 'LUCAS_LUKASAVICUS_SITE'] for x in file.relative_to(ROOT).parts[:-1]): continue
    page = Page(); page.feed(file.read_text()); checked += 1
    if file in drafts:
        if not page.noindex or page.h1 != 1: errors.append(f'{file.relative_to(ROOT)}: missing noindex or unique heading')
    for href in page.links:
        u = urlsplit(href)
        if u.scheme or u.netloc or not u.path: continue
        target = (ROOT / unquote(u.path).lstrip('/')) if u.path.startswith('/') else file.parent / unquote(u.path)
        if target.resolve() in drafts: errors.append(f'{file.relative_to(ROOT)} links to {href}')
for file in drafts:
    if not file.exists(): errors.append(f'Missing draft: {file}')
for prefix in ['', 'b']:
    index = (ROOT / prefix / 'projects.html').read_text()
    for slug in ['sos-safra-budgeting', 'address-rpa-deloitte', 'domo-gcp-migration']:
        if f'projects/{slug}.html' not in index: errors.append(f'{prefix}: validated case missing: {slug}')
    if 'spot.html' not in index: errors.append(f'{prefix}: Spot missing')
assert not errors, '\n'.join(errors)
print(f'PASS: {len(drafts)} directly addressable draft pages, no incoming internal links; validated cases visible. Scanned {checked} HTML pages.')
