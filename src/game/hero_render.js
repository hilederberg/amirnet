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

/* ===== v2 geometry: adult proportions, bold ink fills, sword across the body ===== */
const HAND_R = [164, 150], HAND_L = [82, 150];

/* weapons: local grip at 0,0, pointing up (-y). Placement per type. */
function weaponSVG(it){
  const L = it.look, fx = it.fxv;
  let body = '', h = 100, rot = 225;
  const bladeFill = fx === 'ink' ? HK : HP;
  const blade = (w, len, tip) => '<path d="M' + (-w) + ' -9L' + (-w + .5) + ' ' + (-len) + 'L0 ' + (-len - tip) + 'L' + (w - .5) + ' ' + (-len) + 'L' + w + ' -9Z" fill="' + bladeFill + '" ' + S + '/><path d="M' + (w * .35) + ' -14L' + (w * .3) + ' ' + (-len + 4) + '" stroke="' + (fx === 'ink' ? HP : HK) + '" stroke-width="1.6"/>';
  const hilt = (gw) => '<path d="M' + (-gw) + ' -13L' + gw + ' -13L' + (gw - 2) + ' -6L' + (-gw + 2) + ' -6Z" fill="' + HK + '"/><rect x="-3.5" y="-6" width="7" height="22" fill="' + HK + '"/><circle cx="0" cy="20" r="5.5" fill="' + HP + '" ' + S + '/>';
  const haft = (top, bot) => '<path d="M-3.5 ' + top + 'L3.5 ' + top + 'L3.5 ' + bot + 'L-3.5 ' + bot + 'Z" fill="' + HK + '"/>';
  switch(L){
    case 'sword': h = 120; body = blade(5, 108, 14) + hilt(17) + (fx === 'holy' ? '<path d="M-17 -10q-12 -8 -10 -22M17 -10q12 -8 10 -22" fill="none" ' + S + '/>' : ''); break;
    case 'bigsword': h = 140; body = blade(7, 128, 16) + hilt(21); break;
    case 'scimitar': h = 116; body = '<path d="M-5 -9C-10 -44 -4 -88 20 -118C12 -88 8 -48 6 -9Z" fill="' + bladeFill + '" ' + S + '/>' + hilt(15); break;
    case 'dagger': h = 60; body = blade(4, 50, 10) + hilt(12); rot = 200; break;
    case 'axe': h = 110; body = haft(-104, 26) + '<path d="M3 -100L34 -112L42 -70L3 -76Z" fill="' + HP + '" ' + S + '/><path d="M3 -98L-16 -92L-18 -80L3 -82Z" fill="' + HK + '"/>'; rot = 22; break;
    case 'hammer': h = 110; body = haft(-92, 26) + '<path d="M-24 -112H24V-88H-24Z" fill="' + HP + '" ' + S + '/><path d="M-24 -100H24" ' + S2 + '/><path d="M8 -112V-88M14 -112V-88" ' + S2 + '/>'; rot = 22; break;
    case 'mace': h = 104; body = haft(-82, 26) + '<path d="M0 -112L12 -102L12 -84L0 -74L-12 -84L-12 -102Z" fill="' + HP + '" ' + S + '/><path d="M0 -112V-74M-12 -93H12" ' + S2 + '/>'; rot = 22; break;
    case 'spear': h = 160; body = haft(-130, 110) + '<path d="M-8 -128L0 -160L8 -128Z" fill="' + HP + '" ' + S + '/>'; rot = -6; break;
    case 'trident': h = 150; body = haft(-122, 110) + '<path d="M-15 -122H15M-15 -122V-142M15 -122V-142M0 -122V-150" fill="none" ' + S + '/>'; rot = -6; break;
    case 'staff': h = 150; body = haft(-136, 116) + (fx === 'owl'
      ? '<path d="M-14 -138l4 -9 4 5h12l4 -5 4 9v10c0 8 -6 12 -14 12s-14 -4 -14 -12z" fill="' + HP + '" ' + S + '/><circle cx="-5" cy="-130" r="3.5" fill="' + HK + '" class="blink"/><circle cx="5" cy="-130" r="3.5" fill="' + HK + '" class="blink"/>'
      : '<path d="M0 -156L11 -144L0 -132L-11 -144Z" fill="' + (fx === 'orb' ? HP : HK) + '" ' + S + '/><path d="M-6 -134L-3 -124M6 -134L3 -124" ' + S + '/>'); rot = 0; break;
    case 'wand': h = 64; body = '<path d="M-3 -52L3 -52L4 12L-4 12Z" fill="' + HK + '"/>' + star4(0, -62, 10); rot = -30; break;
    case 'bow': h = 160; body = '<path d="M2 -88Q-50 0 2 88" fill="none" stroke="' + HK + '" stroke-width="7" stroke-linecap="round"/><path d="M2 -88Q-50 0 2 88" fill="none" stroke="' + HP + '" stroke-width="2.4" stroke-linecap="round"/><path d="M2 -88L2 88" stroke="' + HK + '" stroke-width="1.6"/>'; rot = 0; break;
  }
  const place = 'translate(' + HAND_R[0] + ' ' + HAND_R[1] + ') rotate(' + rot + ')';
  const bob = (fx === 'float' || fx === 'ghost') ? ' bob' : '';
  const eff = fx && FXV[fx] ? FXV[fx](h) : '';
  return '<g transform="' + place + '"><g class="eq w-sway' + bob + '">' + (fx === 'holy' || fx === 'rays' ? eff + body : body + eff) + '</g></g>';
}

