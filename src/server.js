import express from "express";
//import cors from "cors";
import { prisma } from "./config/prisma.js"; // Caminho correto
import { ENV } from "./config/env.js"; // Caminho correto
import userRoutes from "./modules/users/user.routes.js"; 
import authRoutes from "./auth/auth.routes.js";

const app = express();
const PORT = ENV.PORT;

//app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ 
    status: "success",
    message: "Servidor rodando com Prisma!",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err, origin) => {
  console.error("Uncaught Exception:", err, "origin:", origin);
});

// Graceful shutdown para o Prisma
process.on("SIGINT", async () => {
  console.log("Received SIGINT, disconnecting Prisma...");
  await prisma.$disconnect();
  process.exit(0);
});