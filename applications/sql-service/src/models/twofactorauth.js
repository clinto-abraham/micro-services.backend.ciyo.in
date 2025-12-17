'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TwoFactorAuth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TwoFactorAuth.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
    userId: DataTypes.UUID,
    method: DataTypes.STRING,
    identifier: DataTypes.STRING,
    secret: DataTypes.STRING,
    isEnabled: DataTypes.BOOLEAN,
    lastVerifiedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TwoFactorAuth',
  });
  return TwoFactorAuth;
};