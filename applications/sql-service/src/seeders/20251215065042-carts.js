"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface) => {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" LIMIT 5;`
    );

    const carts = users[0].map((u) => ({
      id: uuidv4(),
      userId: u.id,
      status: "ACTIVE",
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert("Carts", carts);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("Carts", null, {});
  },
};
