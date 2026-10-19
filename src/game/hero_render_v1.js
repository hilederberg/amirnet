/* Ink hero renderer: returns an SVG string for a hero with equipped items. viewBox 0 0 260 300. */
const HK = '#111111', HP = '#FBF6EE', HP2 = '#EFE6D6', HG = '#CFC5B3';
function star4(x, y, r, cls){ return '<path class="' + (cls || 'tw') + '" d="M' + x + ' ' + (y - r) + 'C' + (x + r * .18) + ' ' + (y - r * .18) + ' ' + (x + r * .18) + ' ' + (y - r * .18) + ' ' + (x + r) + ' ' + y + 'C' + (x + r * .18) + ' ' + (y + r * .18) + ' ' + (x + r * .18) + ' ' + (y + r * .18) + ' ' + x + ' ' + (y + r) + 'C' + (x - r * .18) + ' ' + (y + r * .18) + ' ' + (x - r * .18) + ' ' + (y + r * .18) + ' ' + (x - r) + ' ' + y + 'C' + (x - r * .18) + ' ' + (y - r * .18) + ' ' + (x - r * .18) + ' ' + (y - r * .18) + ' ' + x + ' ' + (y - r) + 'Z" fill="' + HK + '" style="transform-origin:' + x + 'px ' + y + 'px"/>'; }
function g(cls, inner, extra){ return '<g class="' + cls + '"' + (extra || '') + '>' + inner + '</g>'; }
const S = 'stroke="' + HK + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
const S2 = 'stroke="' + HK + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"';

/* ---------- effects (fxv) drawn around a local origin ---------- */
const FXV = {
  glow: (h) => '<g class="fx-glow">' + star4(-14, -h * .7, 6) + star4(15, -h * .45, 4.5) + star4(-10, -h * .2, 3.5) + '</g>',
  stars: (h) => '<g class="fx-glow">' + star4(-16, -h * .8, 6) + star4(16, -h * .55, 5) + star4(-14, -h * .3, 4) + star4(14, -h * .1, 3.5) + '</g>',
  flame: (h) => '<g class="fx-flame">' + [0, 1, 2, 3].map(i => '<path class="fl fl' + i + '" d="M' + (i % 2 ? 5 : -5) + ' ' + (-h * (.25 + i * .18)) + 'c' + (i % 2 ? 10 : -10) + ' -6 ' + (i % 2 ? 6 : -6) + ' -18 ' + (i % 2 ? 2 : -2) + ' -24c' + (i % 2 ? 8 : -8) + ' 4 ' + (i % 2 ? 10 : -10) + ' 14 ' + (i % 2 ? -2 : 2) + ' 24z" fill="' + HP + '" ' + S2 + ' style="transform-origin:0px ' + (-h * (.25 + i * .18)) + 'px"/>').join('') + '</g>',
  frost: (h) => '<g class="fx-frost">' + [[-15, .75], [14, .5], [-12, .25]].map(([x, f], i) => '<g class="flake" style="animation-delay:' + i * .5 + 's;transform-origin:' + x + 'px ' + (-h * f) + 'px"><path d="M' + (x - 6) + ' ' + (-h * f) + 'h12M' + x + ' ' + (-h * f - 6) + 'v12M' + (x - 4.2) + ' ' + (-h * f - 4.2) + 'l8.4 8.4M' + (x + 4.2) + ' ' + (-h * f - 4.2) + 'l-8.4 8.4" ' + S2 + '/></g>').join('') + '</g>',
  bolt: (h) => '<g class="fx-bolt"><path d="M-14 ' + (-h * .9) + 'l8 12-7 4 10 16-6 3 9 14" fill="none" ' + S2 + '/><path d="M15 ' + (-h * .6) + 'l-7 10 6 3-8 13" fill="none" ' + S2 + '/></g>',
  holy: (h) => '<g class="fx-holy" style="transform-origin:0px ' + (-h * .6) + 'px">' + Array.from({length: 12}, (_, i) => { const a = i * Math.PI / 6, r1 = 20, r2 = 30, cy = -h * .6; return '<path d="M' + (Math.cos(a) * r1).toFixed(1) + ' ' + (cy + Math.sin(a) * r1).toFixed(1) + 'L' + (Math.cos(a) * r2).toFixed(1) + ' ' + (cy + Math.sin(a) * r2).toFixed(1) + '" ' + S2 + '/>'; }).join('') + '</g>',
  rays: (h) => FXV.holy(h),
  runes: (h) => '<g class="fx-runes">' + [.25, .45, .65].map(f => '<path d="M-2 ' + (-h * f) + 'l4 -4m-4 0l4 4" stroke="' + HP + '" stroke-width="1.6" stroke-linecap="round"/>').join('') + '</g>',
  vorpal: (h) => '<path class="fx-swoosh" d="M-30 ' + (-h * .2) + 'Q-38 ' + (-h * 1.05) + ' 22 ' + (-h * .95) + '" fill="none" stroke="' + HK + '" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="6 7"/>',
  drip: (h) => '<g class="fx-drip">' + [0, 1].map(i => '<path class="dr" style="animation-delay:' + i * .9 + 's" d="M' + (i ? 3 : -3) + ' ' + (-h * .5) + 'q-3 5 0 7q3 -2 0 -7z" fill="' + HK + '"/>').join('') + '</g>',
  cracks: (h) => '<path d="M-2 ' + (-h * .3) + 'l3 -6 -2 -5 3 -6M-1 ' + (-h * .6) + 'l2 -5 -2 -4" fill="none" stroke="' + HP + '" stroke-width="1.6"/>' + '<g class="fx-glow">' + star4(14, -h * .5, 4) + '</g>',
  ink: (h) => '<g class="fx-ink">' + [0, 1, 2].map(i => '<circle class="dr" style="animation-delay:' + i * .6 + 's" cx="' + (i - 1) * 7 + '" cy="' + (-h * (.3 + i * .2)) + '" r="' + (3 - i * .5) + '" fill="' + HK + '"/>').join('') + '<path class="fx-swoosh" d="M-22 ' + (-h * .9) + 'q-10 30 4 52" fill="none" stroke="' + HK + '" stroke-width="5" stroke-linecap="round" stroke-dasharray="4 9"/></g>',
  ghost: () => '',
  float: () => '',
  speed: (h) => '<g class="fx-speed"><path d="M18 ' + (-h * .7) + 'h16M22 ' + (-h * .5) + 'h14M18 ' + (-h * .3) + 'h12" ' + S2 + '/></g>',
  leaf: (h) => '<g class="fx-leaf">' + [0, 1].map(i => '<path class="lf" style="animation-delay:' + i * 1.4 + 's" d="M' + (i ? 12 : -14) + ' ' + (-h * (.6 - i * .2)) + 'q6 -6 10 0q-6 6 -10 0z" fill="' + HP2 + '" ' + S2 + '/>').join('') + '</g>',
  orb: (h) => '<g class="fx-orb"><circle cx="0" cy="' + (-h - 8) + '" r="13" fill="none" ' + S2 + ' stroke-dasharray="3 5"/><circle cx="0" cy="' + (-h - 8) + '" r="19" fill="none" ' + S2 + ' stroke-dasharray="2 8"/></g>',
  gems: (h) => '<g class="fx-glow">' + star4(-12, -h * .7, 5) + star4(13, -h * .4, 4) + '</g>',
  dragon: (h) => FXV.cracks(h), eyes: () => '', web: () => '', arrows: () => '', bat: () => '', book: () => '', owl: () => '', wings: () => ''
};

