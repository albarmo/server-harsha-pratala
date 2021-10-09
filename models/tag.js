"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      // define association here
      Tag.hasMany(models.Articles, {
        targetKey: "id",
        foreignKey: "tags",
      });
    }
  }
  Tag.init(
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
      modelName: "Tag",
    }
  );
  return Tag;
};
