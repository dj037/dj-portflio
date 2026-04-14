const fs = require('fs');
let c = fs.readFileSync('e:/Desktop/porfolio/DJ.html', 'utf8');
if(!c.includes('three.min.js')) {
    c = c.replace('</body>', '    <!-- Particle System -->\n    <script src=\"https://cdn.bootcdn.net/ajax/libs/three.js/r128/three.min.js\"></script>\n    <script src=\"particle-portrait.js\"></script>\n</body>');
    fs.writeFileSync('e:/Desktop/porfolio/DJ.html', c);
}
