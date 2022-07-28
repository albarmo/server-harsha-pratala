'use strict'
const { Model } = require('sequelize')
const { v4: uuidv4 } = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class Recruitment extends Model {
    static associate(models) {
      // define association here
    }
  }
  Recruitment.init(
    {
      nim: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.STRING,
      birth_date: DataTypes.DATE,
      profile_picture: DataTypes.STRING,
      profile_description: DataTypes.STRING,
      faculty: DataTypes.STRING,
      year_of_college: DataTypes.STRING,
      registration_id: DataTypes.STRING,
      registration_date: DataTypes.DATE,
      medical_history: DataTypes.STRING,
      reason_to_join: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.id = uuidv4()
          instance.registration_id = `${instance.first_name}_${instance.faculty}_${instance.nim}`
        },
      },
      sequelize,
      modelName: 'Recruitment',
    },
  )
  return Recruitment
}
