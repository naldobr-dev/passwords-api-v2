import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_KEY;

export function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const clientKey = req.headers['x-api-key'];

  if (!API_KEY) {
    return res.status(500).json({ message: 'API_KEY não configurada no servidor.' });
  }

  if (!clientKey || clientKey !== API_KEY) {
    return res.status(401).json({ message: 'Chave da API inválida ou ausente.' });
  }

  next();
}