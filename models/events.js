'use strict'
const { Model } = require('sequelize')
const { v4: uuidv4 } = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    static associate(models) {
      Events.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'publisher_id',
      })
      Events.hasMany(models.Events_Participants, {
        sourceKey: 'id',
        foreignKey: 'event_id',
      })
    }
  }
  Events.init(
    {
      is_public: DataTypes.BOOLEAN,
      status: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      content: DataTypes.STRING,
      tumbnail: DataTypes.STRING,
      price: DataTypes.INTEGER,
      event_date: DataTypes.DATE,
      registration_open_date: DataTypes.DATE,
      quota: DataTypes.INTEGER,
      publisher_id: DataTypes.UUID,
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.id = uuidv4()
        },
      },
      sequelize,
      modelName: 'Events',
    },
  )
  return Events
}
