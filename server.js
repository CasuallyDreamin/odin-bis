const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = 5000;

function serveFile(res, filename, contentType) {
  const filePath = path.join(__dirname, "public", filename);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
}

const server = http.createServer((req, res) => {
  const parsedURL = url.parse(req.url, true);
  const pathname = parsedURL.pathname;
  const method = req.method;

  // --- Handle static files like CSS, JS, images ---
  const ext = path.extname(pathname);
  if (ext) {
    let contentType = "text/plain";
    switch (ext) {
      case ".css":
        contentType = "text/css";
        break;
      case ".js":
        contentType = "application/javascript";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg";
        break;
      case ".html":
        contentType = "text/html";
        break;
    }
    return serveFile(res, pathname, contentType);
  }

  // --- HTML routes ---
  if (pathname === "/" && method === "GET") {
    serveFile(res, "index.html", "text/html");
  } else if (pathname === "/about" && method === "GET") {
    serveFile(res, "about.html", "text/html");
  } else if (pathname === "/contact" && method === "GET") {
    serveFile(res, "contact.html", "text/html");
  } else {
    serveFile(res, "404.html", "text/html");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