/* shield: big heater on the viewer-left forearm, hatched shadow on one side */
function shieldSVG(it){
  const fx = it.fxv;
  let s;
  if(fx === 'book') s = '<path d="M-30 -48H30V48H-30Z" fill="' + HP + '" ' + S + '/><path d="M-20 -48V48" ' + S + '/><path d="M6 -10l4 8 9 1-6 6 2 9-9 -4-9 4 2 -9-6 -6 9 -1z" fill="' + HK + '"/>';
  else {
    s = '<path d="M-34 -50L34 -50L34 6Q30 40 0 58Q-30 40 -34 6Z" fill="' + HP + '" ' + S + '/>';
    s += '<path d="M0 -50V58" ' + S2 + '/><path d="M6 -44V48M12 -44V40M18 -44V32M24 -44V22M30 -44V8" stroke="' + HK + '" stroke-width="1.4"/>';
    if(fx === 'runes') s += '<circle cx="-14" cy="-6" r="10" fill="none" ' + S2 + ' stroke-dasharray="3 4" class="spin"/>';
    else if(fx === 'holy') s += '<path d="M-14 -30V20M-26 -10H-2" stroke="' + HK + '" stroke-width="5"/>';
    else if(fx === 'arrows') s += '<path d="M-12 -18l-24 -14M-18 14l-20 4" ' + S2 + '/><path d="M-36 -32l-1 5M-36 -32l5 0M-38 18l3 -4M-38 18l4 3" ' + S2 + '/>';
    else if(fx === 'glow') s += star4(-30, -50, 7);
  }
  return '<g transform="translate(' + (HAND_L[0] - 6) + ' ' + (HAND_L[1] + 4) + ') rotate(-6)"><g class="eq' + (fx === 'float' ? ' bob' : '') + '">' + s + '</g></g>';
}

