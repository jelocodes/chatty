const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log('Size increase', wss.clients.size)
  wss.clients.forEach(function each(client){
    if (client.readyState === WebSocket.OPEN) {
      client.send(wss.clients.size);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', (ws) => {
    console.log('Client disconnected')
    console.log('Size decrease', wss.clients.size)
    wss.clients.forEach(function each(client){
      if (client.readyState === WebSocket.OPEN) {
        client.send(wss.clients.size);
      }
    });
  });
  ws.on('message', function incoming(data){
    // parsing string into JS object
    const dataJSON = JSON.parse(data)

    // adding unique identifier to message
    dataJSON.id = uuidv4();

    // broadcast to all clients if data is either a message or status notification
    if (!!(dataJSON.content) || !!(dataJSON.status)) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(dataJSON)); //pass string back to client socket
        }
      });
    }

    // change individual client's name if needed
    if (!!dataJSON.newname) {
      console.log(typeof dataJSON.newname)
      ws.send(`{"name": "${dataJSON.newname}"}`); //pass string back to client socket
    }
  });
});