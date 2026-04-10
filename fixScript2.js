const fs = require('fs');
let html = fs.readFileSync('e:/Desktop/porfolio/DJ.html', 'utf8');

const regex = /<script>\s*[\s\S]*?new\s+ParticlePortrait\([\s\S]*?\}[\s\S]*?<\/script>/;
html = html.replace(regex, '');

fs.writeFileSync('e:/Desktop/porfolio/DJ.html', html, 'utf8');
