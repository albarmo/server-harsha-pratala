'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Events_Participants extends Model {
    static associate(models) {
      Events_Participants.belongsTo(models.Events, {
        targetKey: 'id',
        foreignKey: 'event_id',
      })
    }
  }
  Events_Participants.init(
    {
      event_id: DataTypes.UUID,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      profile_picture: DataTypes.STRING,
      registration_id: DataTypes.STRING,
      registration_date: DataTypes.DATE,
      proof_of_payment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Events_Participants',
    },
  )
  return Events_Participants
}
