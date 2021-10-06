"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("todoLists", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users", // make plural even though model is singular
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("todoItems", "listId", {
      type: Sequelize.INTEGER,
      references: {
        model: "todoLists",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("todoLists", "userId");
    await queryInterface.removeColumn("todoItems", "listId");
  },
};
