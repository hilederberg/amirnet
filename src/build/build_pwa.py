# Build the installable app (repo root index.html + sw.js) from src/amirnet-trainer.html.
# Usage (from anywhere):  python3 src/build/build_pwa.py 16      <- 16 = new cache version, bump on every release
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); SRC = os.path.dirname(HERE); ROOT = os.path.dirname(SRC)
if len(sys.argv) < 2 or not sys.argv[1].isdigit(): sys.exit('usage: build_pwa.py <version number, e.g. 16>')
src=open(os.path.join(SRC,'amirnet-trainer.html'),encoding='utf8').read()
style_start=src.index('<link rel="stylesheet"'); style_end=src.index('</style>')+len('</style>')
head_extra=src[style_start:style_end]; body=src[style_end:]
def brep(o,n):
    global body
    assert body.count(o)==1,(o[:60],body.count(o)); body=body.replace(o,n)
brep("    hardRow, voiceCard, course, foot, tabBar('settings'));","    hardRow, voiceCard, backup, course, foot, tabBar('settings'));")
brep("  const foot = h('p',{class:'foot',id:'foot'});","""  const backup = h('section',{class:'card'},
    h('h2',{text:'גיבוי ההתקדמות'}),
    h('div',{class:'sub',text:'ההתקדמות נשמרת רק בטלפון הזה. כדאי לשמור גיבוי פעם בשבוע, או לפני החלפת מכשיר.'}),
    h('div',{class:'bk'},
      h('button',{class:'btn btn-primary',onclick:exportData},'שמירת גיבוי'),
      h('label',{class:'btn btn-ghost'},'שחזור מגיבוי',h('input',{type:'file',accept:'application/json,.json',hidden:true,onchange:e=>{const f=e.target.files[0]; if(f) importData(f);}}))),
    h('div',{class:'sub',id:'bkmsg'}));
  const foot = h('p',{class:'foot',id:'foot'});""")
brep("/* ---------- boot ---------- */","""/* ---------- backup ---------- */
function bkMsg(s){const el=document.getElementById('bkmsg'); if(el) el.textContent=s;}
async function exportData(){
  const name='amirnet-backup-' + dateKey() + '.json';
  const blob=new Blob([JSON.stringify(Object.assign({},S,{px:PX}))],{type:'application/json'});
  try{
    const file=new File([blob],name,{type:'application/json'});
    if(navigator.canShare && navigator.canShare({files:[file]})){ await navigator.share({files:[file],title:'גיבוי מאמן פסיכומטרי'}); bkMsg('הגיבוי נשמר.'); return; }
  }catch(e){ if(e && e.name==='AbortError') return; }
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; document.body.append(a); a.click(); a.remove();
  bkMsg('הגיבוי ירד לקובץ ' + name);
}
function importData(file){
  file.text().then(tx => {
    const o=JSON.parse(tx);
    if(!o || typeof o.cards!=='object') throw new Error('bad');
    S={cards:o.cards||{}, q:o.q||{}, log:o.log||{}, g:o.g||null, updatedAt:Date.now()};
    if(o.px && typeof o.px==='object'){ PX={keys:o.px.keys||{}, runs:o.px.runs||[], draft:null}; pxSave(); }
    writeLocal(); render(); bkMsg('ההתקדמות שוחזרה מהגיבוי.');
  }).catch(() => bkMsg('הקובץ אינו גיבוי תקין של האפליקציה.'));
}

/* ---------- boot ---------- */""")
brep("loadLocal();\npxLoad();\nANIM = true;\nrender();\ninitRemote();","""loadLocal();
pxLoad();
ANIM = true;
render();
try{ if(navigator.storage && navigator.storage.persist) navigator.storage.persist(); }catch(e){}
if('serviceWorker' in navigator){ window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js').catch(()=>{}); }); }""")
head_extra=head_extra.replace('</style>', """
label.btn{cursor:pointer}
</style>""")
doc=f"""<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>מאמן פסיכומטרי</title>
<meta name="theme-color" content="#FBF6EE">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="פסיכומטרי">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<style>
:root{{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}}
html,body{{margin:0}}
body{{-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent}}
img{{max-width:100%}}
[hidden]{{display:none!important}}
</style>
{head_extra}
</head>
<body>{body}
</body>
</html>
"""
open(os.path.join(ROOT,'index.html'),'w',encoding='utf8').write(doc)
sw=open(os.path.join(HERE,'sw.template.js'),encoding='utf8').read().replace('__VERSION__', sys.argv[1])
open(os.path.join(ROOT,'sw.js'),'w',encoding='utf8').write(sw)
print('built index.html', len(doc), 'and sw.js amirnet-v' + sys.argv[1])

