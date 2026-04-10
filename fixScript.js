const fs = require('fs');
let html = fs.readFileSync('e:/Desktop/porfolio/DJ.html', 'utf8');

// Remove the old invocation script
const startStr = '// 褰?DOM 鍔犺浇瀹屾垚鍚庯紝鍒濆'; // Let's just use regex
html = html.replace(/<script>\s*\/\/\s*当\s*DOM\s*加载完成后，初始化粒子人物[\s\S]*?new\s*ParticlePortrait\([^\)]+\);[\s\S]*?\}[\s\S]*?<\/script>/, '');

fs.writeFileSync('e:/Desktop/porfolio/DJ.html', html, 'utf8');