/* ---------- weapons, local coords, grip at 0,0 pointing up ---------- */
function weaponSVG(it){
  const L = it.look, fx = it.fxv;
  let body = '', h = 100, place = 'translate(70 214) rotate(-28)', bob = '';
  const blade = (w, len, tip) => '<path d="M' + (-w) + ' -8V' + (-len) + 'L0 ' + (-len - tip) + 'L' + w + ' ' + (-len) + 'V-8z" fill="' + (fx === 'ink' ? HK : HP2) + '" ' + S + '/><path d="M0 -14V' + (-len + 6) + '" stroke="' + (fx === 'ink' ? HP : HK) + '" stroke-width="1.4" opacity=".7"/>';
  const hilt = (gw) => '<rect x="' + (-gw) + '" y="-11" width="' + gw * 2 + '" height="7" rx="2.5" fill="' + HK + '"/><rect x="-3" y="-4" width="6" height="19" rx="2" fill="' + HK + '"/><circle cx="0" cy="18" r="5" fill="' + HP2 + '" ' + S2 + '/>';
  const haft = (top, bot) => '<rect x="-3.5" y="' + top + '" width="7" height="' + (bot - top) + '" rx="3" fill="' + HP2 + '" ' + S + '/>';
  switch(L){
    case 'sword': h = 104; body = blade(4.5, 92, 12) + hilt(15) + (fx === 'holy' ? '<path d="M-15 -8q-12 -10 -8 -22M15 -8q12 -10 8 -22" fill="none" ' + S + '/>' : ''); break;
    case 'bigsword': h = 128; body = blade(6.5, 114, 14) + hilt(19); break;
    case 'dagger': h = 56; body = blade(3.5, 46, 9) + hilt(11); place = 'translate(70 214) rotate(-35)'; break;
    case 'scimitar': h = 100; body = '<path d="M-4 -8C-8 -40 -2 -80 18 -104C10 -78 6 -44 5 -8z" fill="' + HP2 + '" ' + S + '/>' + hilt(14); break;
    case 'axe': h = 96; body = haft(-92, 24) + '<path d="M3 -88Q36 -94 40 -60Q22 -66 3 -56z" fill="' + HP2 + '" ' + S + '/><path d="M-3 -84Q-18 -82 -20 -68Q-10 -70 -3 -64z" fill="' + HP2 + '" ' + S + '/>'; break;
    case 'hammer': h = 96; body = haft(-82, 24) + '<rect x="-22" y="-100" width="44" height="24" rx="4" fill="' + HP2 + '" ' + S + '/><path d="M-12 -100v24M12 -100v24" ' + S2 + '/>'; break;
    case 'mace': h = 92; body = haft(-72, 24) + '<circle cx="0" cy="-84" r="14" fill="' + HP2 + '" ' + S + '/><path d="M0 -104v6M0 -70v4M-20 -84h6M14 -84h6M-14 -98l4 4M10 -74l4 4M14 -98l-4 4M-10 -74l-4 4" ' + S + '/>'; break;
    case 'spear': h = 140; body = haft(-118, 30) + '<path d="M-9 -116L0 -146L9 -116z" fill="' + HP2 + '" ' + S + '/>'; place = 'translate(70 214) rotate(-12)'; break;
    case 'trident': h = 130; body = haft(-112, 30) + '<path d="M-14 -112h28M-14 -112v-18l-4 4M14 -112v-18l4 4M0 -112v-26" fill="none" ' + S + '/><path d="M-3 -134l3 -8 3 8z" fill="' + HK + '"/>'; place = 'translate(70 214) rotate(-12)'; break;
    case 'staff': h = 128; body = haft(-122, 54) + (fx === 'owl'
      ? '<path d="M-14 -124l4 -8 4 5h12l4 -5 4 8v10c0 8 -6 12 -14 12s-14 -4 -14 -12z" fill="' + HP + '" ' + S + '/><circle cx="-5" cy="-118" r="3.5" fill="' + HK + '" class="blink"/><circle cx="5" cy="-118" r="3.5" fill="' + HK + '" class="blink"/>'
      : '<circle cx="0" cy="-130" r="10" fill="' + (fx === 'orb' ? HP : HP2) + '" ' + S + '/><path d="M-6 -122q6 -10 0 -18M6 -122q-6 -10 0 -18" fill="none" ' + S2 + '/>'); place = 'translate(70 214) rotate(-4)'; break;
    case 'wand': h = 62; body = '<rect x="-3" y="-50" width="6" height="62" rx="3" fill="' + HK + '"/>' + star4(0, -60, 9, 'tw') ; place = 'translate(70 214) rotate(-30)'; break;
    case 'bow': h = 150; body = '<path d="M2 -78Q-48 0 2 78" fill="none" stroke="' + HK + '" stroke-width="6" stroke-linecap="round"/><path d="M2 -78Q-48 0 2 78" fill="none" stroke="' + HP2 + '" stroke-width="2" stroke-linecap="round"/><path d="M2 -78L2 78" stroke="' + HK + '" stroke-width="1.5"/>'; place = 'translate(70 210) rotate(0)'; break;
  }
  if(fx === 'float' || fx === 'ghost') bob = ' bob';
  const eff = fx && FXV[fx] ? FXV[fx](h) : '';
  return '<g transform="' + place + '"><g class="eq w-sway' + bob + '">' + (fx === 'holy' || fx === 'rays' ? eff + body : body + eff) + '</g></g>';
}

