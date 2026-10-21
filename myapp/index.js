import {createServer} from 'node:http';
import fs  from 'node:fs/promises';

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer(async (req, res) => {
  let file;

  if (req.url === '/' || req.url === '/page1') {
    file = 'page1.html';
  } else if (req.url === '/page2') {
    file = 'page2.html';
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('страница не нашлась');
    return 0;
  }

  try {
    const html = await fs.readFile(
      new URL(`./${file}`, import.meta.url),
      'utf8'
    );

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
  } catch (err) {
    console.error('файл не читается:', err.message);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('не загружается страница');
  }
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен: http://${hostname}:${port}/`);
});
