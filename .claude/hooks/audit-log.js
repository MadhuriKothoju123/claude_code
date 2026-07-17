const fs = require('fs');
const path = require('path');

let data = '';
process.stdin.on('data', (chunk) => { data += chunk; });
process.stdin.on('end', () => {
  try {
    const payload = JSON.parse(data);
    const file = (payload.tool_input && payload.tool_input.file_path) || 'unknown';
    const line = `[${new Date().toString()}] Modified ${file}\n`;
    fs.appendFileSync(path.join(__dirname, '..', 'audit.log'), line);
  } catch {
    // malformed hook input, nothing to log
  }
});
