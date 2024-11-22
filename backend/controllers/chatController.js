import { WebSocketServer } from "ws";

let wss;

export const initializeWebSocket = (server) => {
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", (message) => {
      console.log(`Received message: ${message}`);
      // Broadcast the message to all clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};