function torsoPath(f){ return f ? 'M98 100L146 100L142 138L152 174L92 174L102 138Z' : 'M92 100L152 100L158 174L86 174Z'; }
function armorSVG(it, f){
  const L = it.look, fx = it.fxv, tp = torsoPath(f);
  if(L === 'robe'){
    const dark = it.id === 'archmagi' || it.id === 'robe_stars';
    let r = '<path d="M92 98L152 98L172 262L72 262Z" fill="' + (dark ? HK : HP) + '" ' + S + '/><path d="M122 104V262" stroke="' + (dark ? HP : HK) + '" stroke-width="2"/><path d="M104 98L122 120L140 98" fill="none" stroke="' + (dark ? HP : HK) + '" stroke-width="2.6"/>';
    if(!dark) r += '<path d="M134 140V250M140 150V252M146 166V254" stroke="' + HK + '" stroke-width="1.3"/>';
    if(dark || fx === 'stars') r += '<g class="fx-glow">' + [[100, 190], [146, 206], [110, 238], [142, 160]].map(([x, y]) => star4(x, y, 5).replace('fill="' + HK + '"', 'fill="' + HP + '"')).join('') + '</g>';
    if(fx === 'eyes') r += [[104, 180], [140, 180], [98, 220], [146, 222], [122, 200]].map(([x, y]) => '<path d="M' + (x - 6) + ' ' + y + 'q6 -6 12 0q-6 6 -12 0z" fill="' + HP + '" ' + S2 + '/><circle cx="' + x + '" cy="' + y + '" r="1.8" fill="' + HK + '" class="blink"/>').join('');
    if(fx === 'runes') r += '<g class="fx-runes">' + [[102, 230], [142, 230], [122, 252]].map(([x, y]) => '<path d="M' + (x - 4) + ' ' + (y - 4) + 'l8 8m-8 0l8 -8M' + x + ' ' + (y - 6) + 'v12" stroke="' + (dark ? HP : HK) + '" stroke-width="1.6"/>').join('') + '</g>';
    return g('eq', r);
  }
  const fills = {leather: HP, studded: HP, scale: 'url(#pScale)', chain: 'url(#pChain)', plate: HP};
  let a = '<path d="' + tp + '" fill="' + (fx === 'ink' ? 'url(#pScaleInk)' : fills[L] || HP) + '" ' + S + '/>';
  if(L === 'leather' || L === 'studded') a += '<path d="M122 104V172" ' + S2 + '/><path d="M138 108V170M144 112V170M150 120V170" stroke="' + HK + '" stroke-width="1.3"/>';
  if(L === 'studded') a += [[104, 126], [104, 146], [130, 126], [130, 146], [104, 164], [130, 164]].map(([x, y]) => '<circle cx="' + x + '" cy="' + y + '" r="2.4" fill="' + HK + '"/>').join('');
  if(L === 'plate') a += '<path d="M' + (f ? 102 : 90) + ' 136H' + (f ? 142 : 155) + 'M' + (f ? 98 : 88) + ' 154H' + (f ? 148 : 157) + 'M122 100V136" ' + S2 + '/><path d="M140 104V134M146 106V134M146 140V152M152 142V152" stroke="' + HK + '" stroke-width="1.3"/>';
  if(L === 'plate' || L === 'scale' || fx === 'dragon') a += '<path d="M78 112L84 96L104 98L102 116Z" fill="' + HP + '" ' + S + '/><path d="M166 112L160 96L140 98L142 116Z" fill="' + HP + '" ' + S + '/><path d="M150 100L148 112M156 100L154 112" stroke="' + HK + '" stroke-width="1.3"/>';
  if(fx === 'leaf') a += '<g class="fx-leaf"><path d="M106 128q8 -8 14 0q-8 8 -14 0z" fill="' + HP + '" ' + S2 + '/><path d="M126 150q8 -8 14 0q-8 8 -14 0z" fill="' + HP + '" ' + S2 + '/></g>';
  if(fx === 'runes') a += '<g class="fx-runes">' + [[108, 128], [138, 128], [122, 156]].map(([x, y]) => '<path d="M' + (x - 4) + ' ' + (y - 4) + 'l8 8m-8 0l8 -8" stroke="' + HK + '" stroke-width="2"/>').join('') + '</g>';
  if(fx === 'cracks') a += '<path d="M110 116l6 8-4 8 6 8M138 130l-5 7 4 7" fill="none" ' + S2 + '/>';
  if(fx === 'glow' || fx === 'holy') a += '<g class="fx-glow">' + star4(152, 112, 6) + star4(92, 156, 4) + '</g>';
  if(fx === 'holy') a += '<path d="M122 110V146M110 124H134" stroke="' + HK + '" stroke-width="5"/>';
  const ghost = fx === 'ghost' ? '<g class="ghost" opacity=".25"><path d="' + tp + '" fill="' + HP + '" ' + S + '/></g>' : '';
  return g('eq', ghost + a);
}

