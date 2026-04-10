const fs = require('fs');
let c = fs.readFileSync('e:/Desktop/porfolio/DJ.html', 'utf8');
c = c.replace('.video-item.portrait { height: min(70vh, 700px); width: auto; aspect-ratio: 9/16; }', '.video-item.portrait { width: min(40vh, 400px); height: min(71.1vh, 711px); aspect-ratio: 9/16; }');
fs.writeFileSync('e:/Desktop/porfolio/DJ.html', c);