/* ---------- shields ---------- */
function shieldSVG(it){
  const fx = it.fxv;
  let s;
  if(fx === 'book') s = '<rect x="-26" y="-34" width="52" height="66" rx="5" fill="' + HP + '" ' + S + '/><path d="M-18 -34v66" ' + S + '/><path d="M2 -10l3 6 7 1-5 5 1 7-6 -3-6 3 1-7-5-5 7-1z" fill="' + HK + '"/>';
  else {
    s = '<path d="M0 -36L30 -27Q30 10 0 36Q-30 10 -30 -27Z" fill="' + HP + '" ' + S + '/>';
    if(fx === 'runes') s += '<circle cx="0" cy="-2" r="14" fill="none" ' + S2 + ' stroke-dasharray="3 4" class="spin"/><path d="M0 -10v16M-8 -2h16" ' + S2 + '/>';
    else if(fx === 'holy') s += '<path d="M0 -26v52M-18 -8h36" stroke="' + HK + '" stroke-width="5"/>';
    else if(fx === 'arrows') s += '<path d="M-6 -6l-20 -16M8 6l18 -10M-2 14l-6 20" ' + S2 + '/><path d="M-26 -22l-3 4M-26 -22l4 -2M26 -4l3 3M26 -4l1 -4" ' + S2 + '/><path d="M0 -24v48M-22 -6h44" ' + S2 + '/>';
    else s += '<path d="M0 -24v48M-22 -6h44" ' + S2 + '/>';
    if(fx === 'glow') s += star4(26, -30, 6);
  }
  const float = fx === 'float' ? ' bob' : '';
  return '<g transform="translate(176 196)"><g class="eq' + float + '">' + s + '</g></g>';
}

/* ---------- armor overlays on the torso ---------- */
function torsoPath(f){ return f ? 'M90 152Q120 142 150 152L146 186L158 224H82L94 186Z' : 'M84 152Q120 140 156 152L160 224H80Z'; }
function armorSVG(it, f){
  const L = it.look, fx = it.fxv, tp = torsoPath(f);
  if(L === 'robe'){
    const dark = it.id === 'archmagi' || it.id === 'robe_stars';
    let r = '<path d="M86 150Q120 140 154 150L176 270H64Z" fill="' + (dark ? HK : HP2) + '" ' + S + '/><path d="M120 152V270" stroke="' + (dark ? HP : HK) + '" stroke-width="2"/><path d="M100 150l20 22 20 -22" fill="none" stroke="' + (dark ? HP : HK) + '" stroke-width="2.4"/>';
    if(dark || fx === 'stars') r += '<g class="fx-glow">' + [[96, 200], [146, 214], [110, 248], [140, 182]].map(([x, y]) => star4(x, y, 5).replace('fill="' + HK + '"', 'fill="' + HP + '"')).join('') + '</g>';
    if(fx === 'eyes') r += [[100, 196], [140, 196], [96, 236], [144, 236], [120, 214]].map(([x, y]) => '<path d="M' + (x - 6) + ' ' + y + 'q6 -6 12 0q-6 6 -12 0z" fill="' + HP + '" ' + S2 + '/><circle cx="' + x + '" cy="' + y + '" r="1.8" fill="' + HK + '" class="blink"/>').join('');
    if(fx === 'runes') r += '<g class="fx-runes">' + [[98, 230], [142, 230], [120, 256]].map(([x, y]) => '<path d="M' + (x - 4) + ' ' + (y - 4) + 'l8 8m-8 0l8 -8M' + x + ' ' + (y - 6) + 'v12" stroke="' + (dark ? HP : HK) + '" stroke-width="1.6"/>').join('') + '</g>';
    return g('eq', r);
  }
  const fills = {leather: HP2, studded: HP2, scale: 'url(#pScale)', chain: 'url(#pChain)', plate: HP2};
  let a = '<path d="' + tp + '" fill="' + (fx === 'ink' ? HK : fills[L] || HP2) + '" ' + S + '/>';
  if(fx === 'ink') a = '<path d="' + tp + '" fill="url(#pScaleInk)" ' + S + '/>';
  if(L === 'leather') a += '<path d="M120 156V222" ' + S2 + ' stroke-dasharray="3 4"/><path d="M92 168h56" ' + S2 + ' stroke-dasharray="3 4"/>';
  if(L === 'studded') a += [[100, 172], [120, 172], [140, 172], [104, 196], [120, 196], [136, 196]].map(([x, y]) => '<circle cx="' + x + '" cy="' + y + '" r="2.4" fill="' + HK + '"/>').join('');
  if(L === 'plate') a += '<path d="M' + (f ? 94 : 84) + ' 184H' + (f ? 146 : 156) + 'M' + (f ? 90 : 82) + ' 202H' + (f ? 150 : 158) + 'M120 150V184" ' + S2 + '/><path d="M106 150q14 10 28 0" fill="none" ' + S + '/>';
  // shoulder pads for heavier armor
  if(L === 'plate' || L === 'scale' || fx === 'dragon') a += '<path d="M72 160q4 -16 22 -12l2 16q-12 2 -24 -4z" fill="' + HP2 + '" ' + S + '/><path d="M168 160q-4 -16 -22 -12l-2 16q12 2 24 -4z" fill="' + HP2 + '" ' + S + '/>';
  if(fx === 'leaf') a += '<g class="fx-leaf"><path d="M104 176q8 -8 14 0q-8 8 -14 0z" fill="' + HP + '" ' + S2 + '/><path d="M124 200q8 -8 14 0q-8 8 -14 0z" fill="' + HP + '" ' + S2 + '/></g>';
  if(fx === 'runes') a += '<g class="fx-runes">' + [[104, 176], [136, 176], [120, 206]].map(([x, y]) => '<path d="M' + (x - 4) + ' ' + (y - 4) + 'l8 8m-8 0l8 -8" stroke="' + HK + '" stroke-width="2"/>').join('') + '</g>';
  if(fx === 'cracks') a += '<path d="M108 166l6 8-4 8 6 8M134 180l-5 7 4 7" fill="none" ' + S2 + '/>';
  if(fx === 'glow' || fx === 'holy') a += '<g class="fx-glow">' + star4(150, 166, 6) + star4(92, 200, 4) + '</g>';
  if(fx === 'holy') a += '<path d="M120 164v30M108 176h24" stroke="' + HK + '" stroke-width="5"/>';
  const ghost = fx === 'ghost' ? '<g class="ghost" opacity=".25"><path d="' + tp + '" fill="' + HP2 + '" ' + S + '/></g>' : '';
  return g('eq', ghost + a);
}

