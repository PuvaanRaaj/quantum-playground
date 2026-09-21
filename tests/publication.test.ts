import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';

test('Published lesson bytes match their independent Astra review records',()=>{
 const ledger=JSON.parse(readFileSync(new URL('../docs/lesson-reviews.json',import.meta.url),'utf8'));
 const directory=new URL('../content/lessons/',import.meta.url);
 const files=readdirSync(directory).filter(f=>f.endsWith('.json'));
 assert.equal(Object.keys(ledger).length,files.length);
 for(const file of files){
   const bytes=readFileSync(new URL(file,directory));
   const topic=JSON.parse(bytes.toString());
   const review=ledger[topic.slug];
   assert.equal(review?.reviewer, topic.slug==='jevons-paradox' ? 'grok-4.7' : 'gpt-6-astra', topic.slug);
   assert.equal(review?.status,'approved',topic.slug);
   assert.equal(createHash('sha256').update(bytes).digest('hex'),review?.sourceSha256,`${topic.slug}: bytes changed since review`);
 }
});
