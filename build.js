// Simple compilation script for Classroom Project
// Uses local Babel to compile app.js (JSX) to app.compiled.js (vanilla JS)
const fs = require('fs');

try {
  const babelCode = fs.readFileSync('lib/babel.min.js', 'utf8');
  const m = { exports: {} };
  const fn = new Function('module', 'exports', babelCode);
  fn(m, m.exports);
  const Babel = m.exports;

  const jsxCode = fs.readFileSync('app.js', 'utf8');
  const result = Babel.transform(jsxCode, { presets: ['react'] });

  fs.writeFileSync('app.compiled.js', result.code);
  console.log('✅ Successfully compiled app.js to app.compiled.js (' + result.code.length + ' bytes)');
} catch (err) {
  console.error('❌ Build failed:', err.message);
}
