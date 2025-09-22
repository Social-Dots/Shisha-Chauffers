import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";
// import compression from "compression"; // TODO: Install compression package

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // TODO: Add compression middleware in production (requires compression package)
  // if (process.env.NODE_ENV === 'production') {
  //   app.use(compression({
  //     level: 6,
  //     threshold: 1024, // Only compress files larger than 1KB
  //     filter: (req, res) => {
  //       if (req.headers['x-no-compression']) {
  //         return false;
  //       }
  //       return compression.filter(req, res);
  //     }
  //   }));
  // }

  // Try multiple possible paths for the built files
  const possiblePaths = [
    path.resolve(__dirname, "..", "dist", "public"),
    path.resolve(__dirname, "..", "client", "dist"),
    path.resolve(__dirname, "public"),
    path.resolve(process.cwd(), "dist", "public"),
    path.resolve(process.cwd(), "client", "dist")
  ];

  let distPath: string | null = null;
  for (const testPath of possiblePaths) {
    if (fs.existsSync(testPath)) {
      distPath = testPath;
      break;
    }
  }

  if (!distPath) {
    console.error("Could not find build directory. Tried:", possiblePaths);
    // Fallback - serve a simple HTML response
    app.use("*", (_req, res) => {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head><title>Shisha Cafe</title></head>
        <body>
          <h1>Shisha Cafe</h1>
          <p>Application is starting up...</p>
          <p>Build directory not found. Please check deployment.</p>
        </body>
        </html>
      `);
    });
    return;
  }

  console.log("Serving static files from:", distPath);
  
  // Serve static assets with long-term caching for hashed files
  app.use(express.static(distPath, {
    maxAge: process.env.NODE_ENV === 'production' ? '1y' : 0,
    immutable: process.env.NODE_ENV === 'production',
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      // Set no-cache for HTML files to ensure fresh content
      if (path.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      }
      // Set long-term cache for assets with hash in filename
      else if (/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/.test(path)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      // Set no-cache headers for HTML
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.sendFile(indexPath);
    } else {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head><title>Shisha Cafe</title></head>
        <body>
          <h1>Shisha Cafe</h1>
          <p>Welcome to Shisha Cafe!</p>
          <p>Static files path: ${distPath}</p>
        </body>
        </html>
      `);
    }
  });
}
