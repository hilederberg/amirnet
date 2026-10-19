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
