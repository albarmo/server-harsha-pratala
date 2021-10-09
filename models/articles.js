"use strict";
const { Model } = require("sequelize");

const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
    static associate(models) {
      // define association here
      Articles.belongsTo(models.User, {
        targetKey: "id",
        foreignKey: "authors",
      });
      Articles.hasMany(models.Tag, {
        targetKey: "id",
        foreignKey: "articleId",
      });
      Articles.hasOne(models.Topic, {
        targetKey: "id",
        foreignKey: "articleId",
      });
    }
  }
  Articles.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      content: DataTypes.STRING,
      topics: DataTypes.UUID,
      tags: DataTypes.UUID,
      date: DataTypes.DATE,
      authors: DataTypes.UUID,
      status: DataTypes.STRING,
      fileIds: DataTypes.UUID,
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
