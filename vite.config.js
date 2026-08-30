import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// Vite plugin to simulate Vercel Serverless Functions in local development
function apiDevPlugin() {
  return {
    name: 'api-dev-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Intercept requests targeting /api/*
        if (req.url && req.url.startsWith('/api/')) {
          const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
          const routeName = url.pathname.replace(/^\/api\//, '');
          const filePath = path.join(process.cwd(), 'api', `${routeName}.js`);

          if (fs.existsSync(filePath)) {
            try {
              // Dynamically load the serverless function handler module via Vite SSR
              const apiModule = await server.ssrLoadModule(filePath);

              // Mock Vercel Request Object properties (query and body)
              req.query = Object.fromEntries(url.searchParams.entries());
              
              if (req.method !== 'GET' && req.method !== 'HEAD') {
                let body = '';
                await new Promise((resolve) => {
                  req.on('data', chunk => { body += chunk; });
                  req.on('end', resolve);
                });
                if (body) {
                  try {
                    req.body = JSON.parse(body);
                  } catch {
                    req.body = body;
                  }
                }
              }

              // Mock Vercel Response Object helper methods (status and json)
              res.status = (statusCode) => {
                res.statusCode = statusCode;
                return res;
              };
              res.json = (data) => {
                if (!res.writableEnded) {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                }
                return res;
              };

              // Run the handler
              await apiModule.default(req, res);
              return;
            } catch (err) {
              console.error(`Error executing local API handler for /api/${routeName}:`, err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Serverless Function Execution Error', message: err.message }));
              return;
            }
          }
        }
        next();
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), apiDevPlugin()],
})