function cloakBack(it){
  const fx = it.fxv, L = it.look;
  if(L === 'wings') return g('eq wings', '<g class="wingL" style="transform-origin:100px 108px"><path d="M100 108C62 70 18 74 6 98C28 96 38 106 42 116C20 118 12 132 12 146C34 136 50 140 60 152C56 138 76 120 100 124Z" fill="' + HP + '" ' + S + '/><path d="M42 116c14 0 26 2 38 6M60 152c6 -10 16 -18 30 -22" fill="none" ' + S2 + '/></g><g class="wingR" style="transform-origin:144px 108px"><path d="M144 108C182 70 226 74 238 98C216 96 206 106 202 116C224 118 232 132 232 146C210 136 194 140 184 152C188 138 168 120 144 124Z" fill="' + HP + '" ' + S + '/><path d="M202 116c-14 0 -26 2 -38 6M184 152c-6 -10 -16 -18 -30 -22" fill="none" ' + S2 + '/></g>');
  const bottom = fx === 'bat' ? 'Q62 254 74 266Q86 254 98 266Q110 254 122 266Q134 254 146 266Q158 254 170 266Q182 254 194 266' : 'L194 266';
  let c = '<path d="M94 96Q52 170 50 266' + bottom + 'Q192 170 150 96Z" fill="' + HK + '" ' + S + '/><path d="M62 180q-6 40 -8 82M182 180q6 40 8 82" stroke="' + HP + '" stroke-width="1.4" opacity=".55" fill="none"/>';
  if(fx === 'web') c += '<path d="M122 110L74 260M122 110L122 264M122 110L170 260M86 180q36 -10 72 0M76 222q46 -12 92 0" fill="none" stroke="' + HP + '" stroke-width="1.3" opacity=".8"/>';
  if(fx === 'leaf') c += '<path d="M62 240q10 -10 18 0q-10 10 -18 0zM162 230q10 -10 18 0q-10 10 -18 0z" fill="' + HP + '"/>';
  if(fx === 'ghost') c = '<g class="ghost" opacity=".3">' + c + '</g>' + c;
  return g('eq cloak', c);
}
function cloakFront(it){ return it.look === 'wings' ? '' : g('eq', '<path d="M98 100L106 108M146 100L138 108" ' + S + '/><circle cx="122" cy="102" r="5" fill="' + HP + '" ' + S2 + '/>'); }

