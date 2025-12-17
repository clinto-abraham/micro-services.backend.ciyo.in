'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventSeat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EventSeat.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
    eventId: DataTypes.UUID,
    seatNumber: DataTypes.STRING,
    seatType: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    isBooked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'EventSeat',
  });
  return EventSeat;
};