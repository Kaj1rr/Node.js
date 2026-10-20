import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer(async (req, res) => {
  let file = 'page1.html';
  if (req.url === '/page2') file = 'page2.html';

  try {
    const html = await readFile(new URL(`./${file}`, import.meta.url));
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
  } catch {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});