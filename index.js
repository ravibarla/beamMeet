const cors = require("cors");
const express = require("express");
const connectDB = require("./config");
const router = require("./routes");
const socketIo = require("socket.io");
const http = require("http");
connectDB();
const PORT = 8081;
const app = express();

//middleware
const corsOptions = {
  origin: "*", // Allow specific origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  credentials: true, // Enable cookies to be sent across domains
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

// WebSocket for signaling
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow this origin
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (data) => {
    // Handle incoming messages
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// app.listen(PORT, () => {
//   console.log("app is listening in ", PORT);
// });
server.listen(PORT, () => {
  console.log("Server is running on port :", PORT);
});
