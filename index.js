require("dotenv").config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth";
import taskRoutes from "./routes/task";

const morgan = require("morgan");

// express app
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  path: "/socket.io",
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
});

// database
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB CONNECTION ESTABLISHED"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// route middlewares
app.use("/api", authRoutes);
app.use("/api", taskRoutes);

// socket
io.on("connect", (socket) => {
  socket.on("new-task", (task) => {
    socket.broadcast.emit("new-task", task);
  });
});

// start the server
http.listen(8000, () => console.log("Server running on port 8000"));
