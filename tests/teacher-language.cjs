// Run: node tests/student-print.cjs [original-result.json repaired-result.json]
// No browser is mocked as passing: these are contract/rendering checks only.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../LogicForge_v0.5.1.html'),'utf8');
const script=html.split('<script>')[1].split('</script>')[0].replace(/render\(\);\s*$/,'');
const elements={};const document={getElementById:id=>elements[id]??=( {innerHTML:'',textContent:'',hidden:false} ),querySelectorAll:()=>[]};
const storage=new Map();let failStorage=false;let confirmValue=true;
const context=vm.createContext({console,crypto,document,window:{addEventListener(){},scrollTo(){}},localStorage:{getItem:key=>storage.get(key)??null,setItem(key,value){if(failStorage)throw Error('storage blocked');storage.set(key,value)},removeItem(key){if(failStorage)throw Error('storage blocked');storage.delete(key)}},confirm:()=>confirmValue,setTimeout:()=>0,clearTimeout(){},structuredClone});
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
 for(const phrase of ['PRIMARY-SCHOOL STUDENTS','PLAIN-TEXT CULTURE AND CLUE REFERENCES','COMPACT TEACHER CLOSING SUMMARY','referenceGuides are prose-only']) assert(packet.includes(phrase));
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

// Complete enough to exercise the real teacher renderer and decoder replay.
run(`
sample.case={title:'Harbour mystery'};sample.locations=[];sample.objects=[];
sample.solutionExplanation='Long mechanical explanation. '.repeat(120);
sample.teachingNotes='Schema contract and stable IDs are preserved. '.repeat(100)+'Students need prior instruction in signed addition. The packet has a timing conflict: forty-five minutes are planned but the activities total fifty minutes. A practical delivery option is five parallel teams. For triangle responses, use the exclusive packet rule: equilateral records three, isosceles two and scalene zero. Both corresponding key rows supply identical letters, so either matching key row produces the same result, and the answer may be reused.';
sample.activities=P.activities.map((plan,index)=>{
 plan.countMode='Exact';plan.targetResponses=20;plan.decoderOverride='Answer Matching';
 const text='MLOCKERNUMBERISNOTDIVISIBLEBYTHREE';let at=0;
 const questions=Array.from({length:20},(_,i)=>({id:plan.id+'-R'+(i+1),answer:String(i+1),prompt:'Evaluate [[eq:'+String(i+1)+']].',worked:'The answer is [[eq:'+String(i+1)+']].',checkExpression:String(i+1),figureIds:[],table:{headers:[],rows:[]}}));
 const mapping=questions.map((question,i)=>{const length=Math.min(2,text.length-at-(19-i)),output=text.slice(at,at+length);at+=length;return {responseId:question.id,answer:question.answer,output};});
 const decoys=Array.from({length:10},(_,i)=>({id:plan.id+'-D'+(i+1),answer:String(i+101),output:'X'}));
 return {id:plan.id,title:'Test investigation '+index,instructions:'Solve.',actualResponseCount:20,skillSummary:{selectionMode:'teacherSpecified',grade:'6',skillKey:'addition',skillLabel:'Addition',ccssDomain:'',ccssStandard:''},questions,figures:[],evidenceNarrative:'Use this clue.',extraction:{decoder:'Answer Matching',exactClueText:text,clueId:plan.clueId,requiredFindingKey:plan.logic.findingKey,readingOrder:'left-to-right',mapping,decoys,displayOrder:[...mapping.map(x=>x.responseId),...decoys.map(x=>x.id)].reverse(),tiles:[]}};
});P.generated=sample;
`);
check('teacher summaries finish the packet; all five actual replays appear in the front table',()=>{
 const before=run('JSON.stringify(sample)');const pages=run('teacherPages()');
 assert.equal(pages.length,7);assert(!pages[0].includes('Complete solution explanation'));
 assert(pages.at(-1).includes('Complete solution explanation'));assert(pages.at(-1).includes('Teaching notes'));
 assert.equal((pages[0].match(/MLOCKERNUMBERISNOTDIVISIBLEBYTHREE/g)||[]).length,5);
 assert(pages[0].includes('<th>Decoded replay</th>'));assert(pages[0].includes('<td>16</td>'));assert(pages[0].includes('<td>1</td>'));
 assert(run('wordCount(teacherSolutionSummary(sample))')<90);assert(run('wordCount(teacherNotesSummary(sample))')<=180);
 assert(pages.at(-1).includes('prior instruction'));assert(pages.at(-1).includes('exclusive packet rule'));assert(pages.at(-1).includes('may be reused'));
 assert(!pages.at(-1).includes('stable IDs'));assert.equal(run('JSON.stringify(sample)'),before);
 run(`sample.printTeachingNotes='Teacher-approved short guidance.';sample.printSolutionExplanation='A concise edited solution.'`);
 assert(run('teacherPages().at(-1)').includes('Teacher-approved short guidance.'));
 run('delete sample.printTeachingNotes;delete sample.printSolutionExplanation');
});
check('Unicode matching preserves accents and graphemes; masks never disclose non-Latin clue letters',()=>{
 assert.equal(run("normalizedClue('árbol, niño!')"),'ÁRBOLNIÑO');
 assert.equal(run("normalizedClue('a\\u0301')"),'Á');
 assert.equal(run("clueUnits('क्ष').length"),1);assert.equal(run("validClueFragment('क्ष')"),true);
 assert.equal(run("validClueFragment('ABCD')"),false);assert.equal(run("validClueFragment('A B')"),false);
 assert.equal(run("unsupportedClueCharacters('你好世界')"),false);assert.equal(run("unsupportedClueCharacters('صباح الخير')"),false);
 assert.equal(run("unsupportedClueCharacters('CLUE 2')"),true);assert.equal(run("unsupportedClueCharacters('💡')"),true);
 assert(!run("clueMask('你好世界')").includes('你'));
 assert.equal(run("compatiblePlan({...P.activities[0],targetResponses:4},'ÁRBOL','Alphabet Code')"),null);
 assert.equal(run("checkSchema('ÁÑ', {type:'string',pattern:IMPORT_CONTRACT.decoderOutputPattern}).length"),0);
});
check('native-script Answer Matching and Cross-Out replay through actual validation',()=>{
 run(`const localPlan={...P.activities[0],countMode:'Exact',targetResponses:3};
 const localActivity={...sample.activities[0],actualResponseCount:3,questions:sample.activities[0].questions.slice(0,3),extraction:{...sample.activities[0].extraction,exactClueText:'ÁRBOL',mapping:sample.activities[0].questions.slice(0,3).map((q,i)=>({responseId:q.id,answer:q.answer,output:['ÁR','BO','L'][i]})),decoys:sample.activities[0].extraction.decoys.slice(0,3)}};
 localActivity.extraction.displayOrder=[...localActivity.extraction.mapping.map(x=>x.responseId),...localActivity.extraction.decoys.map(x=>x.id)].reverse();`);
 assert.equal(run('replayExtraction(localPlan,localActivity).decoded'),'ÁRBOL');
 assert.equal(run('replayExtraction(localPlan,localActivity).issues.length'),0,run('JSON.stringify(replayExtraction(localPlan,localActivity).issues)'));
 run(`localActivity.extraction={...localActivity.extraction,decoder:'Cross-Out',exactClueText:'你好世界',mapping:[],displayOrder:[],decoys:[],tiles:[]};localActivity.extraction.tiles=buildCrossout(localActivity);`);
 assert.equal(run('replayExtraction(localPlan,localActivity).decoded'),'你好世界');
 assert.equal(run("localActivity.extraction.tiles.every(tile=>/^[你好世界]$/.test(tile.letter))"),true);
 assert.equal(run('replayExtraction(localPlan,localActivity).issues.length'),0,run('JSON.stringify(replayExtraction(localPlan,localActivity).issues)'));
});

