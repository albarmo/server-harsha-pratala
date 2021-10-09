"use strict";
const { hashPassword } = require("../helpers/bcrypt");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuidv4(),
          firsName: "Imam",
          lastName: "Zarkasyi",
          email: "imam@gmail.com",
          phone: "087885711430",
          address: "Manggarai",
          clubId: "HP-152",
          password: hashPassword("123456"),
          role: "non aktif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          firsName: "Albar",
          lastName: "Moerhamsa",
          email: "moerhamsa@gmail.com",
          phone: "087885711430",
          address: "Jalan H Mandor 12A, Cilandak Barat Jakarta Selatan",
          clubId: "HP-146",
          password: hashPassword("123456"),
          role: "non aktif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          firsName: "Alyaa",
          lastName: "Atiqoh",
          email: "alyaaa123@gmail.com",
          phone: "087885711430",
          address: "Jalan H Mandor 12A, Cilandak Barat Jakarta Selatan",
          clubId: "HP-160",
          password: hashPassword("123456"),
          role: "non aktif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
