'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CronLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CronLog.init({
    cronJobId: DataTypes.UUID,
    startedAt: DataTypes.DATE,
    endedAt: DataTypes.DATE,
    status: DataTypes.STRING,
    error: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CronLog',
  });
  return CronLog;
};