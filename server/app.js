import "dotenv/config";
import express from "express";

const app = express();
app.use(express.json());

import cors from "cors";
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

import session from "express-session";
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
});

app.use(sessionMiddleware);

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["*"],
  },
});

io.on("connection", (socket) => {
  socket.broadcast.emit(
    "message",
    `${socket.id.substring(0, 5)} entered chat.`
  );

  socket.on("client", (data) => {
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
  });
});

import {
  createTables,
  insertUserData,
  insertTasksData,
  insertTagsData,
  insertTaskTagsData
} from "./database/initializeDatabase.js";
try {
  await createTables();
  await insertUserData();
  await insertTasksData();
  await insertTagsData();
  await insertTaskTagsData();
} catch (error) {
  console.error("Error under initialization:", error);
}

import authRouter from "./routers/authRouter/authRouter.js";
app.use(authRouter);

import taskRouter from "./routers/taskRouter/taskRouter.js";
app.use(taskRouter);

import tagRouter from "./routers/tagRouter/tagRouter.js";
app.use(tagRouter);

app.all("*", (req, res) => {
  return res.status(400).send({ data: "Not found" });
});

const PORT = process.env.PORT ?? 8080;
server.listen(8080, (error) => {
  if (error) {
    return console.log("Internal Server Error", error);
  }
  return console.log("Server is running on port", PORT);
});