/* ---------- cloak (behind) ---------- */
function cloakBack(it){
  const fx = it.fxv, L = it.look;
  if(L === 'wings') return g('eq wings', '<g class="wingL" style="transform-origin:96px 160px"><path d="M96 160C60 120 18 128 8 150C30 146 40 156 44 166C22 168 14 182 14 194C36 184 52 190 62 200C58 186 74 170 96 176Z" fill="' + HP + '" ' + S + '/><path d="M44 166c14 0 26 2 38 6M62 200c6 -10 16 -18 30 -22" fill="none" ' + S2 + '/></g><g class="wingR" style="transform-origin:144px 160px"><path d="M144 160C180 120 222 128 232 150C210 146 200 156 196 166C218 168 226 182 226 194C204 184 188 190 178 200C182 186 166 170 144 176Z" fill="' + HP + '" ' + S + '/><path d="M196 166c-14 0 -26 2 -38 6M178 200c-6 -10 -16 -18 -30 -22" fill="none" ' + S2 + '/></g>');
  let edge = 'L180 274L60 274Z';
  if(fx === 'bat') edge = 'L180 274Q170 262 160 274Q150 262 140 274Q130 262 120 274Q110 262 100 274Q90 262 80 274Q70 262 60 274Z';
  let c = '<path d="M90 148Q58 214 60 274' + edge.slice(1).replace(/^180/, '') + '" fill="none"/>';
  c = '<path d="M92 146Q48 200 46 274' + (fx === 'bat' ? 'Q58 262 70 274Q82 262 94 274Q106 262 120 274Q134 262 146 274Q158 262 170 274Q182 262 194 274' : 'Q120 282 194 274') + 'Q192 200 148 146Z" fill="' + HK + '" ' + S + '/><path d="M70 200q-4 36 -6 66M170 200q4 36 6 66" stroke="' + HP + '" stroke-width="1.4" opacity=".5" fill="none"/>';
  if(fx === 'web') c += '<path d="M120 160L72 268M120 160L120 272M120 160L168 268M88 216q32 -10 64 0M80 244q40 -12 80 0" fill="none" stroke="' + HP + '" stroke-width="1.3" opacity=".8"/>';
  if(fx === 'leaf') c += '<path d="M70 250q10 -10 18 0q-10 10 -18 0zM150 240q10 -10 18 0q-10 10 -18 0z" fill="' + HP + '"/>';
  if(fx === 'ghost') c = '<g class="ghost" opacity=".3">' + c + '</g>' + c;
  return g('eq cloak', c);
}
function cloakFront(it){ return it.look === 'wings' ? '' : g('eq', '<circle cx="120" cy="152" r="5" fill="' + HP2 + '" ' + S2 + '/>'); }

/* ---------- head gear ---------- */
function headSVG(it){
  const L = it.look, fx = it.fxv;
  let s = '';
  if(L === 'helm'){
    s = '<path d="M78 102Q78 52 120 52Q162 52 162 102H150Q148 74 120 72Q92 74 90 102Z" fill="' + HP2 + '" ' + S + '/><rect x="116" y="70" width="8" height="36" rx="3" fill="' + HP2 + '" ' + S2 + '/><path d="M86 70q34 -18 68 0" fill="none" ' + S2 + '/>';
    if(it.id === 'helm_lang') s += '<path d="M78 84q-16 -8 -22 -24q12 2 18 10q-2 -12 4 -20q6 14 4 28z" fill="' + HP + '" ' + S2 + '/><path d="M162 84q16 -8 22 -24q-12 2 -18 10q2 -12 -4 -20q-6 14 -4 28z" fill="' + HP + '" ' + S2 + '/>';
    else if(fx === 'gems') s += '<path d="M120 54l5 7-5 7-5 -7z" fill="' + HK + '"/>' + '<g class="fx-glow">' + star4(150, 56, 6) + star4(88, 62, 4) + '</g>';
    else if(fx === 'stars') s += '<g class="fx-glow">' + star4(150, 50, 6) + star4(92, 54, 4) + '</g>';
    else s += '<path d="M120 52q2 -14 14 -20q-2 10 -6 20" fill="' + HK + '"/>';
  } else if(L === 'circlet'){
    s = '<path d="M84 82Q120 66 156 82" fill="none" stroke="' + HK + '" stroke-width="5"/><path d="M120 66l6 8-6 8-6 -8z" fill="' + HP2 + '" ' + S2 + '/>' + '<g class="fx-glow">' + star4(134, 64, 4) + '</g>';
  } else if(L === 'hat'){
    s = '<ellipse cx="120" cy="64" rx="52" ry="9" fill="' + HK + '"/><path d="M92 62Q112 40 122 8Q130 36 148 62Z" fill="' + HK + '"/><path d="M122 8q8 -2 12 6" fill="none" ' + S2 + '/>' + star4(112, 44, 5).replace('fill="' + HK + '"', 'fill="' + HP + '"');
  } else if(L === 'goggles'){
    s = '<path d="M80 100H160" stroke="' + HK + '" stroke-width="5"/><circle cx="106" cy="101" r="10" fill="' + HP2 + '" ' + S + '/><circle cx="134" cy="101" r="10" fill="' + HP2 + '" ' + S + '/><path d="M101 97q4 -3 8 0M129 97q4 -3 8 0" fill="none" stroke="' + HP + '" stroke-width="2"/>';
  } else if(L === 'glasses'){
    s = '<circle cx="106" cy="102" r="9" fill="none" ' + S2 + '/><circle cx="134" cy="102" r="9" fill="none" ' + S2 + '/><path d="M115 101q5 -3 10 0M97 100l-14 -4M143 100l14 -4" fill="none" ' + S2 + '/>';
  } else if(L === 'laurel'){
    s = [-1, 1].map(side => [0, 1, 2, 3, 4].map(i => { const a = (200 + i * 22) * Math.PI / 180, x = 120 + side * Math.cos(a) * -44, y = 92 + Math.sin(a) * 40; return '<path d="M' + x.toFixed(1) + ' ' + y.toFixed(1) + 'q' + (side * 6) + ' -8 ' + (side * 12) + ' 0q' + (side * -6) + ' 8 ' + (side * -12) + ' 0z" fill="' + HP + '" ' + S2 + '/>'; }).join('')).join('') + '<g class="fx-glow">' + star4(120, 44, 6) + '</g>';
  }
  return g('eq', s);
}

