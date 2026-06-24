const express = require("express");
const { orders, products, users, nextId } = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(orders);
});

router.get("/:id", (req, res) => {
  const order = orders.find((o) => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

router.post("/", (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) {
    return res.status(400).json({ error: "userId, productId and quantity are required" });
  }
  if (!users.find((u) => u.id === Number(userId))) {
    return res.status(400).json({ error: "userId does not exist" });
  }
  if (!products.find((p) => p.id === Number(productId))) {
    return res.status(400).json({ error: "productId does not exist" });
  }
  const order = { id: nextId.order(), userId, productId, quantity, status: "pending" };
  orders.push(order);
  res.status(201).json(order);
});

router.put("/:id", (req, res) => {
  const order = orders.find((o) => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: "Order not found" });
  const { quantity, status } = req.body;
  if (quantity !== undefined) order.quantity = quantity;
  if (status !== undefined) order.status = status;
  res.json(order);
});

router.delete("/:id", (req, res) => {
  const index = orders.findIndex((o) => o.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Order not found" });
  orders.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
