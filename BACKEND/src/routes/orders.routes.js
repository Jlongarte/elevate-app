const express = require("express");
const router = express.Router();
const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require("../controllers/orders.controllers");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware"); // Importamos

// Rutas de Clientes (Requieren estar logueado)
router.post("/", verifyToken, createOrder);
router.get("/my-orders", verifyToken, getUserOrders);

// Rutas de Admin (Requieren estar logueado Y ser administrador)
router.get("/admin/all", verifyToken, isAdmin, getAllOrders);
router.put("/admin/:id", verifyToken, isAdmin, updateOrderStatus);

module.exports = router;