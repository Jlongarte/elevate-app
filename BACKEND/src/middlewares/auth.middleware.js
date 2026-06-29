const jwt = require("jsonwebtoken");

// 1. VERIFY JWT TOKEN (For logged-in routes like Checkout or Order History)
const verifyToken = (req, res, next) => {
  // Read the token from the 'Authorization' header (Format: Bearer TOKEN)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  // Split the string to grab only the token code
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using your secret signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "firma_secreta_provisional");
    
    // Inject user data (id and role) inside the request object (req)
    req.user = decoded;
    
    next(); // Pass control to the next function (middleware or controller)
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

// 2. CHECK IF USER IS ADMIN (For Admin Dashboard routes)
const isAdmin = (req, res, next) => {
  // req.user is available because verifyToken runs right before this function
  if (req.user && req.user.role === "admin") {
    next(); // Authorized! Pass control to the controller
  } else {
    return res.status(403).json({ error: "Access denied. Administrator privileges required." });
  }
};

module.exports = {
  verifyToken,
  isAdmin
};