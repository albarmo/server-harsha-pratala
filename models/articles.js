"use strict";
const { Model } = require("sequelize");

const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Articles.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      content: DataTypes.STRING,
      topics: DataTypes.STRING,
      tags: DataTypes.STRING,
      date: DataTypes.DATE,
      authors: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.id = uuidv4();
        },
      },
      sequelize,
      modelName: "Articles",
    }
  );
  return Articles;
};
