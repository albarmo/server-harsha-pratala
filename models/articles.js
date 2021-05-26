"use strict";
const { Model } = require("sequelize");
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
      topic_id: DataTypes.INTEGER,
      tags_id: DataTypes.INTEGER,
      date: DataTypes.DATE,
      author_id: DataTypes.INTEGER,
      comment_id: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Articles",
    }
  );
  return Articles;
};
