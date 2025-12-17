'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoomBooking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RoomBooking.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
    roomId: DataTypes.UUID,
    userId: DataTypes.UUID,
    checkInDate: DataTypes.DATE,
    checkOutDate: DataTypes.DATE,
    pricePerDay: DataTypes.DECIMAL,
    totalPrice: DataTypes.DECIMAL,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RoomBooking',
  });
  return RoomBooking;
};