check('complete synthetic matrix result passes the actual import path',()=>{
 run(`
 P.matrix.fields.forEach(field=>field.valueType='Number');P.activities.forEach(activity=>{activity.autoMath=false;activity.topic='Evaluate integers';});
 const completeTemplate=resultTemplate();
 for(const key of ['format','version','projectId','revision','designFingerprint'])sample[key]=completeTemplate[key];
 sample.case={...completeTemplate.case,title:'Harbour mystery',hook:'A mystery to solve.',briefing:'The team must solve the mystery.',timeline:'The event opens.',evidenceRule:'Solve the clues.',visual:{...blankCaseVisual(),alt:'A harbour scene.',caption:'The harbour.',shapes:Array.from({length:8},(_,i)=>({type:'circle',cx:30+i*50,cy:100,r:10,fill:'#AABBCC',stroke:'#000000',strokeWidth:1}))}};
 sample.suspects=sample.suspects.map(suspect=>({...completeTemplate.suspects.find(item=>item.id===suspect.id),...suspect}));
 sample.activities.forEach((activity,index)=>{
  const field=sample.matrixContent.fields[index];field.predicate={...completeTemplate.matrixContent.fields[index].predicate,...field.predicate};
  field.clue.positiveText='M '+field.label+' number is an even number';field.clue.negativeText='M '+field.label+' number is an odd number';
  const text=normalizedClue(field.clue.selectedPolarity==='positive'?field.clue.positiveText:field.clue.negativeText);field.clue.decoderPayload=text;activity.extraction.exactClueText=text;let at=0;
  activity.extraction.mapping.forEach((entry,i)=>{const length=Math.min(2,text.length-at-(19-i));entry.output=text.slice(at,at+length);at+=length;});
 });
 P.generated=sample;
 const importRender=render;render=()=>{};
 globalThis.completeImportResult=importResult(JSON.stringify(sample));render=importRender;
 `);
 assert.equal(run('completeImportResult'),true,elements.dialogHost.innerHTML);
 assert.equal(run("generatedQA().filter(item=>item.level==='error').length"),0);
});
check('translation copy preserves the original and binds new language to a separate project',()=>{
 run('const originalProject=clone(P);const realRender=render;const realDownload=download;render=()=>{};download=(name,content)=>{globalThis.lastDownload={name,content}};');
 Object.assign(elements.translationLanguage={},{value:'es-US'});elements.translationCustom={value:''};elements.translationDirection={value:'ltr'};
 run('createTranslatedCopy()');
 assert.notEqual(run('P.id'),run('originalProject.id'));assert.equal(run('P.generated'),null);assert.equal(run('P.packetLanguage'),'es-US');
 assert.equal(run('P.publication.translationSource.activities.length'),5);assert.equal(run('recentProjects()[0].project.id'),run('originalProject.id'));
 assert.equal(JSON.parse(run('lastDownload.content')).id,run('originalProject.id'));
 assert.equal(run('P.activities[0].targetResponses'),20);assert.notEqual(run('designFingerprint()'),run('designFingerprint({...projectSpec(),packetLanguage:"en"})'));
 assert(run('generationPacket()').includes('PARALLEL TRANSLATION SOURCE'));assert(run('generationPacket()').includes('Spanish (US classrooms)'));
 const saved=JSON.parse(storage.get('logicforge-v04-project'));assert(saved.publication.translationSource);
});
check('parallel guard rejects altered math or deduction data while accepting translated prose',()=>{
 run(`const translated=clone(P.publication.translationSource);translated.activities[0].questions[0].prompt='Calcula [[eq:1]].';translated.teachingNotes='Notas breves.';validateParallelTranslation(translated);`);
 run("translated.activities[0].questions[0].answer='999'");assert.throws(()=>run('validateParallelTranslation(translated)'),/changed answer/);
 run("translated.activities[0].questions[0].answer='1';translated.activities[0].questions[0].prompt='Calcula [[eq:2]].'");assert.throws(()=>run('validateParallelTranslation(translated)'),/question equations/);
 run("translated.activities[0].questions[0].prompt='Calcula [[eq:1]].';translated.matrixContent.fields[0].valueCatalog[0].truth=9");assert.throws(()=>run('validateParallelTranslation(translated)'),/catalog\/predicate/);
 run('translated.matrixContent=clone(P.publication.translationSource.matrixContent)');
});
check('translated labels are required, escaped, and printed with language/direction metadata',()=>{
 run(`translated.localization={language:'es-US',languageName:'Spanish (US classrooms)',direction:'ltr',labels:Object.fromEntries(packetLabelKeys().map(key=>[key,'ES '+key]))};translated.localization.labels['Teacher answer materials']='Respuestas para docentes';translated.localization.labels['Five-clue elimination check']='Comprobación de cinco pistas';validateLocalization(translated);P.generated=translated;`);
 const print=run("publicationPages('teacher')");assert(print.includes('lang="es-US"'));assert(print.includes('Respuestas para docentes'));assert(print.includes('Comprobación de cinco pistas'));assert(print.includes(run('translated.activities[0].extraction.exactClueText')));
 run("translated.localization.labels['Clue']='<script>'");assert.throws(()=>run('validateLocalization(translated)'),/invalid packet-label/);
 run("translated.localization.labels['Clue']='Pista';delete translated.localization.labels['Remaining']");assert.throws(()=>run('validateLocalization(translated)'),/Remaining/);
 run("translated.localization.labels['Remaining']='Restantes';");
 run("P.publication.translationSource.matrixContent.fields[0].valueCatalog[0].display='M';translated.localization.labels.M='CAMBIO';");
 assert.equal(run("localizePublication('<td><bdi class=\"decoder-symbol\">M</bdi></td>')"),'<td><bdi class="decoder-symbol">M</bdi></td>');
 run("P.packetLanguage='custom';P.customPacketLanguage='Hebrew';P.packetDirection='rtl'");assert.equal(run('packetLanguage().direction'),'rtl');
 run('P=clone(originalProject)');
});

