const express = require("express");
const { products, nextId } = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(products);
});

router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

router.post("/", (req, res) => {
  const { name, price, stock, category, description, sku } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: "name and price are required" });
  }
  const product = {
    id: nextId.product(),
    name,
    price,
    stock: stock ?? 0,
    category: category ?? null,
    description: description ?? null,
    sku: sku ?? null,
  };
  products.push(product);
  res.status(201).json(product);
});

router.put("/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  const { name, price, stock, category, description, sku } = req.body;
  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (stock !== undefined) product.stock = stock;
  if (category !== undefined) product.category = category;
  if (description !== undefined) product.description = description;
  if (sku !== undefined) product.sku = sku;
  res.json(product);
});

router.delete("/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Product not found" });
  products.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
