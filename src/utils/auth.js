import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

// Create a JWT token
export const generateToken = (user) => {
  console.log(user);
  return jwt.sign({ id: user.id, role: user.role }, secretKey, {
    expiresIn: process.env.EXPIRE_IN,
  });
};

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Token is required" });
  }
  try {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