/* head gear: head box x 100..144, y 34..96, eyes at y 64 */
function headSVG(it){
  const L = it.look, fx = it.fxv;
  let s = '';
  if(L === 'helm'){
    s = '<path d="M98 40Q122 28 146 40L148 90Q122 98 96 90Z" fill="' + HP + '" ' + S + '/><path d="M98 60H146V68H98Z" fill="' + HK + '"/><path d="M122 68V92" ' + S2 + '/><path d="M132 74h3M132 80h3M132 86h3M110 74h3M110 80h3M110 86h3" stroke="' + HK + '" stroke-width="2.2"/><path d="M136 42V58M141 44V58" stroke="' + HK + '" stroke-width="1.3"/>';
    if(it.id === 'helm_lang') s += '<path d="M98 54q-16 -6 -22 -22q12 2 18 10q-2 -12 4 -20q6 14 4 28z" fill="' + HP + '" ' + S2 + '/><path d="M146 54q16 -6 22 -22q-12 2 -18 10q2 -12 -4 -20q-6 14 -4 28z" fill="' + HP + '" ' + S2 + '/>';
    else if(fx === 'gems') s += '<path d="M122 34l6 7-6 7-6 -7z" fill="' + HK + '"/><g class="fx-glow">' + star4(152, 34, 6) + star4(92, 40, 4) + '</g>';
    else if(fx === 'stars') s += '<g class="fx-glow">' + star4(152, 32, 6) + star4(94, 36, 4) + '</g>';
    else s += '<path d="M122 32Q124 14 142 10Q132 22 130 34Z" fill="' + HK + '"/>';
  } else if(L === 'circlet'){
    s = '<path d="M100 52Q122 42 144 52" fill="none" stroke="' + HK + '" stroke-width="5"/><path d="M122 40l6 7-6 7-6 -7z" fill="' + HP + '" ' + S2 + '/><g class="fx-glow">' + star4(136, 40, 4) + '</g>';
  } else if(L === 'hat'){
    s = '<path d="M74 46Q122 30 170 46Q122 56 74 46Z" fill="' + HK + '"/><path d="M98 44Q114 24 126 -6Q134 22 148 44Z" fill="' + HK + '"/><path d="M126 -6q10 -2 14 8" fill="none" ' + S2 + '/>' + star4(116, 28, 5).replace('fill="' + HK + '"', 'fill="' + HP + '"');
  } else if(L === 'goggles'){
    s = '<path d="M98 64H146" stroke="' + HK + '" stroke-width="5"/><rect x="104" y="57" width="15" height="13" rx="3" fill="' + HP + '" ' + S + '/><rect x="125" y="57" width="15" height="13" rx="3" fill="' + HP + '" ' + S + '/>';
  } else if(L === 'glasses'){
    s = '<circle cx="111" cy="64" r="7.5" fill="none" ' + S2 + '/><circle cx="133" cy="64" r="7.5" fill="none" ' + S2 + '/><path d="M118 63q4 -2 8 0M103 62l-6 -2M141 62l6 -2" fill="none" ' + S2 + '/>';
  } else if(L === 'laurel'){
    s = [-1, 1].map(side => [0, 1, 2, 3].map(i => { const x = 122 + side * (22 - i * 2), y = 66 - i * 9; return '<path d="M' + x + ' ' + y + 'q' + (side * 7) + ' -6 ' + (side * 12) + ' 2q' + (side * -7) + ' 6 ' + (side * -12) + ' -2z" fill="' + HP + '" ' + S2 + '/>'; }).join('')).join('') + '<g class="fx-glow">' + star4(122, 22, 6) + '</g>';
  }
  return g('eq', s);
}
function neckSVG(it){
  const L = it.look;
  let s = '<path d="M108 100Q122 122 136 100" fill="none" stroke="' + HP + '" stroke-width="2"/>';
  if(L === 'brooch') s = star4(108, 112, 7).replace('fill="' + HK + '"', 'fill="' + HP + '" ' + S2);
  else if(L === 'scarab') s += '<ellipse cx="122" cy="122" rx="7" ry="9" fill="' + HP + '" ' + S2 + '/><path d="M122 114V130" ' + S2 + '/>';
  else s += '<path d="M122 112L130 121L122 130L114 121Z" fill="' + HP + '" ' + S2 + '/>';
  if(it.fxv === 'holy' || it.fxv === 'stars' || it.fxv === 'flame') s += '<g class="fx-glow">' + star4(138, 124, 4.5).replace('fill="' + HK + '"', 'fill="' + HP + '"') + '</g>';
  return g('eq', s);
}
function waistSVG(it){ return g('eq', '<path d="M86 164H158V174H86Z" fill="' + HP + '" ' + S2 + '/><path d="M114 160H130V178H114Z" fill="' + HK + '"/><path d="M118 164H126V174H118Z" fill="' + HP + '"/>' + (it.fxv === 'runes' ? '<g class="fx-runes"><path d="M94 169h12M138 169h12" stroke="' + HK + '" stroke-width="2"/></g>' : '')); }
function handsSVG(it){
  if(it.look === 'gloves') return g('eq', '<circle cx="' + HAND_L[0] + '" cy="' + HAND_L[1] + '" r="9.5" fill="' + HK + '"/><circle cx="' + HAND_R[0] + '" cy="' + HAND_R[1] + '" r="9.5" fill="' + HK + '"/><path d="M75 138L89 136M158 136L171 140" stroke="' + HK + '" stroke-width="7" stroke-linecap="round"/>');
  return g('eq', '<path d="M74 136L88 140" stroke="' + HK + '" stroke-width="13" stroke-linecap="round"/><path d="M74 136L88 140" stroke="' + HP + '" stroke-width="7" stroke-linecap="round"/><path d="M160 138L172 136" stroke="' + HK + '" stroke-width="13" stroke-linecap="round"/><path d="M160 138L172 136" stroke="' + HP + '" stroke-width="7" stroke-linecap="round"/>' + (it.id === 'o_streakband' ? '<path d="M' + (HAND_R[0] - 6) + ' ' + (HAND_R[1] - 20) + 'h12" stroke="' + HK + '" stroke-width="2"/>' : '') + (it.fxv === 'glow' ? '<g class="fx-glow">' + star4(HAND_R[0] + 16, HAND_R[1] - 26, 4.5) + '</g>' : ''));
}
function ringSVG(it){ return g('eq', '<circle cx="' + (HAND_L[0] + 7) + '" cy="' + (HAND_L[1] + 2) + '" r="3.4" fill="' + HP + '" ' + S2 + '/><g class="fx-glow">' + star4(HAND_L[0] - 16, HAND_L[1] + 22, 5) + '</g>'); }
function feetSVG(it){
  const fx = it.fxv;
  let s = '<path d="M90 226L114 226L114 252Q124 252 126 266L86 266Z" fill="' + HK + '"/><path d="M136 226L160 226L162 252Q172 254 172 266L134 266Z" fill="' + HK + '"/><path d="M90 232H114M136 232H160" stroke="' + HP + '" stroke-width="3"/>';
  if(fx === 'wings') s += '<g class="ankle"><path d="M90 238q-14 -8 -18 -20q10 4 14 10q0 -8 4 -12z" fill="' + HP + '" ' + S2 + '/><path d="M162 238q14 -8 18 -20q-10 4 -14 10q0 -8 -4 -12z" fill="' + HP + '" ' + S2 + '/></g>';
  if(fx === 'speed') s += '<g class="fx-speed"><path d="M62 244h14M58 254h16M62 264h12" ' + S2 + '/></g>';
  if(fx === 'frost') s += '<g class="fx-frost"><g class="flake" style="transform-origin:182px 256px"><path d="M176 256h12M182 250v12" ' + S2 + '/></g></g>';
  if(fx === 'web') s += '<path d="M86 266q-8 -8 -4 -18M172 266q8 -8 4 -18" fill="none" ' + S2 + '/>';
  return g('eq', s);
}

