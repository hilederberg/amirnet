src=open('hero_render_v1.js',encoding='utf8').read()
geo=open('hero_geo2.js',encoding='utf8').read()
head=src[:src.index('/* ---------- weapons')]
trink=src[src.index('function trinketSVG'):src.index('/* ---------- base body')]
rest=src[src.index('/* ---------- compose'):]
out=head+geo+'\n'+trink+'\n'+rest
def rep(o,n):
    global out
    assert out.count(o)==1,(o[:70],out.count(o)); out=out.replace(o,n)
rep("'<pattern id=\"pScaleInk\"","'<filter id=\"rough\" x=\"-5%\" y=\"-5%\" width=\"110%\" height=\"110%\"><feTurbulence type=\"fractalNoise\" baseFrequency=\".04\" numOctaves=\"2\" seed=\"7\"/><feDisplacementMap in=\"SourceGraphic\" scale=\"2.2\"/></filter><pattern id=\"pScaleInk\"")
rep("s += '<g class=\"body' + hover + '\">';","s += '<g class=\"body' + hover + '\" filter=\"url(#rough)\">';")
rep("'<ellipse cx=\"120\" cy=\"276\" rx=\"66\" ry=\"7\"","'<ellipse cx=\"124\" cy=\"268\" rx=\"74\" ry=\"6\"")
rep("star4(30, 64, 12) + star4(52, 92, 6) + star4(224, 196, 10)","star4(40, 54, 14) + star4(62, 82, 7) + star4(216, 196, 13) + star4(236, 176, 6)")
rep("(W.look === 'bow' ? '' : '<circle cx=\"70\" cy=\"214\" r=\"8.5\" fill=\"' + (Ha && Ha.look === 'gloves' ? HK : HP) + '\" ' + S + '/>')",
    "(W.look === 'bow' || W.look === 'staff' || W.look === 'spear' || W.look === 'trident' ? '' : '<circle cx=\"' + HAND_R[0] + '\" cy=\"' + HAND_R[1] + '\" r=\"7.5\" fill=\"' + (Ha && Ha.look === 'gloves' ? HK : HP) + '\" ' + S + '/>')")
out=out.replace('viewBox="0 0 260 300"','viewBox="14 14 232 266"')
open('hero_render.js','w',encoding='utf8').write(out)
print('ok')
