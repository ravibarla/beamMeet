const cors = require("cors");
const express = require("express");
const http = require("http");
const ws = require("ws");
const connectDB = require("./config");
const router = require("./routes");
connectDB();
const PORT = 8081;
const WebSocket = require("ws");

const app = express();

//middleware

app.use(router);
// app.use(cors());
// app.use(
//   cors({
//     origin: "*", // Replace with your frontend URL
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true
//   })
// );
app.use(express.json());
//create server
const httpServer = http.createServer(app);
const wss = new WebSocket.Server({ server: httpServer });

//websocket signalling
wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case "join-room":
        ws.roomId = data.roomId;
        broadcast(ws.roomId, data); // Notify others in the room
        break;

      case "offer":
      case "answer":
      case "candidate":
        broadcast(ws.roomId, data); // Broadcast signaling data (SDP, ICE) to peers
        break;

      default:
        break;
    }
  });
  ws.on("close", () => {
    console.log("User disconnected");
  });
});
// Helper function to broadcast to all clients in the same room
function broadcast(roomId, data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client.roomId === roomId) {
      client.send(JSON.stringify(data));
    }
  });
}

// app.listen(PORT, () => {
//   console.log("app is listening in ", PORT);
// });

// Start HTTP server
httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
