// Run: node tests/student-print.cjs [original-result.json repaired-result.json]
// No browser is mocked as passing: these are contract/rendering checks only.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../LogicForge_v0.5.html'),'utf8');
const script=html.split('<script>')[1].split('</script>')[0].replace(/render\(\);\s*$/,'');
const elements={};const document={getElementById:id=>elements[id]??=( {innerHTML:'',textContent:'',hidden:false} ),querySelectorAll:()=>[]};
const context=vm.createContext({console,crypto,document,window:{addEventListener(){}},localStorage:{getItem:()=>null,setItem(){}},setTimeout:()=>0,clearTimeout(){},structuredClone});
vm.runInContext(script,context);
const run=code=>vm.runInContext(code,context);
const checks=[];const check=(name,fn)=>{fn();checks.push(name);};
check('12 entries use two columns; 13 entries use four; question count also activates four',()=>{
 for(const [entries,questions,columns,rows] of [[12,12,2,12],[13,12,4,7],[12,13,4,6],[30,20,4,15]]){
  const rendered=run(`answerMatchingTable(Array.from({length:${entries}},(_,i)=>({answer:String(i+1),output:'A'})),${questions})`);
  assert.equal((rendered.match(/<th>/g)||[]).length,columns);
  assert.equal((rendered.match(/<tr>/g)||[]).length,rows+1);
  assert.equal((rendered.match(/<td>/g)||[]).length,rows*columns);
 }
});
check('generation contract and schema distinguish primary narrative and plain references',()=>{
 const packet=run('generationPacket()');
 for(const phrase of ['PRIMARY-SCHOOL STUDENTS','PLAIN-TEXT CULTURE AND CLUE REFERENCES','technical explanations','referenceGuides are prose-only']) assert(packet.includes(phrase));
 const schema=run('contentSchema()');assert(schema.properties.case.properties.briefing.description.includes('primary students'));
 assert(schema.properties.referenceGuides.items.description.includes('No equations'));
});
check('legacy reference display escapes HTML and strips equation delimiters; math answers retain MathML',()=>{
 assert.equal(run(`referenceText('09:00 is [[eq:540]] minutes; <script>')`),'09:00 is 540 minutes; &lt;script&gt;');
 assert(run(`mathText('10/21',true)`).includes('<mfrac>'));
});
check('malformed, wrong-project and stale imports reject without replacing current content',()=>{
 run('P.generated={testSentinel:true}');
 for(const input of ['null','{"projectId":"wrong"}','{"revision":-1}','not json']){
  context.input=input;assert.equal(run('importResult(input)'),false);assert.equal(run('P.generated.testSentinel'),true);
 }
 run('P.generated=null');
});
// Synthetic matrix fixture exercises the real matrix validator; it is not the user's saved project.
run(`
P = freshProject();
P.matrix.fields.forEach((f,i)=>{f.valueType='Number'; f.label=['Locker number','Shift','Distance','Ticket','Bay'][i];});
syncAutoLogic();
const sample = {suspects:P.candidates.suspects.map(s=>({...s,attributes:{}})),glossary:[{id:'G1',term:'Sesame',displayTerm:'Sesame',meaning:'A small seed.',clueRelevantFact:'An ingredient in some snacks.',example:'Sesame coats this snack.',sourceUrl:'',generalSupport:true}],referenceGuides:[],autotags:[],activities:[],matrixContent:{fields:[],assignments:{}}};
P.matrix.fields.forEach((f,i)=>{
 const bit=P.matrix.rows[P.solution.suspectId][i];
 const cat=Array.from({length:6},(_,j)=>({key:'K'+(j+1),display:String(j+1).padStart(3,'0'),numericValue:j+1,truth:(j+1)%2===0?1:0,glossaryIds:['G1']}));
 sample.matrixContent.fields.push({fieldId:f.id,label:f.label,valueType:'Number',valueCatalog:cat,predicate:{operator:'isEven',trueValueKeys:[],trueLabel:'Even',falseLabel:'Odd'},clue:{positiveText:'M has an even number',negativeText:'M has an odd number',selectedPolarity:bit?'positive':'negative',decoderPayload:bit?'M HAS EVEN NUMBER':'M HAS ODD NUMBER'}});
 const counters=[0,0];
 P.candidates.suspects.forEach(s=>{const truth=P.matrix.rows[s.id][i],group=cat.filter(v=>v.truth===truth);sample.matrixContent.assignments[s.id]??={};sample.matrixContent.assignments[s.id][f.id]=group[counters[truth]++%3].key;});
 const plan=P.activities.find(a=>a.logic.attributeId===f.id);
 sample.activities.push({id:plan.id,extraction:{exactClueText:sample.matrixContent.fields[i].clue.decoderPayload}});
});
`);
check('numeric fields accept omitted reference guides at all three cultural depths',()=>{
 for(const depth of [1,2,3])run(`P.matrix.cultureDepth=${depth};validateMatrixResult(sample)`);
});
check('legacy numeric guides are suppressed; glossary, IDs and values remain intact',()=>{
 run(`sample.referenceGuides=sample.matrixContent.fields.map(f=>({id:'GUIDE-'+f.fieldId,fieldId:f.fieldId,title:f.label+' reference',introduction:'Legacy explanation',rows:f.valueCatalog.map(v=>({valueKey:v.key,classification:v.truth?'Even':'Odd',explanation:'Legacy numeric classification',glossaryIds:['G1']}))}));P.generated=sample;`);
 const before=run('JSON.stringify(sample)');const pages=run('vocabularyPages(sample)');
 assert.equal(pages.length,1);assert(pages[0].includes('<h2>ELL glossary</h2>'));
 assert(!pages[0].includes('class="marker"'));assert(!pages[0].includes('Legacy explanation'));assert(pages[0].includes('<h3>Sesame</h3>'));
 const table=run('comparisonTable(sample,sample.suspects,true)');assert(!table.includes('class="marker"'));assert(!table.includes('aria-label="Glossary'));
 assert(table.includes('001'));assert.equal(run('JSON.stringify(sample)'),before);
});
check('non-numeric cultural guides remain visible and required',()=>{
 run(`sample.matrixContent.fields[0].valueType='Text category';P.matrix.fields[0].valueType='Text category';sample.matrixContent.fields[0].predicate.operator='inSet';sample.matrixContent.fields[0].predicate.trueValueKeys=['K2','K4','K6'];validateMatrixResult(sample);`);
 const pages=run('vocabularyPages(sample)');assert.equal(pages.length,2);assert(pages[0].includes('Locker number reference'));assert(!pages[0].includes('Shift reference'));assert(!pages.join('').includes('class="marker"'));
 assert.throws(()=>run('validateMatrixResult({...sample,referenceGuides:[]})'),/complete student reference guide/);
});
check('all-numeric cases do not produce empty reference pages; empty glossary omitted',()=>{
 run(`sample.matrixContent.fields[0].valueType='Number';`);
 assert.equal(run('vocabularyPages({...sample,glossary:[]}).length'),0);
});
check('outgoing AI instructions omit numeric guides and visible glossary markers',()=>{
 const packet=run('generationPacket()');assert(packet.includes('Omit reference guides entirely for valueType "Number"'));
 assert(packet.includes('Do not add circled numbers'));assert(!packet.includes('Dividing this locker number by three leaves a remainder.'));
});
run('P=freshProject()');
if(process.argv[2]&&process.argv[3]){
 const original=JSON.parse(fs.readFileSync(process.argv[2])), repaired=JSON.parse(fs.readFileSync(process.argv[3]));context.fixture=repaired;
 check('revision-49 envelope and all puzzle-bearing content are unchanged',()=>{
  for(const key of Object.keys(original).filter(k=>!['case','referenceGuides'].includes(k)))assert.deepEqual(repaired[key],original[key],key);
  assert.equal(repaired.case.incidentSubject,original.case.incidentSubject);
  const a=structuredClone(original.case.visual),b=structuredClone(repaired.case.visual);delete a.caption;delete b.caption;assert.deepEqual(a,b);
  for(let i=0;i<original.referenceGuides.length;i++){
   const a=structuredClone(original.referenceGuides[i]),b=structuredClone(repaired.referenceGuides[i]);delete a.introduction;delete b.introduction;
   a.rows.forEach(r=>delete r.explanation);b.rows.forEach(r=>delete r.explanation);assert.deepEqual(a,b);
  }
  assert(!JSON.stringify(repaired.referenceGuides).includes('[[eq:'));
 });
 check('all five 20-question panels preserve 30 shuffled entries and all 20 recording boxes',()=>{
  for(const activity of repaired.activities){
   context.activity=activity;const rendered=run('renderDecoderPanel(activity)');
   assert.equal((rendered.match(/<th>/g)||[]).length,4);
   assert.equal((rendered.match(/<tr>/g)||[]).length,16);
   assert.equal((rendered.match(/class="response-box"/g)||[]).length,20);
   const outputs=[...rendered.matchAll(/<td>([A-Z]{1,3})<\/td>/g)].map(x=>x[1]);
   assert.deepEqual(outputs,activity.extraction.displayOrder.map(id=>(activity.extraction.mapping.find(e=>e.responseId===id)||activity.extraction.decoys.find(e=>e.id===id)).output));
   assert(rendered.indexOf('response-strip')>rendered.indexOf('</table>'));
   assert(rendered.includes('clue-mask'));
   const joined=activity.questions.map(q=>activity.extraction.mapping.find(e=>e.responseId===q.id).output).join('');
   assert.equal(joined,activity.extraction.exactClueText.replace(/[^A-Z]/g,''));
  }
 });
 check('repaired reference sheets render no equation markers or MathML',()=>{
  run('P.generated=fixture; P.matrix.cultureFocus="Shenzhen";P.matrix.cultureDepth=3');
  const rendered=run('vocabularyPages(fixture)[0]');assert(!rendered.includes('[[eq:'));assert(!rendered.includes('<math'));
 });
}
console.log(JSON.stringify({candidate:'LogicForge_v0.5.html',sha256:crypto.createHash('sha256').update(html).digest('hex'),passed:checks,notRun:['Physical browser/PDF pagination and visual inspection','Original saved-project roundtrip (saved design not supplied)','Other mode/depth workflows']},null,2));

