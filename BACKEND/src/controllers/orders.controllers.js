const Order = require("../models/order.model");
const User = require("../models/user.model");

// 1. CREAR UN NUEVO PEDIDO (Proceso de Checkout)
const createOrder = async (req, res) => {
  try {
    const { products, totalPrice, shippingAddress } = req.body;
    
    // El userId lo rescataremos más adelante del token del usuario logueado.
    // De momento, para tus pruebas en Postman, lo puedes mandar en el body o simularlo.
    const userId = req.body.userId || req.user?.id; 

    if (!userId) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    // 1. Guardar o actualizar la dirección de envío en el perfil del usuario (tu requisito de diseño)
    if (shippingAddress) {
      await User.findByIdAndUpdate(userId, { shippingAddress });
    }

    // 2. Crear la instancia del pedido con tu estilo limpio
    const order = new Order({
      userId,
      products,
      totalPrice
    });

    const orderDB = await order.save();
    res.status(201).json(orderDB);

  } catch (error) {
    res.status(400).json({ error: "Error al procesar el pedido. Revisa los datos de compra." });
  }
};

// 2. OBTENER LOS PEDIDOS DEL USUARIO LOGUEADO (Historial de compras)
const getUserOrders = async (req, res) => {
  try {
    // Buscamos los pedidos cuyo userId coincida con el del cliente
    const userId = req.user?.id || req.params.userId; // Flexibilidad para pruebas
    
    const orders = await Order.find({ userId })
      .populate("products.productId", "name price imageUrl") // Trae datos clave de la ropa deportiva
      .sort({ createdAt: -1 }); // Muestra los más recientes primero

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el historial de pedidos" });
  }
};

// 3. OBTENER TODOS LOS PEDIDOS (Exclusivo para el Panel de Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email") // Trae el nombre y email del cliente que compró
      .populate("products.productId", "name price category") // Trae los detalles de lo que compró
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los pedidos para el administrador" });
  }
};

// 4. ACTUALIZAR EL ESTADO DE UN PEDIDO (Para el Panel de Admin, ej: cambiar a 'Shipped')
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el estado del pedido" });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
};