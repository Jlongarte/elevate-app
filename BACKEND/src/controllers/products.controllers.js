const Product = require("../models/product.model");

// 1. OBTENER TODOS LOS PRODUCTOS (Con filtro opcional por categoría)
const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};

    
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// 2. OBTENER UN PRODUCTO POR SU ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el detalle del producto" });
  }
};

// 3. CREAR UN NUEVO PRODUCTO (Para el Panel de Admin)
const createProduct = async (req, res) => {
  try {
    // Al usar new Product(req.body) seguimos tu estilo orientado a objetos
    const product = new Product(req.body);
    const productDB = await product.save();
    
    res.status(201).json(productDB);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el producto. Revisa los campos obligatorios." });
  }
};

// ... (Tus funciones anteriores: getAllProducts, getProductById, createProduct se quedan igual)

// 4. MODIFICAR UN PRODUCTO EXISTENTE (Para el Panel de Admin)
const modifyProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // { new: true } hace que MongoDB devuelva el producto ya modificado en lugar del antiguo
    // { runValidators: true } asegura que las validaciones del modelo (como min: 0 en precio) se cumplan al editar
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { 
      new: true, 
      runValidators: true 
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: "Error al modificar el producto. Revisa los datos introducidos." });
  }
};

// 5. ELIMINAR UN PRODUCTO (Para el Panel de Admin)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto eliminado correctamente", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  modifyProduct, // Añadido
  deleteProduct  // Añadido
};