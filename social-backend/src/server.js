import route from "../api/route.js";
import bodyParser from "body-parser";
import express from "express";
import cors from 'cors';
import http from 'http';
import { Server } from "socket.io";
import "dotenv/config";
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Lắng nghe sự kiện 'send_message'
  socket.on('send_message', (data) => {
    io.emit('receive_message', data); // Gửi tin nhắn đến tất cả client
  });

  // Khi người dùng ngắt kết nối
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port  ${process.env.PORT} : http://localhost:${process.env.PORT}`);
});
route(app);
