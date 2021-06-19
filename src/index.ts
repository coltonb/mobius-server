import WebSocket = require("ws");
import express from "express";

const PORT = parseInt(<string>process.env.PORT) || 8080;

const server = express().listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);

const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws, req) {
  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`${req.socket.remoteAddress}: ${data}`);
      }
    });
  });
});
