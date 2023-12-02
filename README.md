# Introduction

- Node.js is a javascript runtime build on google open-source v8 javascript engine
- Javascript outside the browser
- V8 engine parse and the run the node js code
- Node js is single thread based on event driven, non-blocking I/O model
- Node js is fast and scalable
- We can use to build : datastreaming, chatapplication,
- Dont use for heavy server side processing application
- NPM: huge library of open source packages available for everyone
- very active community

- if we write the 'node' in terminal then it open REPL: read evaluate print loop , .exit to exit repl, \_ is privious result, double tab will show you the global variable
- node file.js to run file

```js
// first program
const hello = "hello world";
console.log(hello);
```

```js
// require the module
const fs = require("fs");
```

- go to documentation if you need any help

## reading the file

```js
const fs = require("fs");
const data = fs.readFileSync("./txt/input.txt", "utf8");
console.log(data);
```

- use backtick for adding info inside the string

## writing into the file

```js
const fs = require("fs");
const data = fs.readFileSync("./txt/input.txt", "utf8");
console.log(data);

const text_out = `This is what we know about avaocado: ${data}.\nCreated on ${Date.now()}`;
console.log(text_out);
fs.writeFileSync("./txt/output.txt", text_out);
```

- synchronous code is also called as blocking the code because it run line by line
- solution to this problem is async-non-blocking code, we offload heavyload basicall work in background and when the work is done a callback function that is regester before is called and handle the result
- thread is where our code is executed
- we can encounter callback hell while using async code solution is use of promise and async-await

## reading writing Non-blocking, Asynchronous way

```js
fs.readFile("./txt/start.txt", "utf8", (err, data) => {
  console.log(data);
  fs.writeFile("./txt/output.txt", `checking the ${data}`, "utf8", (err) => {
    console.log("your file has written");
  });
});
console.log("Reading the file.....");
```

## Creating the simple server

```js
const http = require("http");

const server = http.createServer((req, res) => {
  // call callback each time we hit the server
  res.end("Hello from the server");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server started listening ");
});
```

## Routing

- implementing different action for different URL's

```js
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  // call callback each time we hit the server
  const path = req.url;
  if (path === "/overview") {
    res.end("This is overview");
  } else if (path === "/product") {
    res.end("Your are in product section");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "deep",
    });
    res.end("Url doesnot exist");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server started listening ");
});
```

## API

- service from where we can request the data

```js
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  // call callback each time we hit the server
  const path = req.url;
  if (path === "/overview") {
    res.end("This is overview");
  } else if (path === "/product") {
    res.end("Your are in product section");
  } else if (path === "/api") {
    fs.readFile("./dev-data/data.json", "utf-8", (err, data) => {
      const json = JSON.parse(data);
      console.log(json);
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "deep",
    });
    res.end("Url doesnot exist");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server started listening ");
});
```

- url.parse(req.url,true) to get parameter
- every single file in node js is module
- function without name is called anonomious function
- npm: node package manager
- npm init before starting the project which create package.json file
- npm install package-name : install package
- to run local dependency we use script to run it we cannot run directly
- to run script 'npm run script-name'
- two type of devendency (regular and developer)
- .prettierrc for prettier configuration file

```js
const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

/////////////////////////////////
// FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('ERROR! 💥');

//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Your file has been written 😁');
//       })
//     });
//   });
// });
// console.log('Will read file!');

/////////////////////////////////
// SERVER
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
```
# Node-js
