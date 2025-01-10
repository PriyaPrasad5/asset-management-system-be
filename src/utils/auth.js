import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY || "secretKey";

// Create a JWT token
export const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
};

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  
  if (!token) {
    return res.status(403).json({ error: "Token is required" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  });
};
