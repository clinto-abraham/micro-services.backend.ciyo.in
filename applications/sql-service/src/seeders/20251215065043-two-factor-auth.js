"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface) => {
    const users = await queryInterface.sequelize.query(`SELECT id, email FROM "Users";`);

    const records = users[0].slice(0, 5).map((u) => ({
      id: uuidv4(),
      userId: u.id,
      method: "EMAIL",
      identifier: u.email,
      secret: "encrypted-secret",
      isEnabled: true,
      lastVerifiedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert("TwoFactorAuths", records);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete("TwoFactorAuths", null, {});
  },
};
