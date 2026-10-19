/* Hero shop catalog. Item names and rarities from the D&D SRD 5.1 (CC-BY-4.0); Hebrew text written for this app. */
const RARITY = {
  mundane:  {he:'רגיל',        lvl:1,  color:'#4A443C'},
  uncommon: {he:'לא נפוץ',     lvl:3,  color:'#1F6B3A'},
  rare:     {he:'נדיר',        lvl:6,  color:'#1E4F8A'},
  vrare:    {he:'נדיר מאוד',   lvl:10, color:'#6B2E8A'},
  legend:   {he:'אגדי',        lvl:15, color:'#9A5B00'}
};
const SLOTS = {
  weapon:{he:'נשק'}, armor:{he:'שריון'}, shield:{he:'מגן'}, cloak:{he:'גלימה'}, head:{he:'ראש'},
  hands:{he:'ידיים'}, ring:{he:'טבעת'}, neck:{he:'צוואר'}, feet:{he:'רגליים'}, trinket:{he:'חפץ'},
  tome:{he:'ספר שדרוג'}, potion:{he:'שיקוי'}
};
const CATS = [
  {k:'weapons', he:'נשקים',            slots:['weapon']},
  {k:'armor',   he:'שריונות ומגנים',   slots:['armor','shield']},
  {k:'wear',    he:'גלימות וקסדות',    slots:['cloak','head','hands','feet']},
  {k:'jewels',  he:'תכשיטים',          slots:['ring','neck']},
  {k:'wonder',  he:'חפצים קסומים',     slots:['trinket','tome']},
  {k:'potions', he:'שיקויים',          slots:['potion']}
];
/* s = stats: a = כוח התקפה, d = הגנה, m = קסם. fx = effect inside the app. look = drawing key. */
const ITEMS = [
  // ---- weapons: mundane ----
  {id:'dagger',      he:'פגיון',             en:'Dagger',              slot:'weapon', r:'mundane', p:30,   s:{a:1},       look:'dagger',  d:'להב קצר וזריז. הנשק הראשון של כל הרפתקן.'},
  {id:'quarterstaff',he:'מטה עץ',            en:'Quarterstaff',        slot:'weapon', r:'mundane', p:30,   s:{a:1,m:1},   look:'staff',   d:'מקל הליכה ארוך שמשמש גם לקרב וגם לכישוף.'},
  {id:'spear',       he:'רומח',              en:'Spear',               slot:'weapon', r:'mundane', p:60,   s:{a:2},       look:'spear',   d:'מוט עם חוד ברזל. פשוט ויעיל.'},
  {id:'shortsword',  he:'חרב קצרה',          en:'Shortsword',          slot:'weapon', r:'mundane', p:80,   s:{a:2},       look:'sword',   d:'חרב קלה ומהירה ליד אחת.'},
  {id:'shortbow',    he:'קשת קצרה',          en:'Shortbow',            slot:'weapon', r:'mundane', p:120,  s:{a:2},       look:'bow',     d:'קשת קלה לציד ולקרב מרחוק.'},
  {id:'longsword',   he:'חרב ארוכה',         en:'Longsword',           slot:'weapon', r:'mundane', p:150,  s:{a:3},       look:'sword',   d:'החרב הקלאסית של אבירים ולוחמים.'},
  {id:'battleaxe',   he:'גרזן קרב',          en:'Battleaxe',           slot:'weapon', r:'mundane', p:150,  s:{a:3},       look:'axe',     d:'להב רחב ומכה כבדה.'},
  {id:'warhammer',   he:'פטיש מלחמה',        en:'Warhammer',           slot:'weapon', r:'mundane', p:170,  s:{a:3,d:1},   look:'hammer',  d:'ראש ברזל כבד ששובר מגנים.'},
  {id:'longbow',     he:'קשת ארוכה',         en:'Longbow',             slot:'weapon', r:'mundane', p:200,  s:{a:4},       look:'bow',     d:'קשת גבוהה שיורה רחוק ובעוצמה.'},
  {id:'greatsword',  he:'חרב דו־ידנית',      en:'Greatsword',          slot:'weapon', r:'mundane', p:250,  s:{a:5},       look:'bigsword',d:'חרב ענקית לשתי ידיים.'},
  // ---- weapons: magic ----
  {id:'weapon1',     he:'חרב +1',            en:'Weapon +1',           slot:'weapon', r:'uncommon',p:400,  s:{a:6},       look:'sword', fxv:'glow',  d:'חרב מכושפת שפוגעת מדויק וחזק יותר.'},
  {id:'javelin',     he:'כידון הברק',        en:'Javelin of Lightning',slot:'weapon', r:'uncommon',p:450,  s:{a:6,m:1},   look:'spear', fxv:'bolt',  d:'כשזורקים אותו הוא הופך לברק.'},
  {id:'wand_mm',     he:'שרביט הקליעים הקסומים', en:'Wand of Magic Missiles', slot:'weapon', r:'uncommon', p:420, s:{a:2,m:5}, look:'wand', fxv:'glow', d:'יורה חיצי אור שאף פעם לא מחטיאים.'},
  {id:'venom',       he:'פגיון הארס',        en:'Dagger of Venom',     slot:'weapon', r:'rare',    p:950,  s:{a:7,m:2},   look:'dagger',fxv:'drip',  d:'הלהב מצפה את עצמו ברעל לפי פקודה.'},
  {id:'mace_dis',    he:'אלת השיבוש',        en:'Mace of Disruption',  slot:'weapon', r:'rare',    p:1100, s:{a:7,d:2},   look:'mace',  fxv:'rays',  d:'זוהרת באור ומבריחה יצורי אופל.'},
  {id:'flame',       he:'לשון להבה',         en:'Flame Tongue',        slot:'weapon', r:'rare',    p:1200, s:{a:9,m:2},   look:'sword', fxv:'flame', d:'במילת פקודה הלהב עולה באש.'},
  {id:'berserker',   he:'גרזן הזעם',         en:'Berserker Axe',       slot:'weapon', r:'rare',    p:1300, s:{a:10},      look:'axe',   fxv:'cracks',d:'גרזן כבד שממלא את מחזיקו בזעם קרב.'},
  {id:'dragonslayer',he:'קוטלת הדרקונים',    en:'Dragon Slayer',       slot:'weapon', r:'rare',    p:1400, s:{a:10,d:1},  look:'sword', fxv:'runes', d:'חרב שנוצרה במיוחד נגד דרקונים.'},
  {id:'wand_fire',   he:'שרביט כדורי האש',   en:'Wand of Fireballs',   slot:'weapon', r:'rare',    p:1500, s:{a:4,m:9},   look:'wand',  fxv:'flame', d:'משחרר כדור אש שמתפוצץ בלהבות.'},
  {id:'sunblade',    he:'להב השמש',          en:'Sun Blade',           slot:'weapon', r:'rare',    p:1600, s:{a:10,m:2},  look:'sword', fxv:'rays',  d:'ניצב בלי להב, שממנו בוקע להב של אור שמש.'},
  {id:'staff_fire',  he:'מטה האש',           en:'Staff of Fire',       slot:'weapon', r:'vrare',   p:2600, s:{a:5,m:13},  look:'staff', fxv:'flame', d:'מטה חרוך שמזמן קירות וכדורי אש.'},
  {id:'oathbow',     he:'קשת השבועה',        en:'Oathbow',             slot:'weapon', r:'vrare',   p:2800, s:{a:13},      look:'bow',   fxv:'runes', d:'קשת שנשבעת לפגוע באויב שבחרת.'},
  {id:'frost',       he:'להב הכפור',         en:'Frost Brand',         slot:'weapon', r:'vrare',   p:3000, s:{a:13,d:2},  look:'sword', fxv:'frost', d:'להב קפוא שמגן מאש ומכבה להבות.'},
  {id:'weapon3',     he:'חרב +3',            en:'Weapon +3',           slot:'weapon', r:'vrare',   p:3500, s:{a:15},      look:'sword', fxv:'glow',  d:'אחת החרבות המכושפות החזקות שיש.'},
  {id:'staff_power', he:'מטה העוצמה',        en:'Staff of Power',      slot:'weapon', r:'vrare',   p:3800, s:{a:7,m:16},  look:'staff', fxv:'orb',   d:'מטה של קוסמים גדולים, מלא אנרגיה טהורה.'},
  {id:'thunder',     he:'פטיש הרעמים',       en:'Hammer of Thunderbolts', slot:'weapon', r:'legend', p:7500, s:{a:18,d:3}, look:'hammer',fxv:'bolt',  d:'פטיש של ענקים שמכה ברעם.'},
  {id:'holy',        he:'הנוקם הקדוש',       en:'Holy Avenger',        slot:'weapon', r:'legend',  p:8000, s:{a:18,d:4,m:4}, look:'sword', fxv:'holy', d:'החרב האגדית של הפלדינים.'},
  {id:'staff_magi',  he:'מטה הקוסם העליון',  en:'Staff of the Magi',   slot:'weapon', r:'legend',  p:9000, s:{a:8,m:22},  look:'staff', fxv:'orb',   d:'המטה החזק ביותר שקוסם יכול להחזיק.'},
  {id:'vorpal',      he:'החרב הכורתת',       en:'Vorpal Sword',        slot:'weapon', r:'legend',  p:9500, s:{a:22},      look:'sword', fxv:'vorpal',d:'להב חד כל כך שהוא חותך כל דבר.'},
  // ---- armor ----
  {id:'leather',     he:'שריון עור',         en:'Leather Armor',       slot:'armor',  r:'mundane', p:40,   s:{d:1},       look:'leather', d:'שריון קל מעור מוקשה.'},
  {id:'studded',     he:'שריון עור משובץ',   en:'Studded Leather',     slot:'armor',  r:'mundane', p:120,  s:{d:2},       look:'studded', d:'עור עם מסמרות ברזל לחיזוק.'},
  {id:'scale',       he:'שריון קשקשים',      en:'Scale Mail',          slot:'armor',  r:'mundane', p:150,  s:{d:3},       look:'scale',   d:'קשקשי מתכת חופפים כמו עור של דג.'},
  {id:'chain',       he:'שריון שרשראות',     en:'Chain Mail',          slot:'armor',  r:'mundane', p:200,  s:{d:4},       look:'chain',   d:'אלפי טבעות ברזל שזורות זו בזו.'},
  {id:'plate',       he:'שריון לוחות',       en:'Plate Armor',         slot:'armor',  r:'mundane', p:450,  s:{d:6},       look:'plate',   d:'לוחות פלדה שמכסים את כל הגוף.'},
  {id:'mithral',     he:'שריון מיתריל',      en:'Mithral Armor',       slot:'armor',  r:'uncommon',p:500,  s:{d:6,a:1},   look:'chain', fxv:'glow', d:'מתכת כסופה וקלה כנוצה.'},
  {id:'armor1',      he:'שריון +1',          en:'Armor +1',            slot:'armor',  r:'rare',    p:1000, s:{d:8},       look:'plate', fxv:'glow', d:'שריון מכושף שמגן טוב יותר.'},
  {id:'elven',       he:'שריון שרשראות אלפי', en:'Elven Chain',        slot:'armor',  r:'rare',    p:1300, s:{d:8,m:1},   look:'chain', fxv:'leaf', d:'מעשה ידי אלפים, דק ושקט.'},
  {id:'robe_stars',  he:'גלימת הכוכבים',     en:'Robe of Stars',       slot:'armor',  r:'vrare',   p:3000, s:{d:5,m:10},  look:'robe',  fxv:'stars',d:'גלימה כהה עם כוכבים שאפשר לזרוק.'},
  {id:'dragonscale', he:'שריון קשקשי דרקון', en:'Dragon Scale Mail',   slot:'armor',  r:'vrare',   p:3200, s:{d:12,m:2},  look:'scale', fxv:'dragon',d:'עשוי מקשקשים של דרקון אמיתי.'},
  {id:'dwarven',     he:'שריון לוחות גמדי',  en:'Dwarven Plate',       slot:'armor',  r:'vrare',   p:3600, s:{d:14},      look:'plate', fxv:'runes',d:'נחשל במכרות הגמדים, כמעט בלתי חדיר.'},
  {id:'archmagi',    he:'גלימת הארכי־מכשף',  en:'Robe of the Archmagi',slot:'armor',  r:'legend',  p:8000, s:{d:8,m:20},  look:'robe',  fxv:'runes',d:'הגלימה של גדולי הקוסמים.'},
  {id:'invuln',      he:'שריון האלמוות',     en:'Armor of Invulnerability', slot:'armor', r:'legend', p:8500, s:{d:20}, look:'plate', fxv:'holy', d:'שריון שכמעט שום דבר לא חודר אותו.'},
  // ---- shields ----
  {id:'shield',      he:'מגן',               en:'Shield',              slot:'shield', r:'mundane', p:50,   s:{d:2},       look:'shield',  d:'מגן עץ מחוזק בברזל.'},
  {id:'shield1',     he:'מגן +1',            en:'Shield +1',           slot:'shield', r:'uncommon',p:400,  s:{d:4},       look:'shield', fxv:'glow', d:'מגן מכושף שהודף מכות.'},
  {id:'arrowcatch',  he:'מגן לוכד החצים',    en:'Arrow-Catching Shield', slot:'shield', r:'rare', p:1100, s:{d:6},      look:'shield', fxv:'arrows', d:'מושך אליו חצים כדי להגן עליך.'},
  {id:'animated',    he:'המגן המרחף',        en:'Animated Shield',     slot:'shield', r:'vrare',   p:2800, s:{d:9},       look:'shield', fxv:'float',d:'מרחף לידך ומגן בלי שתחזיק אותו.'},
  {id:'spellguard',  he:'מגן שומר הלחשים',   en:'Spellguard Shield',   slot:'shield', r:'vrare',   p:3000, s:{d:8,m:4},   look:'shield', fxv:'runes',d:'מגן מפני לחשים וכישופים.'},
  // ---- cloaks / head / hands / feet ----
  {id:'cloak_elf',   he:'גלימת בני האלפים',  en:'Cloak of Elvenkind',  slot:'cloak',  r:'uncommon',p:450,  s:{d:1,m:2},   look:'cloak', fxv:'leaf', d:'הברדס מסתיר אותך בצללים.'},
  {id:'cloak_prot',  he:'גלימת ההגנה',       en:'Cloak of Protection', slot:'cloak',  r:'uncommon',p:500,  s:{d:3},       look:'cloak',              d:'בד פשוט שמגן כמו שריון.'},
  {id:'cloak_bat',   he:'גלימת העטלף',       en:'Cloak of the Bat',    slot:'cloak',  r:'rare',    p:1200, s:{d:2,m:4},   look:'cloak', fxv:'bat',  d:'בחושך אפשר לעוף איתה כמו עטלף.'},
  {id:'cloak_disp',  he:'גלימת ההעתקה',      en:'Cloak of Displacement',slot:'cloak', r:'rare',    p:1400, s:{d:6},       look:'cloak', fxv:'ghost',d:'יוצרת השתקפות שמבלבלת את האויב.'},
  {id:'wings',       he:'כנפי התעופה',       en:'Wings of Flying',     slot:'cloak',  r:'rare',    p:1600, s:{d:3,a:2},   look:'wings',              d:'גלימה שהופכת לזוג כנפיים.'},
  {id:'helm_lang',   he:'קסדת הבנת השפות',   en:'Helm of Comprehending Languages', slot:'head', r:'uncommon', p:350, s:{m:2}, look:'helm', fx:'goldEn', d:'מבינים כל שפה כתובה ומדוברת.'},
  {id:'circlet',     he:'עטרת הפיצוץ',       en:'Circlet of Blasting', slot:'head',   r:'uncommon',p:400,  s:{a:2,m:2},   look:'circlet',            d:'יורה קרן אור לוהטת.'},
  {id:'headband',    he:'אגד התבונה',        en:'Headband of Intellect', slot:'head', r:'uncommon',p:480,  s:{m:4},       look:'circlet', fx:'goldQn', d:'מחדד את המחשבה ומעלה את התבונה.'},
  {id:'helm_tele',   he:'קסדת הטלפתיה',      en:'Helm of Telepathy',   slot:'head',   r:'uncommon',p:520,  s:{m:3,d:1},   look:'helm', fx:'goldHe',  d:'שומעים את המחשבות של אחרים.'},
  {id:'helm_bril',   he:'קסדת הזוהר',        en:'Helm of Brilliance',  slot:'head',   r:'vrare',   p:3400, s:{d:4,m:9},   look:'helm', fxv:'gems',  d:'משובצת יהלומים, אבני אש ואבני חן.'},
  {id:'ogre',        he:'כפפות כוח הענק',    en:'Gauntlets of Ogre Power', slot:'hands', r:'uncommon', p:480, s:{a:4},   look:'gloves',             d:'נותנות כוח של ענק.'},
  {id:'bracers_arch',he:'צמידי הקשתות',      en:'Bracers of Archery',  slot:'hands',  r:'uncommon',p:450,  s:{a:3},       look:'bracers',            d:'מחזקים כל ירייה בקשת.'},
  {id:'bracers_def', he:'צמידי ההגנה',       en:'Bracers of Defense',  slot:'hands',  r:'rare',    p:1200, s:{d:5},       look:'bracers', fxv:'glow',d:'מגינים גם בלי שריון.'},
  {id:'boots_elf',   he:'מגפי בני האלפים',   en:'Boots of Elvenkind',  slot:'feet',   r:'uncommon',p:400,  s:{d:1,m:1},   look:'boots',              d:'צעדים שקטים לגמרי.'},
  {id:'winged',      he:'מגפיים מכונפים',    en:'Winged Boots',        slot:'feet',   r:'uncommon',p:550,  s:{d:2},       look:'boots', fxv:'wings', d:'כנפיים קטנות שנפרשות לפי פקודה.'},
  {id:'boots_speed', he:'מגפי המהירות',      en:'Boots of Speed',      slot:'feet',   r:'rare',    p:1400, s:{a:3,d:3},   look:'boots', fxv:'speed', d:'נקישת עקב, והמהירות מוכפלת.'},
  // ---- jewels ----
  {id:'medallion',   he:'מדליון המחשבות',    en:'Medallion of Thoughts', slot:'neck', r:'uncommon',p:450,  s:{m:3},       look:'amulet', d:'קורא מחשבות של מי שמולך.'},
  {id:'periapt',     he:'קמע סגירת הפצעים',  en:'Periapt of Wound Closure', slot:'neck', r:'uncommon', p:400, s:{d:3},  look:'amulet', d:'פצעים נסגרים מהר יותר.'},
  {id:'ring_prot',   he:'טבעת ההגנה',        en:'Ring of Protection',  slot:'ring',   r:'rare',    p:1000, s:{d:3,m:1},   look:'ring',   d:'מגינה על העונד מכל כיוון.'},
  {id:'amulet_health',he:'קמע הבריאות',      en:'Amulet of Health',    slot:'neck',   r:'rare',    p:1100, s:{d:5},       look:'amulet', d:'גוף חזק ובריא במיוחד.'},
  {id:'ring_evasion',he:'טבעת ההתחמקות',     en:'Ring of Evasion',     slot:'ring',   r:'rare',    p:1200, s:{d:4,a:1},   look:'ring',   d:'מתחמקים מפיצוצים ברגע האחרון.'},
  {id:'necklace_fire',he:'שרשרת כדורי האש',  en:'Necklace of Fireballs', slot:'neck', r:'rare',    p:1300, s:{a:3,m:4},   look:'amulet', fxv:'flame', d:'כל חרוז הוא כדור אש שאפשר לזרוק.'},
  {id:'ring_invis',  he:'טבעת ההיעלמות',     en:'Ring of Invisibility',slot:'ring',   r:'legend',  p:7000, s:{d:6,m:12},  look:'ring', fxv:'glow', d:'עונדים ונעלמים מהעין.'},
  {id:'ring_wishes', he:'טבעת שלוש המשאלות', en:'Ring of Three Wishes',slot:'ring',   r:'legend',  p:9500, s:{a:5,d:5,m:15}, look:'ring', fxv:'stars', d:'שלוש משאלות. כל אחת משנה את המציאות.'},
  // ---- wondrous / trinkets ----
  {id:'rope',        he:'חבל הטיפוס',        en:'Rope of Climbing',    slot:'trinket',r:'uncommon',p:300,  s:{d:1},       look:'rope',   d:'חבל שמטפס וקושר את עצמו לפי פקודה.'},
  {id:'bag_holding', he:'שק האחזקה',         en:'Bag of Holding',      slot:'trinket',r:'uncommon',p:350,  s:{m:1},       look:'bag',  fx:'potCap', d:'שק קטן שבפנים גדול כמו מחסן.'},
  {id:'luckstone',   he:'אבן המזל',          en:'Stone of Good Luck',  slot:'trinket',r:'uncommon',p:500,  s:{m:2},       look:'stone',fx:'luck',   d:'אבן מלוטשת שמביאה מזל טוב.'},
  {id:'crystal',     he:'כדור הבדולח',       en:'Crystal Ball',        slot:'trinket',r:'vrare',   p:3000, s:{m:8},       look:'orb',  fx:'freeHint', d:'מראה מקומות ואנשים רחוקים.'},
  // ---- tomes (permanent, consumed) ----
  {id:'tome_ex',     he:'ספר האימון הגופני', en:'Manual of Gainful Exercise', slot:'tome', r:'vrare', p:2500, s:{a:3}, look:'book', fx:'permA', d:'קוראים, מתאמנים, ומתחזקים לתמיד.'},
  {id:'tome_health', he:'ספר בריאות הגוף',   en:'Manual of Bodily Health', slot:'tome', r:'vrare', p:2500, s:{d:3},     look:'book', fx:'permD', d:'סודות של גוף חסין ועמיד.'},
  {id:'tome_clear',  he:'ספר המחשבה הצלולה', en:'Tome of Clear Thought', slot:'tome', r:'vrare',  p:2500, s:{m:3},       look:'book', fx:'permM', d:'מחדד את התבונה לצמיתות.'},
  // ---- potions (consumables with real effects in the app) ----
  {id:'p_heal',      he:'שיקוי ריפוי',       en:'Potion of Healing',   slot:'potion', r:'mundane', p:60,   look:'potion', fx:'streak',   d:'מחזיר רצף ימים שנשבר ביום אחד.'},
  {id:'p_clair',     he:'שיקוי ראייה רחוקה', en:'Potion of Clairvoyance', slot:'potion', r:'mundane', p:80, look:'potion', fx:'hint',  d:'בשאלה אחת מוחק שתי תשובות שגויות.'},
  {id:'p_resist',    he:'שיקוי עמידות',      en:'Potion of Resistance',slot:'potion', r:'uncommon',p:100,  look:'potion', fx:'retry',    d:'הטעות הראשונה בסט הבא לא נספרת, ומקבלים ניסיון נוסף.'},
  {id:'p_hero',      he:'שיקוי גבורה',       en:'Potion of Heroism',   slot:'potion', r:'uncommon',p:120,  look:'potion', fx:'x2',       d:'זהב כפול בסט הבא.'},
  {id:'p_giant',     he:'שיקוי כוח הענקים',  en:'Potion of Giant Strength', slot:'potion', r:'rare', p:300, look:'potion', fx:'permA1', d:'מוסיף נקודת כוח התקפה אחת לתמיד.'}
];
const FX = {
  goldEn:  'כל עוד היא עליך: ‎+20% זהב בתרגולי אנגלית',
  goldQn:  'כל עוד הוא עליך: ‎+20% זהב בחשיבה כמותית',
  goldHe:  'כל עוד היא עליך: ‎+20% זהב בחשיבה מילולית',
  luck:    'כל עוד היא אצלך: ‎+10% זהב על כל תשובה נכונה',
  potCap:  'אפשר להחזיק 20 שיקויים מכל סוג במקום 5',
  freeHint:'רמז אחד חינם בכל יום (כמו שיקוי ראייה רחוקה)',
  permA:   'שדרוג קבוע: ‎+3 כוח התקפה',
  permD:   'שדרוג קבוע: ‎+3 הגנה',
  permM:   'שדרוג קבוע: ‎+3 קסם',
  streak:  'שימוש: משחזר את הרצף אם פספסת יום אחד',
  hint:    'שימוש: בתוך שאלה, מוחק שתי תשובות שגויות',
  retry:   'שימוש: לפני סט, הטעות הראשונה מקבלת ניסיון נוסף',
  x2:      'שימוש: לפני סט, כל הזהב בסט מוכפל',
  permA1:  'שימוש: ‎+1 כוח התקפה לתמיד'
};
const EARN = [
  ['תשובה נכונה', '4'], ['תשובה נכונה בשאלה ברמה גבוהה', '6'], ['תשובה שגויה (על המאמץ)', '1'],
  ['סיום סט תרגול', '10'], ['סט בלי טעויות', '+15'], ['סימולציה של פרק מלא', '+30'],
  ['כרטיס מילה', '1 · זכרת: 2'], ['סיום התרגול היומי', '+25'],
  ['פרק ממבחן עבר', '25 + 2 לכל תשובה נכונה'], ['בונוס רצף, פעם ביום', '5 לכל יום ברצף, עד 50']
];
const CLASSES = [
  {k:'fighter', he:'לוחם / לוחמת',  en:'Fighter', start:['longsword','chain'],      focus:'התקפה והגנה', titles:['טירון','שכיר חרב','לוחם','אביר','גיבור','אגדה']},
  {k:'paladin', he:'פלדין / פלדינית', en:'Paladin', start:['warhammer','shield'],    focus:'הגנה ואור',   titles:['מועמד','נשבע','פלדין','אביר קדוש','מגן האור','אלוף האור']},
  {k:'wizard',  he:'קוסם / קוסמת',  en:'Wizard',  start:['quarterstaff','leather'],  focus:'קסם',         titles:['שוליה','לחשן','מכשף','קוסם','ארכי־מכשף','קוסם עליון']},
  {k:'ranger',  he:'סייר / סיירת',  en:'Ranger',  start:['shortbow','leather'],      focus:'התקפה וזריזות',titles:['גשש','צייד','סייר','שומר היער','צל היער','אגדת היער']}
];
const LEVEL_BANDS = [[1,2],[3,5],[6,9],[10,14],[15,19],[20,99]];
function levelFor(xp){ return Math.floor(Math.sqrt(xp / 40)) + 1; }
function xpFor(level){ return 40 * (level - 1) * (level - 1); }
/* ---- expansion: more SRD 5.1 items + original items (src:'orig') ---- */
SLOTS.waist = {he:'חגורה'}; SLOTS.pet = {he:'חיית לוויה'}; SLOTS.scene = {he:'רקע'};
CATS.find(c => c.k === 'wear').slots.push('waist');
CATS.splice(CATS.findIndex(c => c.k === 'potions'), 0, {k:'pets', he:'חיות לוויה', slots:['pet']});
CATS.push({k:'scenes', he:'רקעים', slots:['scene']});
Object.assign(FX, {
  goldRead:  'כל עוד הוא אצלך: ‎+20% זהב בהבנת הנקרא',
  goldGeo:   'כל עוד היא אצלך: ‎+20% זהב בגאומטריה',
  goldWords: 'כל עוד הוא אצלך: זהב כפול על כרטיסי מילים',
  goldSim:   'כל עוד הוא אצלך: ‎+20% זהב בסימולציות ובמבחני עבר',
  goldAll5:  'כל עוד הוא איתך: ‎+5% זהב על הכול',
  goldAll10: 'כל עוד הוא איתך: ‎+10% זהב על הכול',
  streakX:   'כל עוד הוא איתך: בונוס הרצף היומי כפול',
  hintDay2:  'שני רמזים חינם בכל יום',
  x15:       'שימוש: ‎+50% זהב בסט הבא',
  x3past:    'שימוש: זהב משולש על פרק אחד ממבחן עבר',
  timer3:    'שימוש: ‎+3 דקות לזמן היעד בסימולציה הבאה',
  permD1:    'שימוש: ‎+1 הגנה לתמיד',
  permM1:    'שימוש: ‎+1 קסם לתמיד',
  scene:     'רקע לעמוד הדמות',
  luck5:     'כל עוד היא עליך: ‎+5% זהב על כל תשובה נכונה'
});
ITEMS.forEach(i => { i.src = i.src || 'srd'; });
ITEMS.push(
  // ---- more SRD weapons ----
  {id:'trident',     he:'קלשון שליטת הדגים', en:'Trident of Fish Command', slot:'weapon', r:'uncommon', p:380, s:{a:5,m:1}, look:'trident', d:'קלשון שיצורי הים מצייתים לו.'},
  {id:'wand_web',    he:'שרביט הקורים',      en:'Wand of Web',         slot:'weapon', r:'uncommon',p:400,  s:{a:1,m:4},   look:'wand',  d:'יורה רשת דביקה של קורי עכביש.'},
  {id:'vicious',     he:'החרב האכזרית',      en:'Vicious Weapon',      slot:'weapon', r:'rare',    p:1000, s:{a:9},       look:'sword', fxv:'cracks', d:'פגיעה מדויקת שלה כואבת כפליים.'},
  {id:'staff_heal',  he:'מטה הריפוי',        en:'Staff of Healing',    slot:'weapon', r:'rare',    p:1050, s:{a:2,d:3,m:6}, look:'staff', fxv:'rays', d:'מרפא פצעים במגע.'},
  {id:'mace_smite',  he:'אלת ההכרעה',        en:'Mace of Smiting',     slot:'weapon', r:'rare',    p:1150, s:{a:9,d:1},   look:'mace',  d:'מכה שמנפצת שריונות ומבנים.'},
  {id:'wounding',    he:'חרב הפציעה',        en:'Sword of Wounding',   slot:'weapon', r:'rare',    p:1200, s:{a:9},       look:'sword', fxv:'drip', d:'פצעים ממנה לא נסגרים בקלות.'},
  {id:'giantslayer', he:'קוטל הענקים',       en:'Giant Slayer',        slot:'weapon', r:'rare',    p:1300, s:{a:10},      look:'axe',   fxv:'runes', d:'גרזן שענקים מפחדים ממנו.'},
  {id:'wand_light',  he:'שרביט הברקים',      en:'Wand of Lightning Bolts', slot:'weapon', r:'rare', p:1450, s:{a:4,m:8}, look:'wand',  fxv:'bolt', d:'משחרר קו ישר של ברק מסנוור.'},
  {id:'woodlands',   he:'מטה היערות',        en:'Staff of the Woodlands', slot:'weapon', r:'rare', p:1500, s:{a:3,m:8},   look:'staff', fxv:'leaf', d:'מדבר עם צמחים והופך לעץ ענק.'},
  {id:'lifesteal',   he:'חרב גוזלת החיים',   en:'Sword of Life Stealing', slot:'weapon', r:'rare', p:1550, s:{a:10,d:1},  look:'sword', fxv:'drip', d:'שואבת כוח מכל אויב שהיא פוגעת בו.'},
  {id:'scimitar',    he:'חרב המהירות',       en:'Scimitar of Speed',   slot:'weapon', r:'vrare',   p:2700, s:{a:12,d:1},  look:'scimitar', fxv:'speed', d:'להב מעוקל וקל, מהיר מכל אויב.'},
  {id:'staff_frost', he:'מטה הכפור',         en:'Staff of Frost',      slot:'weapon', r:'vrare',   p:2900, s:{a:5,m:13},  look:'staff', fxv:'frost', d:'מטה קפוא שמזמן סופות שלג.'},
  {id:'dancing',     he:'החרב המרחפת',       en:'Dancing Sword',       slot:'weapon', r:'vrare',   p:3100, s:{a:13},      look:'sword', fxv:'float', d:'נלחמת לבד באוויר לצידך.'},
  {id:'thrower',     he:'פטיש הגמדים המעופף',en:'Dwarven Thrower',     slot:'weapon', r:'vrare',   p:3200, s:{a:13,d:1},  look:'hammer',fxv:'runes', d:'נזרק אל האויב וחוזר ליד.'},
  {id:'staff_thunder',he:'מטה הרעם והברק',   en:'Staff of Thunder and Lightning', slot:'weapon', r:'vrare', p:3400, s:{a:8,m:12}, look:'staff', fxv:'bolt', d:'מוריד ברקים ורעמים לפי פקודה.'},
  {id:'sharpness',   he:'חרב החדות',         en:'Sword of Sharpness',  slot:'weapon', r:'vrare',   p:3600, s:{a:15},      look:'sword', fxv:'glow', d:'חותכת כל דבר כמו דף נייר.'},
  {id:'ninelives',   he:'גונבת תשעת החיים',  en:'Nine Lives Stealer',  slot:'weapon', r:'vrare',   p:3900, s:{a:16},      look:'sword', fxv:'runes', d:'להב אפל עם תשעה חריצים.'},
  {id:'luckblade',   he:'להב המזל',          en:'Luck Blade',          slot:'weapon', r:'legend',  p:7200, s:{a:14,m:6},  look:'sword', fxv:'stars', fx:'luck5', d:'חרב שמביאה מזל לבעליה.'},
  {id:'defender',    he:'המגינה',            en:'Defender',            slot:'weapon', r:'legend',  p:7800, s:{a:15,d:8},  look:'sword', fxv:'holy', d:'חרב שהופכת התקפה להגנה.'},
  {id:'lordly',      he:'שבט האדנות',        en:'Rod of Lordly Might', slot:'weapon', r:'legend',  p:8800, s:{a:16,d:4,m:6}, look:'mace', fxv:'gems', d:'שרביט מלכותי שהופך לכל נשק.'},
  // ---- more SRD armor ----
  {id:'adamantine',  he:'שריון אדמנטין',     en:'Adamantine Armor',    slot:'armor',  r:'uncommon',p:550,  s:{d:7},       look:'plate', fxv:'cracks', d:'המתכת הקשה בעולם. שום מכה לא סודקת אותו.'},
  {id:'glamoured',   he:'שריון העור המכושף', en:'Glamoured Studded Leather', slot:'armor', r:'rare', p:950, s:{d:5,m:3}, look:'studded', fxv:'glow', d:'נראה כמו כל בגד שתבחר.'},
  {id:'resistance',  he:'שריון העמידות',     en:'Armor of Resistance', slot:'armor',  r:'rare',    p:1250, s:{d:9},       look:'chain', fxv:'runes', d:'מגן מסוג אחד של נזק, כמו אש או קור.'},
  {id:'robe_eyes',   he:'גלימת העיניים',     en:'Robe of Eyes',        slot:'armor',  r:'rare',    p:1350, s:{d:4,m:7},   look:'robe',  fxv:'eyes', d:'עשרות עיניים רקומות שרואות לכל הכיוונים.'},
  {id:'demon',       he:'שריון השד',         en:'Demon Armor',         slot:'armor',  r:'vrare',   p:3300, s:{d:12,a:3},  look:'plate', fxv:'cracks', d:'שריון אפל עם כפפות בצורת טפרים.'},
  {id:'ethereal',    he:'שריון הלוחות הערפילי', en:'Plate Armor of Etherealness', slot:'armor', r:'legend', p:8200, s:{d:18,m:4}, look:'plate', fxv:'ghost', d:'מאפשר לעבור לעולם הערפל, דרך קירות.'},
  {id:'shield2',     he:'מגן +2',            en:'Shield +2',           slot:'shield', r:'rare',    p:1100, s:{d:6},       look:'shield', fxv:'glow', d:'מגן מכושף חזק עוד יותר.'},
  {id:'shield3',     he:'מגן +3',            en:'Shield +3',           slot:'shield', r:'vrare',   p:3000, s:{d:10},      look:'shield', fxv:'holy', d:'מהמגנים החזקים שנוצרו אי פעם.'},
  // ---- more SRD wear ----
  {id:'goggles',     he:'משקפי הלילה',       en:'Goggles of Night',    slot:'head',   r:'uncommon',p:320,  s:{m:2},       look:'goggles', d:'רואים בחושך כמו ביום.'},
  {id:'hat_disg',    he:'כובע התחפושת',      en:'Hat of Disguise',     slot:'head',   r:'uncommon',p:350,  s:{m:3},       look:'hat',   d:'משנה את המראה שלך לכל דמות.'},
  {id:'eagle',       he:'עיני הנשר',         en:'Eyes of the Eagle',   slot:'head',   r:'uncommon',p:380,  s:{a:1,m:2},   look:'goggles', d:'עדשות שרואות פרטים קטנים מרחוק.'},
  {id:'helm_tele2',  he:'קסדת ההשתגרות',     en:'Helm of Teleportation', slot:'head', r:'rare',    p:1400, s:{d:2,m:6},   look:'helm',  fxv:'stars', d:'קופצים ממקום למקום בהרף עין.'},
  {id:'manta',       he:'גלימת הטריגון',     en:'Cloak of the Manta Ray', slot:'cloak', r:'uncommon', p:420, s:{d:2,m:1}, look:'cloak', d:'נושמים מתחת למים ושוחים כמו דג.'},
  {id:'mountebank',  he:'שכמיית הנוכל',      en:'Cape of the Mountebank', slot:'cloak', r:'rare',  p:1250, s:{d:3,m:4},   look:'cloak', fxv:'ghost', d:'נעלמים בענן עשן ומופיעים במקום אחר.'},
  {id:'arachnida',   he:'גלימת העכביש',      en:'Cloak of Arachnida',  slot:'cloak',  r:'vrare',   p:3000, s:{d:6,m:5},   look:'cloak', fxv:'web',   d:'מטפסים על קירות ותקרות.'},
  {id:'gloves_swim', he:'כפפות השחייה והטיפוס', en:'Gloves of Swimming and Climbing', slot:'hands', r:'uncommon', p:350, s:{a:1,d:1}, look:'gloves', d:'מטפסים ושוחים בקלות.'},
  {id:'belt_dwarf',  he:'חגורת הגמדים',      en:'Belt of Dwarvenkind', slot:'waist',  r:'rare',    p:1150, s:{d:5},       look:'belt',  d:'עמידות של גמד וזקן מפואר.'},
  {id:'belt_giant',  he:'חגורת כוח הענקים',  en:'Belt of Giant Strength', slot:'waist', r:'vrare', p:3500, s:{a:12},      look:'belt',  fxv:'runes', d:'כוח של ענק הררים.'},
  {id:'boots_spring',he:'מגפי הצעד והקפיצה', en:'Boots of Striding and Springing', slot:'feet', r:'uncommon', p:420, s:{a:1,d:1}, look:'boots', d:'קופצים רחוק פי שלושה.'},
  {id:'boots_winter',he:'מגפי ארצות החורף',  en:'Boots of the Winterlands', slot:'feet', r:'uncommon', p:400, s:{d:2}, look:'boots', fxv:'frost', d:'הולכים על שלג וקרח בלי להחליק.'},
  {id:'spider',      he:'נעלי העכביש',       en:'Slippers of Spider Climbing', slot:'feet', r:'uncommon', p:450, s:{d:1,m:1}, look:'boots', fxv:'web', d:'הולכים על קירות.'},
  {id:'levitation',  he:'מגפי הריחוף',       en:'Boots of Levitation', slot:'feet',   r:'rare',    p:1300, s:{d:3,m:2},   look:'boots', fxv:'float', d:'מרחפים באוויר לפי רצון.'},
  // ---- more SRD jewels ----
  {id:'ring_warmth', he:'טבעת החום',         en:'Ring of Warmth',      slot:'ring',   r:'uncommon',p:300,  s:{d:2},       look:'ring',  d:'לא קר אף פעם, גם בשלג.'},
  {id:'ring_water',  he:'טבעת ההליכה על המים', en:'Ring of Water Walking', slot:'ring', r:'uncommon', p:350, s:{d:1,m:1}, look:'ring', d:'הולכים על מים כמו על אדמה.'},
  {id:'ring_mind',   he:'טבעת מגן המחשבה',   en:'Ring of Mind Shielding', slot:'ring', r:'uncommon', p:420, s:{m:3},      look:'ring',  d:'אף אחד לא קורא את המחשבות שלך.'},
  {id:'brooch',      he:'סיכת המגן',         en:'Brooch of Shielding', slot:'neck',   r:'uncommon',p:420,  s:{d:3},       look:'brooch',d:'בולעת קליעים קסומים.'},
  {id:'periapt_h',   he:'קמע הבריאות הקטן',  en:'Periapt of Health',   slot:'neck',   r:'uncommon',p:380,  s:{d:2},       look:'amulet', d:'מגן מפני מחלות.'},
  {id:'adaptation',  he:'שרשרת ההסתגלות',    en:'Necklace of Adaptation', slot:'neck', r:'uncommon', p:400, s:{d:2,m:1}, look:'amulet', d:'נושמים בכל מקום, גם בעשן.'},
  {id:'ring_feather',he:'טבעת הנוצה',        en:'Ring of Feather Falling', slot:'ring', r:'rare',  p:950,  s:{d:3},       look:'ring',  d:'נופלים לאט כמו נוצה.'},
  {id:'ring_free',   he:'טבעת התנועה החופשית', en:'Ring of Free Action', slot:'ring',  r:'rare',    p:1100, s:{a:2,d:2},   look:'ring',  d:'שום כישוף לא משתק אותך.'},
  {id:'ring_store',  he:'טבעת אגירת הלחשים', en:'Ring of Spell Storing', slot:'ring', r:'rare',    p:1350, s:{m:6},       look:'ring',  fxv:'glow', d:'שומרת לחשים לשימוש מאוחר יותר.'},
  {id:'ring_regen',  he:'טבעת ההתחדשות',     en:'Ring of Regeneration',slot:'ring',   r:'vrare',   p:3200, s:{d:8,m:2},   look:'ring',  fxv:'leaf', d:'פצעים נרפאים מעצמם.'},
  {id:'ring_stars',  he:'טבעת הכוכבים הנופלים', en:'Ring of Shooting Stars', slot:'ring', r:'vrare', p:3400, s:{a:4,m:9}, look:'ring', fxv:'stars', d:'מזמנת כדורי אור וכוכבים נופלים.'},
  {id:'planes',      he:'קמע המישורים',      en:'Amulet of the Planes',slot:'neck',   r:'vrare',   p:3300, s:{m:11},      look:'amulet', fxv:'stars', d:'פותח שער לעולמות אחרים.'},
  {id:'scarab',      he:'חרפושית ההגנה',     en:'Scarab of Protection',slot:'neck',   r:'legend',  p:7600, s:{d:14,m:6},  look:'scarab', fxv:'holy', d:'מגינה מכישופים אפלים במיוחד.'},
  {id:'talisman',    he:'קמע הטוב הטהור',    en:'Talisman of Pure Good', slot:'neck', r:'legend',  p:8400, s:{d:8,m:14},  look:'amulet', fxv:'holy', d:'סמל של אור שמבריח כל רוע.'},
  // ---- more SRD wondrous ----
  {id:'decanter',    he:'קנקן המים האינסופיים', en:'Decanter of Endless Water', slot:'trinket', r:'uncommon', p:300, s:{m:1}, look:'potion', d:'שופך מים בלי סוף.'},
  {id:'bag_tricks',  he:'שק התעלולים',       en:'Bag of Tricks',       slot:'trinket',r:'uncommon',p:380,  s:{m:2},       look:'bag',   d:'שולפים ממנו חיה מפתיעה.'},
  {id:'lantern',     he:'פנס הגילוי',        en:'Lantern of Revealing',slot:'trinket',r:'uncommon',p:400,  s:{m:3},       look:'lantern', d:'האור שלו חושף דברים בלתי נראים.'},
  {id:'immovable',   he:'המוט הנייח',        en:'Immovable Rod',       slot:'trinket',r:'uncommon',p:420,  s:{d:2},       look:'rod',   d:'לוחצים על כפתור והוא נעצר באוויר.'},
  {id:'pearl',       he:'פנינת העוצמה',      en:'Pearl of Power',      slot:'trinket',r:'uncommon',p:450,  s:{m:4},       look:'pearl', d:'מחזירה לקוסם לחש שנוצל.'},
  {id:'broom',       he:'מטאטא התעופה',      en:'Broom of Flying',     slot:'trinket',r:'uncommon',p:520,  s:{d:1,m:3},   look:'broom', d:'עפים עליו לכל מקום.'},
  {id:'ioun',        he:'אבן איון',          en:'Ioun Stone',          slot:'trinket',r:'rare',    p:1200, s:{m:6},       look:'stone', fxv:'float', d:'אבן קטנה שמרחפת סביב הראש.'},
  {id:'chime',       he:'פעמון הפתיחה',      en:'Chime of Opening',    slot:'trinket',r:'rare',    p:1000, s:{m:4},       look:'bell',  d:'צלצול אחד פותח כל מנעול.'},
  {id:'cube',        he:'קוביית הכוח',       en:'Cube of Force',       slot:'trinket',r:'rare',    p:1350, s:{d:6},       look:'cube',  d:'יוצרת קיר שקוף בלתי חדיר.'},
  {id:'portable',    he:'החור הנייד',        en:'Portable Hole',       slot:'trinket',r:'rare',    p:1400, s:{m:5},       look:'hole',  fx:'potCap', d:'בד שחור שנפרש לבור עמוק.'},
  {id:'horn',        he:'קרן ואלהאלה',       en:'Horn of Valhalla',    slot:'trinket',r:'rare',    p:1500, s:{a:6},       look:'horn',  d:'תוקעים, ולוחמי רוח באים לעזור.'},
  {id:'fortress',    he:'המבצר המיידי',      en:'Instant Fortress',    slot:'trinket',r:'rare',    p:1600, s:{d:8},       look:'castle',d:'קוביה קטנה שגדלה למגדל אבן.'},
  {id:'carpet',      he:'שטיח מעופף',        en:'Carpet of Flying',    slot:'trinket',r:'vrare',   p:3200, s:{d:3,m:8},   look:'carpet',d:'שטיח שטס מעל הרים וימים.'},
  {id:'deck',        he:'חפיסת הדברים הרבים', en:'Deck of Many Things',slot:'trinket',r:'legend',  p:9000, s:{a:6,d:6,m:6}, look:'cards', fxv:'stars', d:'כל קלף משנה את הגורל, לטוב או לרע.'},
  {id:'tome_lead',   he:'ספר המנהיגות',      en:'Tome of Leadership and Influence', slot:'tome', r:'vrare', p:2500, s:{d:2,m:1}, look:'book', fx:'permD', d:'סודות של מנהיגים גדולים.'},
  {id:'tome_quick',  he:'ספר זריזות הפעולה', en:'Manual of Quickness of Action', slot:'tome', r:'vrare', p:2500, s:{a:3}, look:'book', fx:'permA', d:'תנועות מהירות כמו של חתול.'},
  {id:'tome_under',  he:'ספר ההבנה',         en:'Tome of Understanding', slot:'tome', r:'vrare',   p:2500, s:{m:3},       look:'book', fx:'permM', d:'חוכמה עמוקה שנשארת לתמיד.'},
  // ---- more SRD potions ----
  {id:'p_climb',     he:'שיקוי טיפוס',       en:'Potion of Climbing',  slot:'potion', r:'mundane', p:70,   look:'potion', fx:'x15',    d:'מטפסים בקלות כמו עכביש.'},
  {id:'p_growth',    he:'שיקוי צמיחה',       en:'Potion of Growth',    slot:'potion', r:'uncommon',p:180,  look:'potion', fx:'permD1', d:'גדלים לגובה של ענק לזמן מה.'},
  {id:'p_speed',     he:'שיקוי מהירות',      en:'Potion of Speed',     slot:'potion', r:'rare',    p:220,  look:'potion', fx:'timer3', d:'הכול סביבך נראה איטי.'},
  {id:'p_flying',    he:'שיקוי תעופה',       en:'Potion of Flying',    slot:'potion', r:'rare',    p:260,  look:'potion', fx:'x3past', d:'עפים באוויר לכמה דקות.'},
  {id:'p_mind',      he:'שיקוי קריאת מחשבות', en:'Potion of Mind Reading', slot:'potion', r:'rare', p:300, look:'potion', fx:'permM1', d:'שומעים את המחשבות של אחרים.'},
  // ---- original items, inspired by the genre (written for this app) ----
  {id:'o_quill',     he:'נוצת הסופר הנודד',  en:'Wanderer\'s Quill',   slot:'trinket',r:'uncommon',p:480,  s:{m:3},       look:'quill', fx:'goldRead', src:'orig', d:'נוצה שכותבת לבד את מה שקראת.'},
  {id:'o_compass',   he:'מחוגת המשרטט',      en:'Cartographer\'s Compass', slot:'trinket', r:'uncommon', p:480, s:{m:3},  look:'compass', fx:'goldGeo', src:'orig', d:'מחוגה מכסף שמודדת כל זווית ומרחק.'},
  {id:'o_lexicon',   he:'מילון הלחשים',      en:'Lexicon of Whispers', slot:'trinket',r:'rare',    p:1100, s:{m:5},       look:'book',  fx:'goldWords', src:'orig', d:'ספר קטן שלוחש לך פירוש של כל מילה.'},
  {id:'o_hourglass', he:'שעון החול של הבוחן',en:'Examiner\'s Hourglass', slot:'trinket', r:'rare', p:1300, s:{d:2,m:4}, look:'hourglass', fx:'goldSim', src:'orig', d:'החול בו זורם לאט יותר בזמן מבחן.'},
  {id:'o_inkblade',  he:'להב הדיו',          en:'Inkblade',            slot:'weapon', r:'legend',  p:9200, s:{a:16,m:8},  look:'sword', fxv:'ink', src:'orig', d:'נחשל מדיו של אלף ספרים. כל מכה כותבת סיפור.'},
  {id:'o_dawnbow',   he:'קשת השחר',          en:'Dawnbow',             slot:'weapon', r:'vrare',   p:3300, s:{a:12,m:3},  look:'bow',   fxv:'rays', src:'orig', d:'החצים שלה בוערים באור הבוקר הראשון.'},
  {id:'o_owlstaff',  he:'מטה הינשוף',        en:'Owlstaff',            slot:'weapon', r:'rare',    p:1250, s:{a:3,m:9},   look:'staff', fxv:'owl', src:'orig', d:'מטה עם ראש ינשוף מגולף שפוקח עיניים בלילה.'},
  {id:'o_northaxe',  he:'גרזן הצפון',        en:'Axe of the North',    slot:'weapon', r:'uncommon',p:520,  s:{a:7},       look:'axe',   fxv:'frost', src:'orig', d:'גרזן כפור מהרים שאין בהם קיץ.'},
  {id:'o_inkscale',  he:'שריון קשקשי הדיו',  en:'Inkscale Mail',       slot:'armor',  r:'vrare',   p:3400, s:{d:12,m:3},  look:'scale', fxv:'ink', src:'orig', d:'כל קשקש בו הוא טיפת דיו שהתקשתה.'},
  {id:'o_scholar',   he:'גלימת המלומד',      en:'Scholar\'s Robe',     slot:'armor',  r:'uncommon',p:450,  s:{d:2,m:4},   look:'robe',  src:'orig', d:'גלימה עם כיסים לעשרה ספרים.'},
  {id:'o_bookshield',he:'מגן הספר',          en:'Tomeguard',           slot:'shield', r:'rare',    p:1200, s:{d:6,m:2},   look:'shield', fxv:'book', src:'orig', d:'מגן בצורת ספר סגור. אף לחש לא חודר אותו.'},
  {id:'o_glasses',   he:'משקפי הלומד',       en:'Spectacles of Study', slot:'head',   r:'uncommon',p:420,  s:{m:4},       look:'glasses', src:'orig', d:'רואים כל אות קטנה, גם בחושך.'},
  {id:'o_laurel',    he:'זר הדפנה של החכמים',en:'Sage\'s Laurel',      slot:'head',   r:'legend',  p:7400, s:{d:4,m:16},  look:'laurel', fx:'goldAll10', src:'orig', d:'ניתן רק למי שסיים את המסע הארוך.'},
  {id:'o_streakband',he:'צמיד הרצף',         en:'Band of the Unbroken',slot:'hands',  r:'rare',    p:1300, s:{d:3,m:2},   look:'bracers', fx:'streakX', src:'orig', d:'כל יום ברצף מוסיף לו קו זהב.'},
  {id:'o_seeingstone',he:'אבן הרואה',        en:'Seer\'s Stone',       slot:'trinket',r:'vrare',   p:3200, s:{m:9},       look:'orb',   fx:'hintDay2', src:'orig', d:'מראה את הדרך הנכונה, פעמיים ביום.'},
  // ---- companions (original) ----
  {id:'pet_owl',     he:'ינשוף חכם',         en:'Wise Owl',            slot:'pet',    r:'uncommon',p:500,  s:{m:2},       look:'owl',   fx:'goldAll5', src:'orig', d:'הינשוף של האפליקציה. יושב לך על הכתף ולומד איתך.'},
  {id:'pet_cat',     he:'חתול שחור',         en:'Black Cat',           slot:'pet',    r:'mundane', p:200,  s:{d:1},       look:'cat',   src:'orig', d:'שקט, סקרן, ותמיד נוחת על הרגליים.'},
  {id:'pet_raven',   he:'עורב שליח',         en:'Messenger Raven',     slot:'pet',    r:'uncommon',p:420,  s:{m:2},       look:'raven', src:'orig', d:'מביא הודעות מכל מקום בממלכה.'},
  {id:'pet_fox',     he:'שועל ערמומי',       en:'Clever Fox',          slot:'pet',    r:'uncommon',p:450,  s:{a:1,m:1},   look:'fox',   src:'orig', d:'תמיד מוצא את הדרך הקצרה.'},
  {id:'pet_wolf',    he:'זאב לבן',           en:'White Wolf',          slot:'pet',    r:'rare',    p:1200, s:{a:4,d:2},   look:'wolf',  src:'orig', d:'נאמן עד הסוף ושומר עליך בלילה.'},
  {id:'pet_dragon',  he:'דרקון קטן',         en:'Dragon Whelp',        slot:'pet',    r:'vrare',   p:3500, s:{a:5,d:3,m:5}, look:'dragon', fx:'goldAll10', src:'orig', d:'עוד קטן, אבל כבר יורק ניצוצות.'},
  {id:'pet_griffin', he:'גריפון',            en:'Griffin',             slot:'pet',    r:'legend',  p:8000, s:{a:10,d:6,m:4}, look:'griffin', fx:'streakX', src:'orig', d:'חצי נשר, חצי אריה. אפשר לרכוב עליו.'},
  // ---- scenes (original, cosmetic) ----
  {id:'sc_library',  he:'הספרייה העתיקה',    en:'Ancient Library',     slot:'scene',  r:'mundane', p:150,  look:'library', src:'orig', d:'מדפים עד התקרה ואור של נרות.'},
  {id:'sc_forest',   he:'היער האפל',         en:'Dark Forest',         slot:'scene',  r:'mundane', p:150,  look:'forest',  src:'orig', d:'עצים גבוהים וערפל בין השורשים.'},
  {id:'sc_castle',   he:'חומות הטירה',       en:'Castle Walls',        slot:'scene',  r:'uncommon',p:400,  look:'castle',  src:'orig', d:'מגדלים, דגלים וגשר שרשראות.'},
  {id:'sc_mountain', he:'פסגת ההר',          en:'Mountain Peak',       slot:'scene',  r:'rare',    p:1000, look:'mountain',src:'orig', d:'מעל העננים, עם רוח קרה.'},
  {id:'sc_lair',     he:'מאורת הדרקון',      en:'Dragon\'s Lair',      slot:'scene',  r:'legend',  p:6000, look:'lair',    src:'orig', d:'הרי זהב ועצמות, ועין אחת שנפתחת בחושך.'}
);

if(typeof module !== 'undefined') module.exports = {RARITY, SLOTS, CATS, ITEMS, FX, EARN, CLASSES, LEVEL_BANDS, levelFor, xpFor};
