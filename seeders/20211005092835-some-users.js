"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        name: "Leah",
        email: "leah@me.com",
        phone: 66666666,
        password: "leah",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Miguel",
        email: "miguel@me.com",
        phone: 44444444,
        password: "miguel",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jonas",
        email: "jonas@me.com",
        phone: 55555555,
        password: "jonas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
