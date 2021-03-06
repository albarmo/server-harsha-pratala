'use strict'
const { Model } = require('sequelize')
const { v4: uuidv4 } = require('uuid')

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.hasMany(models.Articles, {
        sourceKey: 'id',
        foreignKey: 'tag_id',
      })
    }
  }
  Tag.init(
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
      modelName: 'Tag',
    },
  )
  return Tag
}
