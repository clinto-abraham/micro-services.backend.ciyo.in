"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert("Products", [
      {
        id: uuidv4(),
        name: "Oyster Mushroom",
        category: "MUSHROOM",
        sku: "MUSH-001",
        description: "Fresh oyster mushroom",
        price: 150.0,
        status: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Grow Pellets",
        category: "PELLETS",
        sku: "PEL-001",
        description: "Pellets for cultivation",
        price: 500.0,
        status: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Mycelium Spawn",
        category: "MYCELIUM",
        sku: "MYC-001",
        description: "High quality spawn",
        price: 250.0,
        status: "ACTIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
