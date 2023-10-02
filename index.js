import http from "http";
import { WebSocketServer } from "ws";
import { app } from "./app.js";

const server = http.createServer();
const ws = new WebSocketServer({
  server: server,
});

const PORT = process.env.PORT||8080;

server.on("request", app);

ws.on("connection", (ws) => {
  console.log("Client connected !");
  ws.send("Successfully connected !");
  app.post("/", (req, res) => {
    const { action } = req.body;
    console.log(action);
    ws.send(action);
    res.send(action);
  })
  ws.on("message", (message) => {
    console.log(message.toString())
  })
})

server.listen(PORT, () => console.log(`Server started on ${PORT}`));
