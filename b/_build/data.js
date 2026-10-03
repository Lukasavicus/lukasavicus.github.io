// Extracts EXP / EDU / PROJECTS / ABOUT / QA / RECS and the headline strings from _build/build.js without running it (build.js writes files on load).
const fs = require('fs');
const src = fs.readFileSync(process.argv[2], 'utf8');
const grab = name => { const m = src.match(new RegExp('const ' + name + ' = (\\[[\\s\\S]*?\\n\\]);')); if (!m) throw new Error(name); return m[1]; };
const str = name => { const m = src.match(new RegExp('const ' + name + " = '((?:[^'\\\\]|\\\\.)*)'")); if (!m) throw new Error(name); return eval("'" + m[1] + "'"); };
const esc = s => s;
const EXP = eval(grab('EXP')), EDU = eval(grab('EDU')), PROJECTS = eval(grab('PROJECTS')), ABOUT = eval(grab('ABOUT')), QA = eval(grab('QA')), RECS = eval(grab('RECS'));
process.stdout.write(JSON.stringify({ EXP, EDU, PROJECTS, ABOUT, QA, RECS, HEADLINE: str('HEADLINE'), SCOPE: str('SCOPE'), MOTTO: str('MOTTO'), CV_PDF: str('CV_PDF'), CV_TITLE: str('CV_TITLE') }));
