"use strict";
const { Model } = require("sequelize");

const { v4: uuidv4 } = require("uuid");
let { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Articles, {
        targetKey: "id",
        foreignKey: "authors",
      });
    }
  }
  User.init(
    {
      firsName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      clubId: DataTypes.STRING,
      role: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.id = uuidv4();
          instance.password = hashPassword(instance.password);
        },
        beforeUpdate(instance) {
          instance.id = uuidv4();
          instance.password = hashPassword(instance.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
