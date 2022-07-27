'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Bucket extends Model {
    static associate(models) {
      Bucket.belongsTo(models.Articles, {
        foreignKey: 'SourceId',
        targetKey: 'id',
        as: 'Articles',
      })
      Bucket.belongsTo(models.Storage, {
        foreignKey: 'StorageId',
        targetKey: 'id',
        as: 'Storage',
      })
    }
  }
  Bucket.init(
    {
      SourceId: DataTypes.UUID,
      StorageId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'Bucket',
    },
  )

  return Bucket
}
