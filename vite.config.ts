import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function photoStoragePlugin(): Plugin {
  return {
    name: 'photo-storage-plugin',
    configureServer(server) {
      // Direct high-performance static image serving for real campus and lab photos
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (url.match(/\.(jpe?g|png|webp|svg)$/i)) {
          const filename = path.basename(url);
          const filePath = path.resolve(__dirname, 'public', filename);
          if (fs.existsSync(filePath)) {
            const ext = path.extname(filename).toLowerCase();
            const contentType = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : ext === '.svg' ? 'image/svg+xml' : 'image/jpeg';
            res.writeHead(200, {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=31536000',
              'Access-Control-Allow-Origin': '*'
            });
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        next();
      });

      const handleSaveFileRequest = (req: any, res: any) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', () => {
            try {
              const { filename, base64Data } = JSON.parse(body);
              if (filename && base64Data) {
                const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, '');
                const buffer = Buffer.from(cleanBase64, 'base64');
                const publicDir = path.resolve(__dirname, 'public');
                if (!fs.existsSync(publicDir)) {
                  fs.mkdirSync(publicDir, { recursive: true });
                }
                const targetPath = path.join(publicDir, filename);
                fs.writeFileSync(targetPath, buffer);
                const distDir = path.resolve(__dirname, 'dist');
                if (fs.existsSync(distDir)) {
                  fs.writeFileSync(path.join(distDir, filename), buffer);
                }
                res.writeHead(200, { 
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({ success: true, path: '/' + filename, filename }));
                return;
              }
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: String(err) }));
              return;
            }
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid payload' }));
          });
        } else {
          res.writeHead(405);
          res.end();
        }
      };

      server.middlewares.use('/api/save-photo', handleSaveFileRequest);
      server.middlewares.use('/api/upload-file', handleSaveFileRequest);

      server.middlewares.use('/api/list-photos', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        try {
          const publicDir = path.resolve(__dirname, 'public');
          if (!fs.existsSync(publicDir)) {
            res.end(JSON.stringify({ photos: [] }));
            return;
          }
          const files = fs.readdirSync(publicDir);
          const photoFiles = files.filter(f => /\.(jpe?g|png|webp)$/i.test(f)).map(f => {
            const stat = fs.statSync(path.join(publicDir, f));
            return {
              filename: f,
              path: '/' + f,
              size: stat.size,
              createdAt: stat.mtimeMs
            };
          }).sort((a, b) => b.createdAt - a.createdAt);
          res.end(JSON.stringify({ photos: photoFiles }));
        } catch (err) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: String(err) }));
        }
      });

      server.middlewares.use('/api/delete-photo', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { filename } = JSON.parse(body);
              if (filename) {
                const safeName = path.basename(filename);
                const publicTarget = path.join(path.resolve(__dirname, 'public'), safeName);
                if (fs.existsSync(publicTarget)) {
                  fs.unlinkSync(publicTarget);
                }
                const distTarget = path.join(path.resolve(__dirname, 'dist'), safeName);
                if (fs.existsSync(distTarget)) {
                  fs.unlinkSync(distTarget);
                }
                res.end(JSON.stringify({ success: true, deleted: safeName }));
                return;
              }
            } catch (err) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: String(err) }));
              return;
            }
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'Missing filename' }));
          });
        } else {
          res.writeHead(405);
          res.end();
        }
      });

      // Gemini AI Image Generation & Editing Endpoint (gemini-3.1-flash-image-preview)
      server.middlewares.use('/api/gemini/generate-image', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if (req.method === 'OPTIONS') {
          res.writeHead(204);
          res.end();
          return;
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', async () => {
            try {
              const payload = body ? JSON.parse(body) : {};
              const { generateOrEditImage } = await import('./src/server/geminiImageService');
              const result = await generateOrEditImage({
                prompt: payload.prompt || '',
                aspectRatio: payload.aspectRatio || '1:1',
                style: payload.style || 'photorealistic',
                action: payload.action || 'generate',
                editImageBase64: payload.editImageBase64,
                apiKey: payload.apiKey || process.env.GEMINI_API_KEY
              });
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(result));
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                success: false,
                error: err?.message || String(err)
              }));
            }
          });
        } else {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
        }
      });

      // Firecrawl Agent Endpoint: handles autonomous web extraction and agent workflows
      server.middlewares.use('/api/firecrawl/agent', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-firecrawl-key, Authorization');

        if (req.method === 'OPTIONS') {
          res.writeHead(204);
          res.end();
          return;
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk; });
          req.on('end', async () => {
            try {
              const payload = body ? JSON.parse(body) : {};
              const headerKey = (req.headers['x-firecrawl-key'] as string) || '';
              const authHeader = (req.headers['authorization'] as string) || '';
              const bearerKey = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : '';
              const apiKey = payload.apiKey || headerKey || bearerKey || process.env.FIRECRAWL_API_KEY || '';

              const { runFirecrawlAgent } = await import('./src/server/firecrawlService');
              const result = await runFirecrawlAgent({
                prompt: payload.prompt,
                urls: payload.urls || (payload.url ? [payload.url] : undefined),
                schema: payload.schema,
                apiKey,
                model: payload.model,
                maxCredits: payload.maxCredits,
              });

              res.writeHead(result.success ? 200 : 500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(result));
            } catch (err: any) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ 
                success: false, 
                error: err?.message || String(err),
                status: 'failed'
              }));
            }
          });
        } else {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed. Use POST.' }));
        }
      });

      // Firecrawl Status / Config check endpoint
      server.middlewares.use('/api/firecrawl/status', (req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        const hasKey = Boolean(process.env.FIRECRAWL_API_KEY && process.env.FIRECRAWL_API_KEY !== 'fc-YOUR_API_KEY');
        res.end(JSON.stringify({
          service: 'Firecrawl Agent API',
          configured: hasKey,
          targetDomain: 'https://bengal-computer-training-institute-ku-2439.ai.studio/',
          supportedEndpoints: ['/api/firecrawl/agent', '/api/firecrawl/scrape'],
          defaultModel: 'spark-2'
        }));
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), photoStoragePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
