import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./db";
import passwordsRouter from "./routes/passwords";
import { apiKeyAuth } from './middleware/apiKeyAuth';

dotenv.config();

const app = express();

app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// todas as rotas protegidas sob /api/passwords só responderão 
// se o cliente enviar a chave correta no cabeçalho da requisição
//app.use("/api/passwords", apiKeyAuth, passwordsRouter);

// Teste sem a chave da API
app.use("/api/passwords", passwordsRouter);

const PORT = process.env.PORT || 3000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Falha ao conectar no banco de dados:", err);
    process.exit(1);
  });
