require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // <-- Importante añadir Mongoose

// Corregimos las rutas de importación asumiendo que index.js está en la raíz
const userRoutes = require("./src/routes/users.routes");
const productRoutes = require("./src/routes/products.routes");
const orderRoutes = require("./src/routes/orders.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

// Conexión a la Base de Datos MongoDB
const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/sports_ecommerce";
mongoose
  .connect(DB_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection error:", error));

// Conexión de las rutas 
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});