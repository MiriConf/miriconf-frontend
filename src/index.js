const http = require('http');
let fs = require('fs');
 
const host = '0.0.0.0';
const port = 8080;

let handleRequest = (request, response) => {
  response.writeHead(200, {
      'Content-Type': 'text/html'
  });
  fs.readFile('./templates/teams.html', null, function (error, data) {
      if (error) {
          response.writeHead(404);
          respone.write('Whoops! File not found!');
      } else {
          response.write(data);
      }
      response.end();
  });
};

http.createServer(handleRequest).listen(port, host, () => {
  console.log('running at http://%s:%s',host,port );
});