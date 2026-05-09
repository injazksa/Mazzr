const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Color replacement
code = code.replace(/emerald/g, 'violet');
code = code.replace(/teal/g, 'indigo');

// We need to add SmartTools import
if (!code.includes('SmartTools')) {
  code = code.replace("import React,", "import SmartTools from './components/SmartTools';\nimport React,");
}

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx basic theme updated');