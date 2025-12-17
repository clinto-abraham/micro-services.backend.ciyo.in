"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface) => {
    const users = Array.from({ length: 10 }).map((_, i) => ({
      id: uuidv4(),
      firstName: `User${i + 1}`,
      lastName: "Demo",
      email: `user${i + 1}@demo.com`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert("Users", users);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
