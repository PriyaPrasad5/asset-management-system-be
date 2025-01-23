import bcrypt from "bcrypt";
import db from "../models/relationshipManager.js";
import { generateToken } from "../utils/auth.js";
import { Op } from "sequelize";

const { User } = db;

// Register a new user
export const registerUser = async (userData) => {
  const { name, email, password, employeeId } = userData;

   // Check if email or employeeId already exists
   const existingUser = await User.findOne({
    where: {
      [Op.or]: [
        { email },
        { employeeId },
      ],
    },
  });

  if (existingUser) {
    const conflictField = existingUser.email === email ? 'email' : 'employee ID';
    throw new Error(`A user with this ${conflictField} already exists.`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "EMPLOYEE",
    employeeId,
    isActive: 1,
  });
  return user;
};

// Login user
export const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user);
  return token;
};
