const express = require("express");
const fs = require("fs");
const path = require("path");
const url = require("url");

const app = express();

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

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  serveFile(res, "index.html", "text/html");
});

app.get("/script.js", (req, res) => {
  serveFile(res, "script.js", "application/javascript");
});

app.get("/about", (req, res) => {
  serveFile(res, "about.html", "text/html");
});

app.get("/contact", (req, res) => {
  serveFile(res, "contact.html", "text/html");
});

app.use((req, res) => {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
});

app.listen(PORT, (error) => {

  if(error) {
    return console.log('Error occurred: ', error);
  }
  console.log(`Server is running at http://localhost:${PORT}`);
});