/* ---------- small slots ---------- */
function neckSVG(it){
  const L = it.look;
  let s = '<path d="M104 150Q120 174 136 150" fill="none" ' + S2 + '/>';
  if(L === 'brooch') s = star4(104, 162, 7).replace('fill="' + HK + '"', 'fill="' + HP2 + '" ' + S2);
  else if(L === 'scarab') s += '<ellipse cx="120" cy="172" rx="7" ry="9" fill="' + HK + '"/><path d="M113 166l-5 -3M127 166l5 -3M113 176l-5 3M127 176l5 3" ' + S2 + '/>';
  else s += '<circle cx="120" cy="172" r="7" fill="' + HP2 + '" ' + S + '/><path d="M120 168l3 4-3 4-3 -4z" fill="' + HK + '"/>';
  if(it.fxv === 'holy' || it.fxv === 'stars' || it.fxv === 'flame') s += '<g class="fx-glow">' + star4(134, 176, 4.5) + '</g>';
  return g('eq', s);
}
function waistSVG(it){ return g('eq', '<path d="M81 204H159V214H81Z" fill="' + HK + '"/><rect x="112" y="201" width="16" height="16" rx="3" fill="' + HP2 + '" ' + S2 + '/>' + (it.fxv === 'runes' ? '<g class="fx-runes"><path d="M92 209h10M138 209h10" stroke="' + HP + '" stroke-width="2"/></g>' : '')); }
function handsSVG(it){
  if(it.look === 'gloves') return g('eq', '<circle cx="70" cy="214" r="10.5" fill="' + HK + '"/><circle cx="170" cy="214" r="10.5" fill="' + HK + '"/><path d="M62 204l16 -4M162 200l16 4" stroke="' + HP2 + '" stroke-width="3"/>');
  return g('eq', '<path d="M64 196l14 3-2 9-14 -3zM162 199l14 -3 2 9-14 3z" fill="' + HP2 + '" ' + S2 + '/>' + (it.id === 'o_streakband' ? '<path d="M66 200l10 2M164 202l10 -2" stroke="' + HK + '" stroke-width="1.6"/>' : '') + (it.fxv === 'glow' ? '<g class="fx-glow">' + star4(56, 196, 4.5) + '</g>' : ''));
}
function ringSVG(it){ return g('eq', '<circle cx="176" cy="218" r="3.4" fill="' + HP2 + '" ' + S2 + '/>' + '<g class="fx-glow">' + star4(184, 210, 5) + '</g>'); }
function feetSVG(it){
  const fx = it.fxv;
  let s = '<path d="M84 238H112V262Q122 262 122 272H80V262Z" fill="' + HK + '"/><path d="M128 238H156V262Q166 262 166 272H124V262Z" fill="' + HK + '" transform="translate(-4 0)"/><path d="M84 242h28M124 242h28" stroke="' + HP2 + '" stroke-width="3"/>';
  if(fx === 'wings') s += '<g class="ankle"><path d="M84 246q-14 -8 -18 -20q10 4 14 10q0 -8 4 -12z" fill="' + HP + '" ' + S2 + '/><path d="M152 246q14 -8 18 -20q-10 4 -14 10q0 -8 -4 -12z" fill="' + HP + '" ' + S2 + '/></g>';
  if(fx === 'speed') s += '<g class="fx-speed"><path d="M60 250h14M56 260h16M60 270h12" ' + S2 + '/></g>';
  if(fx === 'frost') s += '<g class="fx-frost"><g class="flake" style="transform-origin:174px 262px"><path d="M168 262h12M174 256v12" ' + S2 + '/></g></g>';
  if(fx === 'web') s += '<path d="M80 272q-8 -8 -4 -18M166 272q8 -8 4 -18" fill="none" ' + S2 + '/>';
  return g('eq', s);
}
function trinketSVG(it){
  if(typeof ICONS === 'undefined' || !ICONS[it.look]) return '';
  return '<g class="eq"><g class="trinket bob"><circle cx="222" cy="72" r="22" fill="' + HP + '" ' + S + '/><g transform="translate(206 56)" fill="none" stroke="' + HK + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + ICONS[it.look] + '</g></g></g>';
}

