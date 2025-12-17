"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert("Rooms", [
      {
        id: uuidv4(),
        name: "Conference Hall A",
        location: "Bangalore",
        capacity: 100,
        basePrice: 2000,
        status: "AVAILABLE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("Rooms", null, {});
  },
};
