"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false
      },

      status: {
        type: DataTypes.ENUM("PENDING", "ACTIVE", "SUSPENDED"),
        defaultValue: "PENDING"
      },

      twoFactorEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },

      twoFactorSecret: {
        type: DataTypes.STRING,
        allowNull: true
      },

      lastLoginAt: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      paranoid: true
    }
  );

  return User;
};