/* ---------- pets ---------- */
function petSVG(it){
  const L = it.look;
  const eye = (x, y) => '<circle class="blink" cx="' + x + '" cy="' + y + '" r="2.4" fill="' + HK + '" style="transform-origin:' + x + 'px ' + y + 'px"/>';
  let s = '';
  if(L === 'owl') return g('eq', '<g transform="translate(150 118)"><g class="pet-bob"><path d="M-12 2l4 -8 4 5h8l4 -5 4 8v14c0 9 -6 14 -12 14s-12 -5 -12 -14z" fill="' + HP + '" ' + S + '/><circle cx="-5" cy="8" r="4.5" fill="' + HP + '" ' + S2 + '/><circle cx="5" cy="8" r="4.5" fill="' + HP + '" ' + S2 + '/>' + eye(-5, 8) + eye(5, 8) + '<path d="M-2 13l2 3 2 -3z" fill="' + HK + '"/></g></g>');
  if(L === 'raven') s = '<path d="M-6 0v-6M4 0v-6" ' + S2 + '/><path d="M-22 -14c4 -14 16 -20 28 -16l10 -6-4 9c2 12 -6 20 -20 20l-10 6 2 -9c-4 -1 -6 -2 -6 -4z" fill="' + HK + '" stroke="' + HP + '" stroke-width="1.5"/><circle cx="8" cy="-26" r="2" fill="' + HP + '" class="blink"/><path d="M14 -28l8 3-8 2z" fill="' + HK + '"/>';
  if(L === 'cat') s = '<path d="M-20 0c-2 -16 2 -26 10 -30v-14l8 9h10l8 -9v14c8 4 12 14 10 30z" fill="' + HK + '"/><circle cx="-4" cy="-30" r="2" fill="' + HP + '" class="blink"/><circle cx="8" cy="-30" r="2" fill="' + HP + '" class="blink"/><path class="tail" d="M16 -4c14 2 18 -14 12 -24" fill="none" stroke="' + HK + '" stroke-width="5" stroke-linecap="round" style="transform-origin:16px -4px"/>';
  if(L === 'fox') s = '<path d="M-18 0l-2 -24 6 -18 8 12h12l8 -12 6 18 -2 24z" fill="' + HP + '" ' + S + '/><path d="M-8 -14l8 10 8 -10" fill="none" ' + S2 + '/>' + eye(-7, -24) + eye(7, -24) + '<path class="tail" d="M18 -6c18 0 22 -16 14 -28c-2 12 -8 16 -16 16" fill="' + HP2 + '" ' + S + ' style="transform-origin:18px -6px"/>';
  if(L === 'wolf') s = '<path class="tail" d="M-26 -10c-16 -2 -22 -14 -18 -26" fill="none" stroke="' + HK + '" stroke-width="8" stroke-linecap="round" style="transform-origin:-26px -10px"/><path class="tail" d="M-26 -10c-16 -2 -22 -14 -18 -26" fill="none" stroke="' + HP + '" stroke-width="3.5" stroke-linecap="round" style="transform-origin:-26px -10px"/><path d="M-28 0c-2 -16 2 -28 10 -36l2 -22 8 12 6 -10 4 16c8 4 14 8 22 10c-2 6 -10 8 -18 7c-2 8 -4 16 -2 23z" fill="' + HP + '" ' + S + '/><path d="M24 -21l4 1" ' + S + '/><path d="M-4 -12v12M6 -12v12" ' + S2 + '/>' + eye(4, -42);
  if(L === 'dragon') s = '<g class="wingR2" style="transform-origin:0px -26px"><path d="M0 -26c8 -20 26 -26 34 -20c-8 2 -10 8 -10 12c6 -2 12 2 12 8c-12 -4 -24 2 -36 0z" fill="' + HP2 + '" ' + S2 + '/></g><path d="M-26 0c0 -18 8 -30 22 -30l4 -14 6 12c10 2 16 12 16 24z" fill="' + HP + '" ' + S + '/><path d="M-26 0c-8 -2 -14 -8 -12 -16" fill="none" ' + S + '/>' + eye(10, -32) + '<g class="fx-flame" transform="translate(30 -26) rotate(-60)"><path class="fl fl0" d="M0 0c6 -4 4 -12 0 -16c6 2 8 10 0 16z" fill="' + HP + '" ' + S2 + ' style="transform-origin:0 0"/></g>';
  if(L === 'griffin') s = '<g class="wingR2" style="transform-origin:-4px -34px"><path d="M-4 -34c4 -26 30 -38 44 -30c-10 2 -14 8 -14 14c8 -2 16 2 16 10c-14 -4 -30 4 -46 6z" fill="' + HP + '" ' + S + '/></g><path d="M-30 0c0 -20 8 -34 24 -36l6 -14 10 6 8 -2 -6 12c8 6 10 18 8 34z" fill="' + HP2 + '" ' + S + '/><path d="M14 -46l10 2-8 4" fill="' + HK + '"/>' + eye(8, -40) + '<path class="tail" d="M-30 -8c-12 0 -18 -10 -14 -20" fill="none" ' + S + ' style="transform-origin:-30px -8px"/>';
  return g('eq', '<g transform="translate(204 266) scale(.85)"><g class="pet-bob">' + s + '</g></g>');
}

/* ---------- scenes ---------- */
function sceneSVG(it){
  const st = 'stroke="' + HK + '" stroke-width="2" fill="none" opacity=".22" stroke-linecap="round" stroke-linejoin="round"';
  const L = it.look;
  if(L === 'library') return '<g ' + st + '><path d="M10 40H250M10 110H250M10 180H250"/>' + Array.from({length: 24}, (_, i) => { const x = 16 + i * 10, row = i % 3, y = [40, 110, 180][row]; return '<path d="M' + x + ' ' + y + 'v-' + (24 + (i * 7) % 16) + '"/>'; }).join('') + '<path d="M28 230v40M232 230v40M24 230h8M228 230h8"/></g>';
  if(L === 'forest') return '<g ' + st + '>' + [[24, 260, 1], [62, 250, .8], [200, 258, 1.1], [238, 248, .8]].map(([x, y, k]) => '<path d="M' + x + ' ' + y + 'V' + (y - 30 * k) + 'M' + (x - 22 * k) + ' ' + (y - 30 * k) + 'L' + x + ' ' + (y - 110 * k) + 'L' + (x + 22 * k) + ' ' + (y - 30 * k) + 'Z"/>').join('') + '<path d="M0 270q60 -10 130 0t130 0"/></g>';
  if(L === 'castle') return '<g ' + st + '><path d="M10 270V120h20v14h16v-14h20v150M194 270V120h20v14h16v-14h20v150M66 200h128M66 200v70M194 200v70M110 270v-36a20 20 0 0 1 40 0v36"/><path d="M20 120V86M20 86l14 6-14 6"/></g>';
  if(L === 'mountain') return '<g ' + st + '><path d="M0 250L70 120L110 180L160 90L260 250"/><path d="M146 116l14 -26 14 24-8 -4-6 6z"/><path d="M196 52a12 12 0 1 0 .01 0M30 80q20 -8 40 0M150 50q16 -6 30 0"/></g>';
  if(L === 'lair') return '<g ' + st + '><path d="M0 270C10 120 70 40 130 40S250 120 260 270"/><path d="M60 270q20 -20 40 -6q14 -14 30 -4q18 -16 40 2q20 -12 30 8" /><path d="M110 120q20 -14 40 0q-20 14 -40 0z"/><circle cx="130" cy="120" r="5"/></g>';
  return '';
}

