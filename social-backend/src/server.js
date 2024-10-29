import route from "../api/route.js";
import bodyParser from "body-parser";
import express from "express";
import cors from 'cors';
import http from 'http';
import { Server } from "socket.io";
import initSocket from "../libs/socket.js";
import "dotenv/config";
const app = express();
const server = http.createServer(app);
const io = initSocket(server);

app.use(express.json());
app.use(express({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
route(app);
const PORT = process.env.PORT || 3000;

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT} -  http://localhost:${PORT}`);
});

