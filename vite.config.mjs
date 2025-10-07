import { defineConfig } from 'vite';
import nunjucks from 'nunjucks';
import path from 'path';

const pages = ['index', 'about', 'contact'];

nunjucks.configure(path.resolve('templates'), { autoescape: true });

export default defineConfig({
  plugins: [
    {
      name: 'nunjucks-dev',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          let page = req.url === '/' ? 'index' : req.url.replace('/', '').replace('.html','');
          if (pages.includes(page)) {
            const html = nunjucks.render(`${page}.njk`);
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
            return;
          }
          next();
        });
      }
    }
  ]
});