/* ---------- base body ---------- */
function baseBack(f){
  return f ? '<path class="hair" d="M78 102Q74 50 120 50Q166 50 162 102L168 170Q152 180 140 166L142 124H98L100 166Q88 180 72 170Z" fill="' + HK + '" style="transform-origin:120px 60px"/>' : '';
}
function baseBody(f, eqArmor, eqFeet){
  let s = '';
  // legs + shoes
  s += '<path d="M84 222H118L114 264H90Z" fill="' + HP + '" ' + S + '/><path d="M122 222H156L150 264H126Z" fill="' + HP + '" ' + S + '/>';
  if(!eqFeet) s += '<path d="M88 262H114Q120 262 120 270H84Q84 262 88 262Z" fill="' + HK + '"/><path d="M126 262H152Q158 262 158 270H122Q122 262 126 262Z" fill="' + HK + '"/>';
  // arms (behind torso)
  s += '<path d="M92 158Q74 182 70 212" fill="none" stroke="' + HK + '" stroke-width="18" stroke-linecap="round"/><path d="M92 158Q74 182 70 212" fill="none" stroke="' + HP + '" stroke-width="12" stroke-linecap="round"/>';
  s += '<path d="M148 158Q166 182 170 212" fill="none" stroke="' + HK + '" stroke-width="18" stroke-linecap="round"/><path d="M148 158Q166 182 170 212" fill="none" stroke="' + HP + '" stroke-width="12" stroke-linecap="round"/>';
  // torso (tunic)
  s += '<path d="' + torsoPath(f) + '" fill="' + HP + '" ' + S + '/><path d="M110 150l10 13 10 -13" fill="none" ' + S2 + '/><path d="M82 206H158" ' + S2 + '/>';
  return s;
}
function baseHands(){ return '<circle cx="70" cy="214" r="9" fill="' + HP + '" ' + S + '/><circle cx="170" cy="214" r="9" fill="' + HP + '" ' + S + '/>'; }
function baseHead(f, hideHair){
  let s = '<rect x="112" y="128" width="16" height="18" fill="' + HP + '" ' + S + '/>';
  s += '<circle cx="82" cy="104" r="7" fill="' + HP + '" ' + S + '/><circle cx="158" cy="104" r="7" fill="' + HP + '" ' + S + '/>';
  s += '<circle cx="120" cy="98" r="38" fill="' + HP + '" ' + S + '/>';
  s += '<g class="eyes"><ellipse class="blink" cx="106" cy="104" rx="3.4" ry="4.8" fill="' + HK + '" style="transform-origin:106px 104px"/><ellipse class="blink" cx="134" cy="104" rx="3.4" ry="4.8" fill="' + HK + '" style="transform-origin:134px 104px"/></g>';
  s += f ? '<path d="M99 96q7 -4 13 -1M128 95q6 -3 13 1M100 101l-3 -2M140 101l3 -2" fill="none" ' + S2 + '/>' : '<path d="M98 95q8 -5 15 -1M127 94q7 -4 15 1" fill="none" stroke="' + HK + '" stroke-width="3.4" stroke-linecap="round"/>';
  s += '<path d="M120 106q-3 6 1 8" fill="none" ' + S2 + '/><path d="M111 119q9 7 18 0" fill="none" ' + S + '/>';
  s += '<path d="M96 114h5M139 114h5" stroke="' + HG + '" stroke-width="2.4" stroke-linecap="round"/>';
  if(!hideHair){
    s += f ? '<path d="M82 100Q80 56 120 56Q160 56 158 100Q150 76 126 72L120 64L112 74Q94 78 82 100Z" fill="' + HK + '"/>'
           : '<path d="M82 98Q78 56 120 56Q162 56 158 98Q152 80 140 78L136 86L128 76L120 86L112 76L104 86L100 78Q88 82 82 98Z" fill="' + HK + '"/>';
  }
  return s;
}

