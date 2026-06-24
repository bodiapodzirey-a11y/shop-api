const express = require("express");
const { users, nextId } = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }
  const user = { id: nextId.user(), name, email };
  users.push(user);
  res.status(201).json(user);
});

router.put("/:id", (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  const { name, email } = req.body;
  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  res.json(user);
});

router.delete("/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "User not found" });
  users.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
