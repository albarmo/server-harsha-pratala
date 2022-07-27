'use strict'
const { Model } = require('sequelize')
const { v4: uuidv4 } = require('uuid')

module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate(models) {
      Topic.hasMany(models.Articles, {
        sourceKey: 'id',
        foreignKey: 'topic_id',
      })
    }
  }
  Topic.init(
    {
      name: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.id = uuidv4()
        },
      },
      sequelize,
      modelName: 'Topic',
    },
  )
  return Topic
}
