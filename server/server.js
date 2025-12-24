import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import dropRoutes from "./routes/dropRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

/* SOCKET ACCESS IN ROUTES */
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/drops", dropRoutes);

/* SOCKET EVENTS */
io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

/* DB + SERVER */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(5000, () =>
      console.log("🚀 Server running on port 5000")
    );
  })
  .catch((err) => console.error("❌ Mongo error:", err));