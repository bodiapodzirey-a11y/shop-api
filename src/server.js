const express = require("express");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orders");

const app = express();
app.use(express.json());

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);

app.get("/", (req, res) => {
  res.json({ message: "Shop API. Endpoints: /products, /users, /orders" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Shop API running on http://localhost:${PORT}`);
});
