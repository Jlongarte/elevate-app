const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // Relación con el usuario que hace la compra
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Debe coincidir exactamente con el nombre del modelo de usuarios
    required: true
  },
  
  // Array de productos comprados (un pedido puede tener múltiples productos)
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Debe coincidir exactamente con el nombre del modelo de productos
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
      }
    }
  ],
  
  // Precio total de la compra
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Estado del pedido para el control del administrador
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  }
}, {
  timestamps: true // Nos dará automáticamente la fecha de creación del pedido (createdAt)
});

module.exports = mongoose.model('Order', orderSchema);