'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Logistics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Logistics.init({
    code: DataTypes.STRING,
    image: DataTypes.STRING,
    division: DataTypes.STRING,
    description: DataTypes.STRING,
    buy_date: DataTypes.DATE,
    condition: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Logistics',
  });
  return Logistics;
};