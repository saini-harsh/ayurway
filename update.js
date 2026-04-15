import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/productsData.js');
let content = fs.readFileSync(filePath, 'utf8');

// replace moq: \d+, with moq: 2000,
content = content.replace(/moq:\s*\d+,/g, 'moq: 2000,');

// replace prices: [...], with nothing
content = content.replace(/\s*prices:\s*\[.*?\],/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Update complete');
