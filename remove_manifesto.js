const fs = require('fs');
let content = fs.readFileSync('e:/Desktop/porfolio/DJ.html', 'utf8');

const startMarker = '            <!-- Manifesto Section -->';
const endMarker = '            </section>\r\n\r\n            <!-- Experience Parallax Section -->';

let startIndex = content.indexOf(startMarker);
let endIndex = content.indexOf('<!-- Experience Parallax Section -->');

if (startIndex !== -1 && endIndex !== -1) {
    let newContent = content.substring(0, startIndex) + content.substring(endIndex);
    fs.writeFileSync('e:/Desktop/porfolio/DJ.html', newContent);
    console.log('Removed manifesto successfully');
} else {
    console.log('Could not find markers');
}
