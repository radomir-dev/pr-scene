import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const [dir = ".", port = "4315"] = process.argv.slice(2);
const TYPES = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", "http://localhost");
  const path = join(dir, normalize(url.pathname).replace(/^([/\\])+/, ""));
  const file = (await stat(path).catch(() => null))?.isFile() ? path : join(dir, "index.html");
  response.setHeader("content-type", TYPES[extname(file)] ?? "application/octet-stream");
  createReadStream(file)
    .on("error", () => {
      response.statusCode = 404;
      response.end("not found");
    })
    .pipe(response);
}).listen(Number(port), "127.0.0.1", () => {
  console.log(`serving ${dir} at http://127.0.0.1:${port}`);
});
