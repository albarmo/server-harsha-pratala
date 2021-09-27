"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Recruitment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recruitment.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      faculty: DataTypes.STRING,
      year: DataTypes.STRING,
      medicalHistory: DataTypes.STRING,
      experience: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.id = uuidv4();
        },
      },
      sequelize,
      modelName: "Recruitment",
    }
  );
  return Recruitment;
};
