const fs=require('fs');const t=fs.readFileSync('amirnet-trainer.html','utf8');
const d=t.split('/*DATA-START*/')[1].split('/*DATA-END*/')[0];
const o=new Function(d+';return {WORDS,SC,RS,AN,HSC,LG,READ,HV,HI,QW,QA,QN,QG,QD};')();
for(const k of Object.keys(o)) console.log(k,o[k].length);
const ks=new Set();o.WORDS.forEach(w=>{const k=w[0].toLowerCase();if(ks.has(k))console.log('dup word',k);ks.add(k);if(w.length!==3)console.log('bad',w)});
const ids=new Set();let nq=0;
const chk=q=>{nq++;if(ids.has(q.id))console.log('dup id',q.id);ids.add(q.id);if(!(q.a>=0&&q.a<q.o.length))console.log('bad a',q.id);if(new Set(q.o).size!==q.o.length)console.log('dup opt',q.id);if(!q.e)console.log('no e',q.id);
 const b=(q.q.match(/_____/g)||[]).length; if(b>1 && !q.o.every(x=>x.split(' / ').length===b)) console.log('blank mismatch',q.id)};
[...o.SC,...o.RS,...o.AN,...o.HSC,...o.LG,...o.HV,...o.HI,...o.QW,...o.QA,...o.QN,...o.QG,...o.QD].forEach(chk);o.READ.forEach(p=>p.qs.forEach(chk));
console.log('questions',nq,'passages en',o.READ.filter(p=>p.lang==='en').length,'he',o.READ.filter(p=>p.lang==='he').length);
// highlight check for new words
o.WORDS.forEach(w=>{const st=w[0].slice(0,Math.max(4,w[0].length-2));if(!new RegExp('\\b'+st,'i').test(w[2]))console.log('no hl',w[0])});
const sc=t.split('<script>')[1].split('</script>')[0];try{new Function(sc);console.log('syntax ok')}catch(e){console.log('ERR',e.message)}
