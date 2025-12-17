"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface) => {
    const users = await queryInterface.sequelize.query(`SELECT id FROM "Users";`);

    const addresses = users[0].map((u) => ({
      id: uuidv4(),
      userId: u.id,
      type: "HOME",
      line1: "Street 1",
      line2: "Near Park",
      city: "Kochi",
      state: "Kerala",
      country: "India",
      pincode: "682001",
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert("UserAddresses", addresses);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("UserAddresses", null, {});
  },
};
