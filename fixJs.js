const fs = require('fs');
let code = fs.readFileSync('e:/Desktop/porfolio/particle-portrait.js', 'utf8');
fs.writeFileSync('e:/Desktop/porfolio/particle-portrait.js', code, 'utf8');
