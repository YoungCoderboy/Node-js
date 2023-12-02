const hello = 'hello world';
console.log(hello);

const fs = require('fs');
// const data = fs.readFileSync('./txt/input.txt','utf8')
// console.log(data)

// const text_out = `This is what we know about avaocado: ${data}.\nCreated on ${Date.now()}`
// console.log(text_out)
// fs.writeFileSync('./txt/output.txt',text_out);

// fs.readFile('./txt/start.txt','utf8',(err,data)=>{
//     console.log(data);
//     fs.writeFile('./txt/output.txt',`checking the ${data}`,'utf8',err=>{
//         console.log('your file has written');

//     })
// })
// console.log('Reading the file.....')

const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // call callback each time we hit the server
  const path = req.url;
  if (path === '/overview') {
    res.end('This is overview');
  } else if (path === '/product') {
    res.end('Your are in product section');
  } else if (path === '/api') {
    fs.readFile('./dev-data/data.json', 'utf-8', (err, data) => {
      const json = JSON.parse(data);
      console.log(json);
      res.writeHead(200, {
        'Content-type': 'application/json',
      });
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'deep',
    });
    res.end('Url doesnot exist');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server started listening ');
});
