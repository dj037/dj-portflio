const fs = require('fs');
let html = fs.readFileSync('e:/Desktop/porfolio/DJ.html', 'utf8');

// 1. Fix Backgrounds
html = html.replace(/background-color:\s*#000;\s*position:\s*relative;\s*z-index:\s*10;/g, 'position: relative; z-index: 10;');
html = html.replace(/position:\s*relative;\s*background-color:\s*#000;\s*z-index:\s*10;/g, 'position: relative; z-index: 10;');
html = html.replace(/footer\s*\{\s*padding:\s*4rem\s*1\.5rem;\s*background-color:\s*#000;\s*\}/g, 'footer { padding: 4rem 1.5rem; }');

// 2. Remove the ParticlePortrait caller in a very isolated manner
// Wait, let's just find the pattern exactly.
// "new ParticlePortrait" is called twice in that if-else block. Let's just comment them out!
html = html.replace(/new\s+ParticlePortrait\(\{/g, '// new ParticlePortrait({');

fs.writeFileSync('e:/Desktop/porfolio/DJ.html', html, 'utf8');