/* base figure */
function baseBack(f){
  return f ? '<path class="hair" d="M140 52Q152 70 150 96Q158 130 150 160Q146 170 140 164Q146 132 140 104Q136 84 140 52Z" fill="' + HK + '" style="transform-origin:140px 60px"/>' : '';
}
function baseBody(f, eqArmor, eqFeet){
  let s = '';
  s += '<path d="M96 172L92 252L114 252L120 172Z" fill="' + HP + '" ' + S + '/><path d="M106 186V246" stroke="' + HK + '" stroke-width="1.4"/>';
  s += '<path d="M124 172L136 210L138 252L160 252L156 206L148 172Z" fill="' + HP + '" ' + S + '/><path d="M150 214L152 246M144 192L148 206" stroke="' + HK + '" stroke-width="1.4"/>';
  if(!eqFeet) s += '<path d="M88 250L116 250L118 266L84 266Z" fill="' + HK + '"/><path d="M136 250L162 250Q172 254 172 266L134 266Z" fill="' + HK + '"/>';
  const arm = (d1, d2) => '<path d="' + d2 + '" fill="none" stroke="' + HK + '" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/><path d="' + d2 + '" fill="none" stroke="' + HP + '" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="' + d1 + '" fill="none" stroke="' + HK + '" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/>';
  s += arm('M96 106L80 132', 'M80 132L' + HAND_L[0] + ' ' + HAND_L[1]);
  s += arm('M148 106L172 128', 'M172 128L' + HAND_R[0] + ' ' + HAND_R[1]);
  s += '<path d="' + torsoPath(f) + '" fill="' + HK + '" ' + S + '/><path d="M110 100L122 112L134 100" fill="none" stroke="' + HP + '" stroke-width="2"/><path d="M96 168H150" stroke="' + HP + '" stroke-width="1.4" opacity=".7"/>';
  return s;
}
function baseHands(){ return '<circle cx="' + HAND_L[0] + '" cy="' + HAND_L[1] + '" r="7.5" fill="' + HP + '" ' + S + '/><circle cx="' + HAND_R[0] + '" cy="' + HAND_R[1] + '" r="7.5" fill="' + HP + '" ' + S + '/>'; }
function baseHead(f, hideHair){
  let s = '<path d="M114 88L114 102L130 102L130 88Z" fill="' + HP + '" ' + S + '/>';
  s += '<path d="M101 58L100 72Q102 88 112 94L122 98L132 94Q142 88 144 72L143 58Q142 40 122 38Q102 40 101 58Z" fill="' + HP + '" ' + S + '/>';
  s += '<path d="M99 64q-6 0 -5 8t6 6M145 64q6 0 5 8t-6 6" fill="' + HP + '" ' + S2 + '/>';
  s += '<g class="eyes"><path class="blink" d="M107 64L116 64" stroke="' + HK + '" stroke-width="3.2" stroke-linecap="round" style="transform-origin:111px 64px"/><path class="blink" d="M128 64L137 64" stroke="' + HK + '" stroke-width="3.2" stroke-linecap="round" style="transform-origin:133px 64px"/></g>';
  s += '<path d="M105 57L117 59M127 59L139 57" stroke="' + HK + '" stroke-width="' + (f ? 2.2 : 3.4) + '" stroke-linecap="round"/>';
  s += '<path d="M122 64L119 75L124 76" fill="none" ' + S2 + '/>';
  if(f) s += '<path d="M115 83Q122 86 129 83" fill="none" ' + S2 + '/><path d="M104 74l3 2M140 74l-3 2" stroke="' + HG + '" stroke-width="2"/>';
  else s += '<path d="M101 70Q103 90 112 98L122 106L132 98Q141 90 143 70Q138 80 132 80L128 78L116 78L112 80Q106 80 101 70Z" fill="' + HK + '"/><path d="M116 84Q122 86 128 84" fill="none" stroke="' + HP + '" stroke-width="2"/>';
  if(!hideHair){
    s += f ? '<path d="M99 62Q96 36 122 34Q148 36 145 62L140 52Q130 44 120 46Q108 48 104 52Z" fill="' + HK + '"/><path d="M122 36Q126 44 140 50" fill="none" stroke="' + HP + '" stroke-width="1.4"/>'
           : '<path d="M100 60Q96 34 122 32Q148 34 144 60L140 50L134 52L130 44L120 48L112 44L106 52Z" fill="' + HK + '"/>';
  }
  return s;
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


/* ---------- compose ---------- */
function renderHero(state, itemById){
  const eq = state.eq || {}, f = state.gender === 'f';
  const it = k => eq[k] ? itemById[eq[k]] : null;
  const W = it('weapon'), A = it('armor'), Sh = it('shield'), C = it('cloak'), H = it('head'), Ha = it('hands'), R = it('ring'), N = it('neck'), Fe = it('feet'), Wa = it('waist'), T = it('trinket'), Pe = it('pet'), Sc = it('scene');
  const legend = Object.keys(eq).some(k => eq[k] && itemById[eq[k]] && itemById[eq[k]].r === 'legend' && k !== 'scene');
  const hover = (Fe && Fe.fxv === 'float') || (C && C.look === 'wings') ? ' hover' : '';
  const L = (slot, svg) => svg ? '<g data-slot="' + slot + '">' + svg + '</g>' : '';
  let s = '<svg class="hero-svg" viewBox="14 14 232 266" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="הדמות שלך">';
  s += '<defs><pattern id="pChain" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="' + HP2 + '"/><circle cx="3.5" cy="3.5" r="2.2" fill="none" stroke="' + HK + '" stroke-width="1.1"/></pattern>' +
       '<pattern id="pScale" width="10" height="8" patternUnits="userSpaceOnUse"><rect width="10" height="8" fill="' + HP2 + '"/><path d="M0 0q5 8 10 0" fill="none" stroke="' + HK + '" stroke-width="1.2"/></pattern>' +
       '<filter id="rough" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="2.2"/></filter><pattern id="pScaleInk" width="10" height="8" patternUnits="userSpaceOnUse"><rect width="10" height="8" fill="' + HK + '"/><path d="M0 0q5 8 10 0" fill="none" stroke="' + HP + '" stroke-width="1.2"/></pattern></defs>';
  if(Sc) s += L('scene', g('eq scene', sceneSVG(Sc)));
  s += '<ellipse cx="124" cy="268" rx="74" ry="6" fill="' + HG + '" opacity=".55" class="shadow' + hover + '"/>';
  if(legend) s += '<g class="aura"><circle cx="120" cy="160" r="112" fill="none" stroke="' + HK + '" stroke-width="1.6" stroke-dasharray="2 10"/><circle cx="120" cy="160" r="100" fill="none" stroke="' + HK + '" stroke-width="1" stroke-dasharray="1 14"/></g>';
  s += '<g class="deco">' + star4(40, 54, 14) + star4(62, 82, 7) + star4(216, 196, 13) + star4(236, 176, 6) + '</g>';
  s += '<g class="body' + hover + '" filter="url(#rough)">';
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
  if(W) s += L('weapon', weaponSVG(W)) + (W.look === 'bow' || W.look === 'staff' || W.look === 'spear' || W.look === 'trident' ? '' : '<circle cx="' + HAND_R[0] + '" cy="' + HAND_R[1] + '" r="7.5" fill="' + (Ha && Ha.look === 'gloves' ? HK : HP) + '" ' + S + '/>');
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
