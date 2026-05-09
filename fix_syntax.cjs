const fs = require('fs');
let code = fs.readFileSync('src/components/SmartTools.tsx', 'utf8');

code = code.replace(/className=\{\\`(.*?)\\`\}/g, "className={`$1`}");
code = code.replace(/\\\$/g, "$");

fs.writeFileSync('src/components/SmartTools.tsx', code);
