'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    uuid: DataTypes.UUID,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    status: DataTypes.STRING,
    isEmailVerified: DataTypes.BOOLEAN,
    lastLoginAt: DataTypes.DATE,
    twoFactorEnabled: DataTypes.BOOLEAN,
    twoFactorSecret: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};