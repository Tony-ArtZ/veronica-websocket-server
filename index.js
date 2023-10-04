import http from "http";
import { WebSocketServer } from "ws";
import { app } from "./app.js";

const server = http.createServer();
const ws = new WebSocketServer({
  server: server,
});

const PORT = process.env.PORT || 8080;

const connetions = new Set();

server.on("request", app);

ws.on("connection", (ws) => {
  console.log("Client connected !");
  connetions.add(ws);
  ws.send("Successfully connected !");
  ws.on("message", (message) => {
    console.log(message.toString());
    ws.send(message.toString());
  });

  ws.on("close", () => {
    connetions.delete(ws);
  });
});
app.post("/", (req, res) => {
  const { action } = req.body;
  console.log(action);
  for(const client of connetions) {
    client.send(action);
  }
  res.json({ message: "success" });
});

server.listen(PORT, () => console.log(`Server started on ${PORT}`));
