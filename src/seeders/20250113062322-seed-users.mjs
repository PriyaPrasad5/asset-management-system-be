"use strict";

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };
// import bcrypt from "bcrypt";
// const bcrypt=require("bcrypt")
// export async function up(queryInterface, Sequelize) {
//   const existingUser = await queryInterface.rawSelect(
//     'users',
//     {
//       where: { email: 'admin@example.com' },
//     },
//     ['id']
//   );

//   if (!existingUser) {
//     await queryInterface.bulkInsert('users', [
//       {
//         name: "Priya Prasad",
//       email: "admin@example.com",
//       password: await bcrypt.hash("admin123", 10),
//       role: "ADMIN",
//       employeeId: 121,
//       isActive: 1,
//       created_on: new Date(),
//       updated_on: new Date(),
//       },
//     ]);
//   }
// }
// export async function down(queryInterface, Sequelize) {
//   await queryInterface.bulkDelete('users', { email: 'admin@example.com' });
// }
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import db from "../models/relationshipManager.js";

const { User } = db;
const users = await User.findAll();
console.log("Existing Users:", users);
export const up = async (queryInterface, Sequelize) => {
  const userData = [
    {
      name: "Priya Prasad",
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
      employeeId: 121,
      isActive: 1,
      created_on: new Date(),
      updated_on: new Date(),
    },
    {
      name: "Richa Prasad",
      email: "manager@example.com",
      password: await bcrypt.hash("manager123", 10),
      role: "MANAGER",
      employeeId: 131,
      isActive: 1,
      created_on: new Date(),
      updated_on: new Date(),
    },
  ];

  for (const user of userData) {
    const existingUser = await queryInterface.rawSelect(
      'users',
      {
        where: { email: user.email },
      },
      ['id']
    );

    if (!existingUser) {
      await queryInterface.bulkInsert('users', [
        {
          ...user,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } else {
      console.log(`User with email ${user.email} already exists.`);
    }
  }
};

export const down = async () => {
  // to revert the seed, e.g., by deleting the seeded users
  await User.destroy({
    where: {
      email: {
        [Op.in]: ["john.doe@example.com", "jane.smith@example.com"],
      },
    },
  });
};
