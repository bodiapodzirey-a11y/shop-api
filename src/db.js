let nextProductId = 1;
let nextOrderId = 1;
let nextUserId = 1;

const products = [
  { id: nextProductId++, name: "Бездротові навушники", price: 1299, stock: 25, category: "Електроніка" },
  { id: nextProductId++, name: "Кавоварка", price: 2499, stock: 10, category: "Побутова техніка" },
  { id: nextProductId++, name: "Рюкзак", price: 899, stock: 40, category: "Аксесуари" },
];

const users = [
  { id: nextUserId++, name: "Олена Коваль", email: "olena@example.com" },
  { id: nextUserId++, name: "Іван Петренко", email: "ivan@example.com" },
];

const orders = [
  { id: nextOrderId++, userId: 1, productId: 1, quantity: 1, status: "pending" },
];

module.exports = {
  products,
  users,
  orders,
  nextId: {
    product: () => nextProductId++,
    order: () => nextOrderId++,
    user: () => nextUserId++,
  },
};
