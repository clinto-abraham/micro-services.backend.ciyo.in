"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface) => {
    const products = await queryInterface.sequelize.query(
      `SELECT id FROM "Products";`
    );

    const stocks = products[0].map((p) => ({
      id: uuidv4(),
      productId: p.id,
      quantity: 100,
      unit: "KG",
      threshold: 20,
      lastUpdatedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert("Stocks", stocks);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("Stocks", null, {});
  },
};
