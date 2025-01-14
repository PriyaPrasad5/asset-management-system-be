"use strict";

const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const loadModels = async () => {
  const db = await import("../models/relationshipManager.js");
  return db.default;
};

module.exports = {
  up: async () => {
    const db = await loadModels();
    const { User } = db;
    console.log("Seed file executed");
    const userData = [
      {
        name: "Priya Prasad",
        email: "admin@example.com",
        password: await bcrypt.hash("admin123", 10),
        role: "ADMIN",
        employeeId: 121,
        isActive: 1,
        createdOn: new Date(),
        updatedOn: new Date(),
      },
      {
        name: "Richa Prasad",
        email: "manager@example.com",
        password: await bcrypt.hash("manager123", 10),
        role: "MANAGER",
        employeeId: 131,
        isActive: 1,
        createdOn: new Date(),
        updatedOn: new Date(),
      },
    ];
    await Promise.all(
      userData.map(async (user) => {
        const existingUser = await User.findOne({
          where: { [Op.and]: [{ email: user.email }, { role: user.role }] },
        });
        if (existingUser) {
          return await User.update(user, { where: { id: existingUser.id } });
        } else {
          return await User.create(user);
        }
      })
    );
  },
  down: async () => {
    const db = await loadModels();
    const { User } = db;
    await User.destroy({
      where: {
        email: { [Op.in]: ["admin@example.com", "manager@example.com"] },
      },
    });
  },
};
