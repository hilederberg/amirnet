# Re-inline the game modules (src/game/*.js) into src/amirnet-trainer.html.
# Run after editing catalog.js, icons_items.js, icon_fills.js or hero_render.js.
# (hero_render.js itself is generated: cd src/game && python3 assemble_hero.py)
import os
HERE = os.path.dirname(os.path.abspath(__file__)); SRC = os.path.dirname(HERE); GAME = os.path.join(SRC, 'game')
rd = lambda p: open(os.path.join(GAME, p), encoding='utf8').read()
cut = lambda t: t.split("if(typeof module")[0]
hr = rd('hero_render.js')
hcss = hr.split("const HERO_CSS = `")[1].split("`;")[0]
hjs = hr.split("const HERO_CSS = `")[0]
mod = ('const G = (function(){\n' + cut(rd('catalog.js')) + '\n' + cut(rd('icons_items.js')) + '\n' + cut(rd('icon_fills.js')) + '\n' + hjs +
       '\nreturn {RARITY, SLOTS, CATS, ITEMS, FX, EARN, CLASSES, LEVEL_BANDS, levelFor, xpFor, ICONS, iconSVG, renderHero};\n})();\n')
path = os.path.join(SRC, 'amirnet-trainer.html')
t = open(path, encoding='utf8').read()
def swap(t, a, b, body):
    i = t.index(a); j = t.index(b)
    head_end = t.index('\n', i) + 1 if a.startswith('/* @game') else i + len(a)
    return t[:head_end] + body + t[j:]
t = swap(t, '/* @hero-css */', '/* @end-hero-css */', hcss)
t = swap(t, '/* @game-module', '/* @end-game-module */', mod)
open(path, 'w', encoding='utf8').write(t)
print('updated', path, len(t))
