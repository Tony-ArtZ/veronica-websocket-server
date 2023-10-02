import WebSocket, { WebSocketServer } from 'ws';
import express from 'express';
import 'dotenv/config'

const PORT = process.env.PORT;
const WSSPORT = process.env.WSS_PORT;

const app = express();
const ws = new WebSocketServer({ port: WSSPORT });

app.use(express.json());

ws.on("connection", (ws) => {
  console.log("Client Connected")
  ws.send("Hello");

  app.post("/", async (req, res) => {
    const {action} = req.body;
    console.log(action)
    ws.send(action);
    res.send("success!");
  })
  app.listen(PORT, () => console.log(`Server started on ${PORT}`));
});

