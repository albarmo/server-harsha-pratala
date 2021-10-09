"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate(models) {
      // define association here
      Topic.hasMany(models.Articles, {
        targetKey: "id",
        foreignKey: "topics",
      });
    }
  }
  Topic.init(
    {
      name: DataTypes.STRING,
      articleId: DataTypes.UUID,
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.id = uuidv4();
        },
      },
      sequelize,
      modelName: "Topic",
    }
  );
  return Topic;
};
