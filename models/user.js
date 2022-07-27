'use strict'
const { Model } = require('sequelize')
const { v4: uuidv4 } = require('uuid')
let { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Articles, {
        sourceKey: 'id',
        foreignKey: 'publisher_id',
      })
      User.hasMany(models.Events, {
        sourceKey: 'id',
        foreignKey: 'publisher_id',
      })
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      gender: DataTypes.STRING,
      birth_date: DataTypes.DATE,
      member_id: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      is_admin: DataTypes.STRING,
      profile_picture: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.id = uuidv4()
          instance.password = hashPassword(instance.password)
        },
        beforeUpdate(instance) {
          instance.id = uuidv4()
          instance.password = hashPassword(instance.password)
        },
      },
      sequelize,
      modelName: 'User',
    },
  )

  return User
}
