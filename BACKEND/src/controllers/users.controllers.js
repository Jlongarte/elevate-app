const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const user = new User(req.body);

    // Verificar si el email ya está registrado
    const userExist = await User.findOne({ email: user.email });
    if (userExist) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Guardar nuevo usuario
    const userDB = await user.save();
    res.status(201).json(userDB);
  } catch (error) {
    res.status(400).json({ error: "Error registrando al usuario" });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Buscar si el usuario existe por su email
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    // 2. Comparar la contraseña introducida con la encriptada en la BBDD
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    // 3. Generar el Token JWT (Guardamos el ID y el Rol para la autorización)
    const token = jwt.sign(
      { id: userDB._id, role: userDB.role },
      process.env.JWT_SECRET || "firma_secreta_provisional",
      { expiresIn: "24h" }
    );

    // 4. Responder al Frontend con el token y los datos básicos del usuario
    res.status(200).json({
      token,
      user: {
        id: userDB._id,
        name: userDB.name,
        email: userDB.email,
        role: userDB.role,
        shippingAddress: userDB.shippingAddress
      }
    });

  } catch (error) {
    res.status(500).json({ error: "Error en el servidor al iniciar sesión" });
  }
};

module.exports = { 
  registerUser,
  loginUser 
};