import { Router } from "express";
import { pool } from "./db.js";
import crypto from "crypto";

const router = Router();

// Listar todas as tarefas
router.get("/tasks", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM tasks");
  res.json(rows);
});

// Criar nova tarefa
router.post("/tasks", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Título obrigatório" });

  const id = crypto.randomUUID();
  await pool.query("INSERT INTO tasks (id, title) VALUES (?, ?)", [id, title]);

  res.status(201).json({ id, title });
});

// Atualizar tarefa
router.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const [result] = await pool.query("UPDATE tasks SET title = ? WHERE id = ?", [
    title,
    id,
  ]);
  if (result.affectedRows === 0)
    return res.status(404).json({ error: "Não encontrado" });

  res.json({ id, title });
});

// Deletar tarefa
router.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
  if (result.affectedRows === 0)
    return res.status(404).json({ error: "Não encontrado" });

  res.status(204).end();
});

export default router;
