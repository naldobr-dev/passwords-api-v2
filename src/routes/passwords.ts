import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../db";

const router = Router();

// Helper para pegar a coleção
function getCollection() {
  return getDb().collection("psswrds");
}

// GET /api/passwords - listar todas
router.get("/", async (req: Request, res: Response) => {
  try {
    const passwords = await getCollection().find({}).toArray();
    res.status(200).json(passwords);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar senhas" });
  }
});

// GET /api/passwords/:id - buscar por id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const password = await getCollection().findOne({ _id: new ObjectId(id) });

    if (!password) {
      return res.status(404).json({ error: "Senha não encontrada" });
    }

    res.status(200).json(password);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar senha" });
  }
});

// POST /api/passwords - criar nova senha
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, username, password, url, notes, createdAt, updatedAt } = req.body;

    if (!title || !username || !password) {
      return res.status(400).json({ error: "title, username e password são obrigatórios" });
    }

    const newPassword = {
      title,
      username,
      password,
      url: url || "",
      notes: notes || "",
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date()
    };

    const result = await getCollection().insertOne(newPassword);

    res.status(201).json({ _id: result.insertedId, ...newPassword });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar senha" });
  }
});

// PUT /api/passwords/:id - atualizar senha
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const { title, username, password, url, notes, createdAt, updatedAt } = req.body;

    const updateDoc: any = {};

    if (title) updateDoc.title = title;
    if (username) updateDoc.username = username;
    if (password) updateDoc.password = password;
    if (url) updateDoc.url = url;
    if (notes) updateDoc.notes = notes;
    if (createdAt) updateDoc.createdAt = createdAt;
    updateDoc.updatedAt = updatedAt || new Date();    

    if (Object.keys(updateDoc).length === 0) {
      return res.status(400).json({ error: "Nenhum dado para atualizar" });
    }

    const result = await getCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateDoc },
      { returnDocument: "after" }
    );

    if (!result?.value) {
      return res.status(404).json({ error: "Senha não encontrada" });
    }

    res.status(200).json(result.value);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar senha" });
  }
});

// DELETE /api/passwords/:id - deletar senha
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const result = await getCollection().deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Senha não encontrada" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar senha" });
  }
});

export default router;
