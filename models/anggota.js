"use strict";
const { Model } = require("sequelize");

let { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Anggota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Anggota.init(
    {
      firsname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      no_anggota: DataTypes.STRING,
      password: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.password = hashPassword(instance.password);
        },
      },
      sequelize,
      modelName: "Anggota",
    }
  );
  return Anggota;
};