check('translated import is atomic and rejects a changed source answer',()=>{
 run(`P=clone(originalProject);P.packetLanguage='es-US';P.publication.translationSource=clone(originalProject.generated);
 const validTranslation=clone(originalProject.generated);validTranslation.projectId=P.id;validTranslation.revision=P.revision;validTranslation.designFingerprint=designFingerprint();
 validTranslation.localization={language:'es-US',languageName:'Spanish (US classrooms)',direction:'ltr',labels:Object.fromEntries(packetLabelKeys().map(key=>[key,'ES '+key]))};
 validTranslation.case.briefing='El equipo resuelve el misterio.';
 globalThis.translatedImportOK=importResult(JSON.stringify(validTranslation));`);
 assert.equal(run('translatedImportOK'),true,elements.dialogHost.innerHTML);
 const before=run('JSON.stringify(P.generated)');
 run("validTranslation.activities[0].questions[0].answer='999';globalThis.invalidTranslatedImport=importResult(JSON.stringify(validTranslation));");
 assert.equal(run('invalidTranslatedImport'),false);assert.equal(run('JSON.stringify(P.generated)'),before);
 run('P=clone(originalProject)');
});
check('scoped deletion supports cancel, group deletion, undo and storage failures without touching unrelated data',()=>{
 storage.clear();storage.set('unrelated-app','keep');
 run("save();saveRestorePoint(P);const other=clone(P);other.id='OTHER';other.title='Other project';saveRestorePoint(other);");
 const before=JSON.stringify([...storage]);run("deleteSavedWork('all')");assert.equal(JSON.stringify([...storage]),before);assert(elements.dialogHost.innerHTML.includes('Cancel'));
 run("confirmDeleteSavedWork('project')");assert.notEqual(run('P.id'),run('originalProject.id'));assert.equal(run('recentProjects().length'),1);assert.equal(run('recentProjects()[0].project.id'),'OTHER');assert.equal(storage.get('unrelated-app'),'keep');
 run('undoSavedWorkDeletion()');assert.equal(run('P.id'),run('originalProject.id'));assert.equal(run('recentProjects().length'),2);
 const beforeFail=JSON.stringify([...storage]);failStorage=true;run("confirmDeleteSavedWork('recent')");failStorage=false;assert.equal(JSON.stringify([...storage]),beforeFail);assert(elements.notice.textContent.includes('failed'));
 run("confirmDeleteSavedWork('all')");assert.equal(run('recentProjects().length'),0);assert.equal(run('P.generated'),null);assert.equal(storage.get('unrelated-app'),'keep');assert.equal(JSON.parse(storage.get('logicforge-v04-project')).id,run('P.id'));
 confirmValue=false;const freshId=run('P.id');run('undoSavedWorkDeletion()');assert.equal(run('P.id'),freshId);confirmValue=true;run('undoSavedWorkDeletion()');assert.equal(run('P.id'),run('originalProject.id'));
 run('render=realRender;download=realDownload');
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
   const outputs=[...rendered.matchAll(/<td><bdi class="decoder-symbol">([A-Z]{1,3})<\/bdi><\/td>/g)].map(x=>x[1]);
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
console.log(JSON.stringify({candidate:'LogicForge_v0.5.1.html',sha256:crypto.createHash('sha256').update(html).digest('hex'),passed:checks,notRun:['Physical browser/PDF pagination and visual inspection','Original saved-project roundtrip (saved design not supplied)','Fluent-speaker translation review and real AI-produced translated edition','Other mode/depth workflows']},null,2));


