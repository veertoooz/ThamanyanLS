const fs = require('fs');
fs.mkdirSync('dist', { recursive: true });
const css = fs.readFileSync('src/thamanyan.css', 'utf8');
const js = fs.readFileSync('src/thamanyan.js', 'utf8');
const out = js.replace('"__THAMANYAN_CSS_PLACEHOLDER__"', JSON.stringify(css));
fs.writeFileSync('dist/thamanyan.js', out);
