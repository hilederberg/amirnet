const {chromium}=require('playwright');
async function openQ(p,l){ for(let k=0;k<3 && !(await p.locator('.tile').count());k++) await p.locator('.top .back, .sess-top .icon-btn').first().click(); for(let i=0;i<3;i++){ await p.locator('.tile').nth(i).click(); const m=p.locator('.prow, .feat',{hasText:l}); if(await m.count()){ await m.first().click(); return; } await p.locator('.top .back').click(); } throw new Error('no '+l); }

(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:400,height:820},deviceScaleFactor:2});const p=await ctx.newPage();const errs=[];
p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/amirnet-trainer.html');await p.waitForTimeout(300);
for(const [l,f] of [['בעיות מילוליות','q_w'],['אלגברה','q_a'],['מספרים, אחוזים','q_n'],['גאומטריה','q_g'],['הסקה מטבלאות','q_d']]){
 await openQ(p,l);
 await p.screenshot({path:f+'_0.png',fullPage:true});
 await p.locator('.opt').nth(1).click(); await p.screenshot({path:f+'_1.png',fullPage:true});
 let g=0;while(g++<12){const fin=p.locator('button',{hasText:'סיום הסט'});if(await fin.count()){await fin.click();break;}await p.locator('button',{hasText:'השאלה הבאה'}).click();await p.locator('.opt').first().click();}
 await p.locator('.sess-top .icon-btn, .top .back').first().click();}
await openQ(p,'סימולציה: פרק כמותי');
let n=0; while(await p.locator('.opt').count()){n++; await p.locator('.opt').nth(n%4).click();}
console.log('qsim answered',n); await p.screenshot({path:'q_sim.png',fullPage:true});
await p.locator('.sess-top .icon-btn, .top .back').first().click(); await p.screenshot({path:'q_home.png',fullPage:true});
console.log('sw',await p.evaluate(()=>document.documentElement.scrollWidth),'errors',errs);await b.close();})();
