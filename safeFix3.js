const fs = require('fs');
let html = fs.readFileSync('e:/Desktop/porfolio/DJ.html', 'utf8');

// I will just replace the exact block:
let regex = /new\s+ParticlePortrait\(\{\s*particleSize:\s*2\.5,\s*particleColor:\s*'#00d4ff',\s*glowColor:\s*'rgba\(0,\s*212,\s*255,\s*0\.2\)'(?:,\s*maxDispersion:\s*150)?\s*\}\);/g;

html = html.replace(regex, '/* ParticlePortrait initialized in external script */');

fs.writeFileSync('e:/Desktop/porfolio/DJ.html', html, 'utf8');
