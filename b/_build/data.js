// Extracts EXP / EDU / PROJECTS from _build/build.js without running it (build.js writes files on load).
const fs = require('fs');
const src = fs.readFileSync(process.argv[2], 'utf8');
const grab = name => { const m = src.match(new RegExp('const ' + name + ' = (\\[[\\s\\S]*?\\n\\]);')); if (!m) throw new Error(name); return m[1]; };
const esc = s => s;
const EXP = eval(grab('EXP')), EDU = eval(grab('EDU')), PROJECTS = eval(grab('PROJECTS'));
process.stdout.write(JSON.stringify({ EXP, EDU, PROJECTS }));
