const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const host = "127.0.0.1";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function sendFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  let requestedPath = path.join(root, urlPath);

  if (urlPath === "/") {
    requestedPath = path.join(root, "index.html");
  }

  if (fs.existsSync(requestedPath) && fs.statSync(requestedPath).isDirectory()) {
    requestedPath = path.join(requestedPath, "index.html");
  }

  if (!fs.existsSync(requestedPath)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  sendFile(requestedPath, res);
});

server.listen(port, host, () => {
  console.log(`Local server is running on http://${host}:${port}`);
});
