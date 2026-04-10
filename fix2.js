const fs = require('fs');
let c = fs.readFileSync('e:/Desktop/porfolio/DJ.html', 'utf8');
c = c.replace('.video-item.portrait { width: calc(60vh * 9 / 16); }', '.video-item.portrait { height: min(70vh, 700px); width: auto; aspect-ratio: 9/16; }');
c = c.replace('.video-item.portrait { width: 80%; margin: 0 auto; height: auto; aspect-ratio: 9/16; }', '.video-item.portrait { width: min(80vw, 400px); margin: 0 auto; height: auto; aspect-ratio: 9/16; }');
fs.writeFileSync('e:/Desktop/porfolio/DJ.html', c);