/* ---------- compose ---------- */
function renderHero(state, itemById){
  const eq = state.eq || {}, f = state.gender === 'f';
  const it = k => eq[k] ? itemById[eq[k]] : null;
  const W = it('weapon'), A = it('armor'), Sh = it('shield'), C = it('cloak'), H = it('head'), Ha = it('hands'), R = it('ring'), N = it('neck'), Fe = it('feet'), Wa = it('waist'), T = it('trinket'), Pe = it('pet'), Sc = it('scene');
  const legend = Object.keys(eq).some(k => eq[k] && itemById[eq[k]] && itemById[eq[k]].r === 'legend' && k !== 'scene');
  const hover = (Fe && Fe.fxv === 'float') || (C && C.look === 'wings') ? ' hover' : '';
  const L = (slot, svg) => svg ? '<g data-slot="' + slot + '">' + svg + '</g>' : '';
  let s = '<svg class="hero-svg" viewBox="0 0 260 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="הדמות שלך">';
  s += '<defs><pattern id="pChain" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="' + HP2 + '"/><circle cx="3.5" cy="3.5" r="2.2" fill="none" stroke="' + HK + '" stroke-width="1.1"/></pattern>' +
       '<pattern id="pScale" width="10" height="8" patternUnits="userSpaceOnUse"><rect width="10" height="8" fill="' + HP2 + '"/><path d="M0 0q5 8 10 0" fill="none" stroke="' + HK + '" stroke-width="1.2"/></pattern>' +
       '<pattern id="pScaleInk" width="10" height="8" patternUnits="userSpaceOnUse"><rect width="10" height="8" fill="' + HK + '"/><path d="M0 0q5 8 10 0" fill="none" stroke="' + HP + '" stroke-width="1.2"/></pattern></defs>';
  if(Sc) s += L('scene', g('eq scene', sceneSVG(Sc)));
  s += '<ellipse cx="120" cy="276" rx="66" ry="7" fill="' + HG + '" opacity=".55" class="shadow' + hover + '"/>';
  if(legend) s += '<g class="aura"><circle cx="120" cy="160" r="112" fill="none" stroke="' + HK + '" stroke-width="1.6" stroke-dasharray="2 10"/><circle cx="120" cy="160" r="100" fill="none" stroke="' + HK + '" stroke-width="1" stroke-dasharray="1 14"/></g>';
  s += '<g class="deco">' + star4(30, 64, 12) + star4(52, 92, 6) + star4(224, 196, 10) + '</g>';
  s += '<g class="body' + hover + '">';
  if(C) s += L('cloak', cloakBack(C));
  s += baseBack(f && !(H && (H.look === 'helm'))) ;
  s += baseBody(f, A, Fe);
  if(Fe) s += L('feet', feetSVG(Fe));
  if(A) s += L('armor', armorSVG(A, f));
  if(Wa) s += L('waist', waistSVG(Wa));
  if(N) s += L('neck', neckSVG(N));
  if(C) s += L('cloak2', cloakFront(C));
  s += baseHead(f, H && H.look === 'helm');
  if(H) s += L('head', headSVG(H));
  s += baseHands();
  if(Ha) s += L('hands', handsSVG(Ha));
  if(R) s += L('ring', ringSVG(R));
  if(Sh) s += L('shield', shieldSVG(Sh));
  if(W) s += L('weapon', weaponSVG(W)) + (W.look === 'bow' ? '' : '<circle cx="70" cy="214" r="8.5" fill="' + (Ha && Ha.look === 'gloves' ? HK : HP) + '" ' + S + '/>');
  s += '</g>';
  if(T) s += L('trinket', trinketSVG(T));
  if(Pe) s += L('pet', petSVG(Pe));
  s += '</svg>';
  return s;
}
const HERO_CSS = `
.hero-svg{width:100%;height:auto;display:block;overflow:visible}
@media (prefers-reduced-motion:no-preference){
  .hero-svg .body{animation:breathe 3.6s ease-in-out infinite;transform-origin:120px 270px}
  .hero-svg .body.hover{animation:hover 3s ease-in-out infinite}
  .hero-svg .shadow.hover{animation:shadowpulse 3s ease-in-out infinite;transform-origin:120px 276px}
  @keyframes breathe{0%,100%{transform:scale(1,1)}50%{transform:scale(1.005,.992)}}
  @keyframes hover{0%,100%{transform:translateY(-6px)}50%{transform:translateY(-12px)}}
  @keyframes shadowpulse{0%,100%{transform:scale(.85)}50%{transform:scale(.75)}}
  .hero-svg .blink{animation:blink 4.2s infinite;transform-box:fill-box;transform-origin:center}
  @keyframes blink{0%,46%,50%,100%{transform:scaleY(1)}48%{transform:scaleY(.1)}}
  .hero-svg .hair{animation:sway 4s ease-in-out infinite}
  @keyframes sway{0%,100%{transform:rotate(0)}50%{transform:rotate(1.2deg)}}
  .hero-svg .cloak{animation:cloak 5s ease-in-out infinite;transform-origin:120px 150px}
  @keyframes cloak{0%,100%{transform:skewX(0)}50%{transform:skewX(-2.5deg)}}
  .hero-svg .w-sway{animation:wsway 3.6s ease-in-out infinite}
  @keyframes wsway{0%,100%{transform:rotate(0)}50%{transform:rotate(-2deg)}}
  .hero-svg .bob{animation:bob 2.8s ease-in-out infinite}
  @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  .hero-svg .tw{animation:twinkle 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
  .hero-svg .deco .tw:nth-child(2){animation-delay:.8s}.hero-svg .deco .tw:nth-child(3){animation-delay:1.5s}
  @keyframes twinkle{0%,100%{transform:scale(1) rotate(0);opacity:1}50%{transform:scale(.55) rotate(20deg);opacity:.6}}
  .hero-svg .fx-glow .tw:nth-child(2){animation-delay:.6s}.hero-svg .fx-glow .tw:nth-child(3){animation-delay:1.2s}.hero-svg .fx-glow .tw:nth-child(4){animation-delay:1.8s}
  .hero-svg .fl{animation:flick .5s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center bottom}
  .hero-svg .fl1{animation-delay:.15s}.hero-svg .fl2{animation-delay:.3s}.hero-svg .fl3{animation-delay:.45s}
  @keyframes flick{from{transform:scaleY(.8) skewX(-6deg)}to{transform:scaleY(1.15) skewX(6deg)}}
  .hero-svg .flake{animation:flake 3s linear infinite;transform-box:fill-box;transform-origin:center}
  @keyframes flake{0%{transform:rotate(0) scale(.8);opacity:.4}50%{opacity:1}100%{transform:rotate(180deg) scale(.8);opacity:.4}}
  .hero-svg .fx-bolt{animation:flash 2.4s steps(1) infinite}
  @keyframes flash{0%,70%{opacity:0}72%,78%{opacity:1}80%,84%{opacity:0}86%,92%{opacity:1}94%,100%{opacity:0}}
  .hero-svg .fx-holy{animation:spin 14s linear infinite}
  .hero-svg .spin{animation:spin 10s linear infinite;transform-box:fill-box;transform-origin:center}
  @keyframes spin{to{transform:rotate(360deg)}}
  .hero-svg .fx-runes{animation:pulse 2.2s ease-in-out infinite}
  @keyframes pulse{0%,100%{opacity:.35}50%{opacity:1}}
  .hero-svg .fx-swoosh{animation:dash 1.6s linear infinite}
  @keyframes dash{to{stroke-dashoffset:-26}}
  .hero-svg .dr{animation:drip 1.8s ease-in infinite}
  @keyframes drip{0%{transform:translateY(0);opacity:0}15%{opacity:1}100%{transform:translateY(46px);opacity:0}}
  .hero-svg .lf{animation:leaf 3s ease-in-out infinite}
  @keyframes leaf{0%{transform:translate(0,0) rotate(0);opacity:0}20%{opacity:1}100%{transform:translate(-14px,40px) rotate(120deg);opacity:0}}
  .hero-svg .fx-orb{animation:pulse 1.8s ease-in-out infinite}
  .hero-svg .fx-speed{animation:speed .8s ease-in-out infinite}
  @keyframes speed{0%,100%{transform:translateX(0);opacity:.4}50%{transform:translateX(5px);opacity:1}}
  .hero-svg .ghost{animation:ghost 2s ease-in-out infinite}
  @keyframes ghost{0%,100%{transform:translateX(-6px)}50%{transform:translateX(6px)}}
  .hero-svg .wingL{animation:flapL 2.4s ease-in-out infinite}.hero-svg .wingR{animation:flapR 2.4s ease-in-out infinite}
  @keyframes flapL{0%,100%{transform:rotate(0)}50%{transform:rotate(10deg)}}
  @keyframes flapR{0%,100%{transform:rotate(0)}50%{transform:rotate(-10deg)}}
  .hero-svg .wingR2{animation:flapR 1.6s ease-in-out infinite}
  .hero-svg .ankle{animation:pulse 1.2s ease-in-out infinite}
  .hero-svg .pet-bob{animation:bob 3.2s ease-in-out infinite}
  .hero-svg .tail{animation:wag 1.8s ease-in-out infinite}
  @keyframes wag{0%,100%{transform:rotate(0)}50%{transform:rotate(14deg)}}
  .hero-svg .aura{animation:spin 40s linear infinite;transform-origin:120px 160px}
  .hero-svg .trinket{transform-box:fill-box}
  .hero-svg .equip{animation:equip .7s cubic-bezier(.34,1.4,.64,1) both}
  @keyframes equip{0%{opacity:0;transform:translateY(-14px)}55%{opacity:1;transform:translateY(2px)}100%{opacity:1;transform:none}}
  .hero-svg [data-slot]{transform-box:fill-box;transform-origin:center}
}
`;
if(typeof module !== 'undefined') module.exports = {renderHero, HERO_CSS};
