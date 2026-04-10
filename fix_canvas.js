const fs = require('fs');
let c = fs.readFileSync('e:/Desktop/porfolio/DJ.html', 'utf8');

// Check if particle canvas already exists
if(!c.includes('particle-portrait"')) {
    c = c.replace('<body class="zh-mode">', '<body class="zh-mode">\n    <!-- Particle Background -->\n    <canvas id="particle-portrait" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 0; pointer-events: none; mix-blend-mode: screen;"></canvas>');
}

// Make sure three.js is still there
if(!c.includes('three.min.js')) {
    c = c.replace('</body>', '    <!-- Particle System -->\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n    <script src="particle-portrait.js"></script>\n</body>');
}

fs.writeFileSync('e:/Desktop/porfolio/DJ.html', c);
