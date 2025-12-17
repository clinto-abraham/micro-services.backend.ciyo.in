"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface) => {
    const carts = await queryInterface.sequelize.query(`SELECT id FROM "Carts";`);
    const products = await queryInterface.sequelize.query(`SELECT id, price FROM "Products";`);

    const items = carts[0].map((c, i) => ({
      id: uuidv4(),
      cartId: c.id,
      productId: products[0][i % products[0].length].id,
      quantity: 2,
      priceAtAdd: products[0][i % products[0].length].price,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert("CartItems", items);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("CartItems", null, {});
  },
};
