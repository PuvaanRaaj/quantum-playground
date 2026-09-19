import {readFileSync,readdirSync} from 'node:fs';
import {validateLesson} from '../lib/lesson-validation.ts';
const names=process.argv.slice(2);
const files=names.length?names.map(s=>s+'.json'):readdirSync('work/lesson-drafts').filter(f=>f.endsWith('.json'));
let failed=0;
for(const f of files){try{const t=JSON.parse(readFileSync('work/lesson-drafts/'+f,'utf8'));validateLesson(t);console.log('PASS '+t.slug);}catch(e){failed++;console.log('FAIL '+f+': '+e.message);}}
process.exitCode=failed?1:0;
