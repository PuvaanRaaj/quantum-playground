import type { Topic } from '../content/types.ts';
import { validateModel } from './expression.ts';
export function validateLesson(t:Topic) {
 if(!t || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(t.slug)||!t.title||!t.intro||!t.why||!t.subtitle)throw Error('Missing lesson identity/introduction.');
 if(!['Quantum mechanics','Space & relativity','Mathematics','Classical physics'].includes(t.category))throw Error('Unknown category.');
 if(!['violet','blue','amber','teal'].includes(t.accent))throw Error('Unknown accent.');
 if(!Array.isArray(t.sections)||t.sections.length<3||t.sections.some(s=>!s.title||!Array.isArray(s.paragraphs)||s.paragraphs.some(p=>typeof p!=='string'||!p.trim())))throw Error('Incomplete narrative.');
 const words=t.sections.flatMap(s=>s.paragraphs).join(' ').split(/\s+/).length;
 if(words<650)throw Error(`${t.slug}: only ${words} theory words.`);
 if(t.terms.length<4||t.terms.some(t=>!t.term||!t.definition))throw Error('Missing vocabulary.');
 if(t.equation.symbols.length<2||t.equation.symbols.some(s=>!s.symbol||!s.meaning)||!t.equation.example||!t.equation.explanation||!t.equation.expression)throw Error('Incomplete equation definitions/example.');
 if(t.misconceptions.length<2||t.misconceptions.some(m=>!m.myth||!m.correction))throw Error('At least two substantive misconceptions required.');
 if(!t.check.question||!t.check.explanation||t.check.options.length<3||!Number.isInteger(t.check.answer)||t.check.answer<0||t.check.answer>=t.check.options.length)throw Error('Invalid comprehension check.');
 if(t.sources.length<2||t.sources.some(s=>!s.title||!s.url.startsWith('https://')))throw Error('At least two references required.');
 if(t.visual==='calculator'){if(!t.model)throw Error('Calculator model missing.');validateModel(t.model);}
 return {slug:t.slug,words};
}
