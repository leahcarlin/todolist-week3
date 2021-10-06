"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("todoLists", [
      {
        name: "Work List",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Home List",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fun List",
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("todoLists", null, {});
  },
};
