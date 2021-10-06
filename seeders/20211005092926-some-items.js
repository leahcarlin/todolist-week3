"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("todoItems", [
      {
        name: "Wash dishes",
        listId: 2,
        deadline: "Tuesday",
        important: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Do laundry",
        listId: 3,
        deadline: "Friday",
        important: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vacuum",
        listId: 1,
        deadline: "Sunday",
        important: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("todoItems", null, {});
  },
};
