const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  
  // OPTIONAL ON REGISTRATION - FILLED DURING CHECKOUT
  shippingAddress: {
    street: { type: String },
    city: { type: String },
    zipCode: { type: String },
    province: { type: String },
    country: { type: String, default: 'Spain' }
  }
}, {
  timestamps: true
});

userSchema.pre("save", function (next) {
  // SI LA CONTRASEÑA NO HA SIDO MODIFICADA (O ES NUEVA), SALTA AL SIGUIENTE PASO
  if (!this.isModified("password")) {
    return next();
  }

  // 'this.password' contiene la contraseña en texto plano, solo se encripta aquí
  this.password = bcrypt.hashSync(this.password, 10); 
  next(); 
});

const User = mongoose.model("User", userSchema);
module.exports = User;