"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Feedback.init(
    {
      email: DataTypes.STRING,
      message: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.id = uuidv4();
        },
      },
      sequelize,
      modelName: "Feedback",
    }
  );
  return Feedback;
};
