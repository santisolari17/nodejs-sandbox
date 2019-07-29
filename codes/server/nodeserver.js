console.log(`running nodeserver.js...`)
const http = require('http')
const fs = require('fs')

function serverListener(request, response) {

   const outgoingHttpHeaders = {
      'Content-type': 'text/html'
   }
   let html = fs.readFileSync(`${__dirname}/index.html`, 'utf8')
   let message = 'Hello world'
   html = html.replace('{%MESSAGE%}', message)

   response.writeHead(200, outgoingHttpHeaders)
   response.end(html)

}

function serverListenerStream(request, response) {
   
   const outgoingHttpHeaders = {
      'Content-type': 'text/html'
   }
   fs.createReadStream(`${__dirname}/index.html`, 'utf8').pipe(response)

}

function jsonResponse(request, response) {
   const outgoingHttpHeaders = {
      'Content-type': 'application/json'
   }
   const resObject = {
      message: 'Hello world',
      sender: 'John doe'
   }
   response.end(JSON.stringify(resObject))
}

function routingServer(request, response) {

   if(request.url === '/jsondata') {
      const resObject = {
         message: 'Hello world!',
         sender: 'John doe',
         description: `data sent from the requested [ ${request.url} ]`
      }
      response.end(JSON.stringify(resObject))
   } else if(request.url === '/') {
      const outgoingHttpHeaders = {
         'Content-type': 'text/html'
      }
      response.writeHead(200, outgoingHttpHeaders)
      fs.createReadStream(`${__dirname}/index.html`, 'utf8').pipe(response)
   } else {
      response.writeHead(404);
      fs.createReadStream(`${__dirname}/404.html`, 'utf8').pipe(response)
   }

}

const servers = [
   { listener: serverListener, port: 1337, name: 'no-stream-server'},
   { listener: serverListenerStream, port: 1338, name: 'stream-server'},
   { listener: jsonResponse, port: 1339, name: 'json-res-server'},
   { listener: routingServer, port: 1336, name: 'routing-server'}
]

function liftServers(servers) {
   servers.forEach(server => {
      http.createServer(server.listener).listen(server.port)
      console.log(`${server.name} listening on port ${server.port}`)
   });
}

liftServers(servers)