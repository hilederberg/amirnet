const {chromium}=require('playwright');
async function openQ(p,l){ for(let k=0;k<3 && !(await p.locator('.tile').count());k++) await p.locator('.top .back, .sess-top .icon-btn').first().click(); for(let i=0;i<3;i++){ await p.locator('.tile').nth(i).click(); const m=p.locator('.prow, .feat',{hasText:l}); if(await m.count()){ await m.first().click(); return; } await p.locator('.top .back').click(); } throw new Error('no '+l); }

(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const ctx=await b.newContext({viewport:{width:400,height:820},deviceScaleFactor:2});const p=await ctx.newPage();const errs=[];
p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/amirnet-trainer.html');await p.waitForTimeout(300);
await p.screenshot({path:'d_home.png'});
await p.locator('.hero .btn').click();
let w=0; while(await p.locator('button',{hasText:'הצג תשובה'}).count()){w++; await p.locator('button',{hasText:'הצג תשובה'}).click(); await p.locator('.rate.r3').click();}
console.log('words',w);
await p.locator('button',{hasText:'המשך ל־8 שאלות'}).click();
let n=0; const secs=[];
while(await p.locator('.opt').count()){ n++; secs.push(await p.locator('.inst').first().innerText()); await p.locator('.opt').nth(n%4).click();
 if(n===3) await p.screenshot({path:'d_q.png',fullPage:true});
 const fin=p.locator('button',{hasText:'סיום הסט'}); if(await fin.count()){await fin.click();break;} await p.locator('button',{hasText:'השאלה הבאה'}).click(); }
console.log('daily q',n, secs.join(' | '));
await p.screenshot({path:'d_res.png',fullPage:true});
await p.locator('.sess-top .icon-btn, .top .back').first().click();
const errBtn=p.locator('.tile',{hasText:'מחברת טעויות'}); console.log('err btn', await errBtn.innerText());
await errBtn.click(); let m=0; while(await p.locator('.opt').count()){m++; await p.locator('.opt').first().click(); const fin=p.locator('button',{hasText:'סיום הסט'}); if(await fin.count()){await fin.click();break;} await p.locator('button',{hasText:'השאלה הבאה'}).click();}
console.log('err q',m);
await p.locator('.sess-top .icon-btn, .top .back').first().click(); await p.screenshot({path:'d_home2.png'});
console.log('sw',await p.evaluate(()=>document.documentElement.scrollWidth),'errors',errs);await b.close();})();
