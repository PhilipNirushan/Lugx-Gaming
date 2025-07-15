const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;
const base = path.join(__dirname, 'frontend');

http.createServer((req, res) => {
  let filePath = path.join(base, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);

  // Set content types
  const types = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2'
  };
  const contentType = types[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}).listen(port, () => {
  console.log(`Frontend is live at http://localhost:${port}`);
});

