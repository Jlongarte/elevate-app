const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById, createProduct, modifyProduct, deleteProduct } = require("../controllers/products.controllers");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware"); // Importamos

// Rutas Públicas
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Rutas Protegidas (Solo Admin)
router.post("/", verifyToken, isAdmin, createProduct);
router.put("/:id", verifyToken, isAdmin, modifyProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

module.exports = router;