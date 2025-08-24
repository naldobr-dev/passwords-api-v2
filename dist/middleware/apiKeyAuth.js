"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyAuth = apiKeyAuth;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_KEY = process.env.API_KEY;
function apiKeyAuth(req, res, next) {
    const clientKey = req.headers['x-api-key'];
    if (!API_KEY) {
        return res.status(500).json({ message: 'API_KEY não configurada no servidor.' });
    }
    if (!clientKey || clientKey !== API_KEY) {
        return res.status(401).json({ message: 'Chave da API inválida ou ausente.' });
    }
    next();
}
