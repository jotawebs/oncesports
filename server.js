const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8' };
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(req.url.split('?')[0]);
  const safePath = pathname === '/' ? '/index.html' : pathname;
  const rootCandidate = path.normalize(path.join(root, safePath));
  const publicCandidate = path.normalize(path.join(root, 'public', safePath));
  const filePath = fs.existsSync(rootCandidate) ? rootCandidate : publicCandidate;
  if (!filePath.startsWith(root)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.readFile(filePath, (error, data) => {
    if (error) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
});
server.listen(port, '0.0.0.0', () => console.log(`Once Sports listening on ${port}`));
