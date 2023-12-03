const fs = require("fs");
setTimeout(() => {
  console.log("timer 1 is finished ");
}, 0);
setImmediate(() => {
  console.log("immediate one is finished");
});
fs.readFile("test.txt", "utf-8", () => {
  console.log("IO finished");
  setTimeout(() => {
    console.log("timer 1 is finished ");
  }, 0);
  setImmediate(() => {
    console.log("immediate one is finished");
  });
});

console.log("Top Level Code");

const server = http.createServer();
server.on("request", (req, res) => {
  console.log("Request Recived");
  res.end("Hello");
});
