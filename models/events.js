"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Events.init(
    {
      title: DataTypes.STRING,
      subtitle: DataTypes.STRING,
      description: DataTypes.STRING,
      venue: DataTypes.STRING,
      date: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
      topic_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Events",
    }
  );
  return Events;
};
