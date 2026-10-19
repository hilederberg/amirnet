const {chromium}=require('playwright');
async function openQ(p,l){ for(let k=0;k<3 && !(await p.locator('.tile').count());k++) await p.locator('.top .back, .sess-top .icon-btn').first().click(); for(let i=0;i<3;i++){ await p.locator('.tile').nth(i).click(); const m=p.locator('.prow, .feat',{hasText:l}); if(await m.count()){ await m.first().click(); return; } await p.locator('.top .back').click(); } throw new Error('no '+l); }

(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'}).catch(()=>chromium.launch());
const ctx=await b.newContext({viewport:{width:400,height:820},deviceScaleFactor:2});const p=await ctx.newPage();const errs=[];
p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/amirnet-trainer.html');await p.waitForTimeout(300);
await openQ(p,'פרק מילולי');
let n=0; const secs=[];
while(await p.locator('.opt').count()){ n++; secs.push(await p.locator('.inst').first().innerText());
  if(n===8) await p.screenshot({path:'sim_mid.png',fullPage:true});
  if(n===20) await p.screenshot({path:'sim_read.png',fullPage:true});
  await p.locator('.opt').nth(n%4).click(); }
console.log('answered',n);
await p.screenshot({path:'sim_result.png',fullPage:true});
console.log('score', await p.locator('.score').innerText());
await p.locator('.sess-top .icon-btn, .top .back').first().click();
// other kinds still fine
for(const l of ['אנלוגיות','השלמת משפטים בעברית','הבנה והסקה','הבנת הנקרא בעברית','השלמת משפטים']){
 await openQ(p,l); await p.locator('.opt').first().click();
 let g=0;while(g++<12){const fin=p.locator('button',{hasText:'סיום הסט'});if(await fin.count()){await fin.click();break;}await p.locator('button',{hasText:'השאלה הבאה'}).click();await p.locator('.opt').first().click();}
 await p.locator('.sess-top .icon-btn, .top .back').first().click();}
console.log('sw',await p.evaluate(()=>document.documentElement.scrollWidth),'errors',errs);await b.close();})();
