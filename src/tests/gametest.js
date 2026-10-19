const {chromium} = require('playwright');
(async () => {
  const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
  const ctx = await b.newContext({viewport:{width:400,height:820}, deviceScaleFactor:2});
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  const url = 'file://' + process.cwd() + '/amirnet-trainer.html';
  const shot = async n => { await p.waitForTimeout(1500); await p.screenshot({path:'g_' + n + '.png', fullPage:true}); };
  const gold = () => p.evaluate(() => JSON.parse(localStorage.getItem('amirnet-trainer-v1') || '{}').g);
  await p.goto(url); await shot('01_home');
  await p.locator('.tab', {hasText:'גיבור'}).click(); await shot('02_setup');
  await p.locator('.seg button', {hasText:'אישה'}).click();
  await p.locator('.cls').nth(2).click(); await shot('03_setup_f_wizard');
  await p.locator('.btn', {hasText:'יוצאים לדרך'}).click(); await shot('04_hero');
  console.log('after setup', JSON.stringify(await gold()));
  // answer a set
  await p.locator('.tab', {hasText:'בית'}).click();
  await p.locator('.tile').nth(0).click(); await p.locator('.prow', {hasText:'השלמת משפטים'}).first().click();
  await p.locator('.opt').first().click(); await p.waitForTimeout(300); await p.screenshot({path:'g_05_toast.png'});
  for(let i = 0; i < 12; i++){ const fin = p.locator('button', {hasText:'סיום הסט'}); if(await fin.count()){ await fin.click(); break; } await p.locator('button', {hasText:'השאלה הבאה'}).click(); await p.locator('.opt').first().click(); }
  await shot('06_result');
  console.log('after set', (await gold()).gold, (await gold()).xp);
  // give gold to test shop
  await p.evaluate(() => { const o = JSON.parse(localStorage.getItem('amirnet-trainer-v1')); o.g.gold = 6000; o.g.xp = 2000; localStorage.setItem('amirnet-trainer-v1', JSON.stringify(o)); });
  await p.reload(); await p.locator('.chip.gold').first().click(); await shot('07_hero_lvl');
  await p.locator('.btn', {hasText:'לחנות'}).click(); await shot('08_shop');
  await p.locator('.it', {hasText:'לשון להבה'}).click(); await shot('09_sheet');
  await p.locator('.sheet .btn-primary').click(); await p.waitForTimeout(400); await p.screenshot({path:'g_10_bought.png'});
  await p.locator('.scats .chip', {hasText:'שיקויים'}).click();
  await p.locator('.it', {hasText:'ראייה רחוקה'}).click(); await p.locator('.sheet .btn-primary').click(); await p.locator('.sheet .icon-btn').click();
  await p.locator('.it', {hasText:'שיקוי גבורה'}).click(); await p.locator('.sheet .btn-primary').click(); await shot('11_potsheet');
  await p.locator('.sheet .btn', {hasText:'שימוש'}).click(); await p.waitForTimeout(300);
  await p.locator('.scats .chip', {hasText:'שלי'}).click(); await shot('12_mine');
  await p.locator('.tab', {hasText:'גיבור'}).click(); await shot('13_hero_eq');
  // hint + x2 inside a quiz
  await p.locator('.tab', {hasText:'בית'}).click();
  await p.locator('.tile').nth(1).click(); await p.locator('.prow', {hasText:'אנלוגיות'}).first().click();
  await shot('14_quiz_boost');
  await p.locator('.hintbtn').click(); await shot('15_hint');
  console.log('gone', await p.locator('.opt.gone').count());
  const g1 = (await gold()).gold;
  await p.locator('.opt:not(.gone)').first().click();
  console.log('x2 answer gold', (await gold()).gold - g1);
  console.log('final', JSON.stringify(await gold()));
  console.log('sw', await p.evaluate(() => document.documentElement.scrollWidth), 'errors', errs);
  await b.close();
})();
