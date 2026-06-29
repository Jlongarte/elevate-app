const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Elimina espacios en blanco innecesarios al principio y al final
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Evita precios negativos por error
  },
  category: {
    type: String,
    required: true,
    enum: ['All Products', 'T-Shirts & Tops', 'Leggins', 'Shorts'] 
  }
  size: {
    type: String,
    required: true,
    enum: ['S', 'M', 'L', 'XL'] 
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  imageUrl: {
    type: String,
   
    default: 'https://via.placeholder.com/300' 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);