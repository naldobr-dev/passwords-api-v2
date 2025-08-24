"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const passwords_1 = __importDefault(require("./routes/passwords"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Health check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
// todas as rotas protegidas sob /api/passwords só responderão 
// se o cliente enviar a chave correta no cabeçalho da requisição
//app.use("/api/passwords", apiKeyAuth, passwordsRouter);
// Teste sem a chave da API
app.use("/api/passwords", passwords_1.default);
const PORT = process.env.PORT || 3000;
(0, db_1.connectToDatabase)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
})
    .catch((err) => {
    console.error("Falha ao conectar no banco de dados:", err);
    process.exit(1);
});
