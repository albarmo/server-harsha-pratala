'use strict'
const { Model, Topic } = require('sequelize')
const { v4: uuidv4 } = require('uuid')

module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
    static associate(models) {
      Articles.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'publisher_id',
      })
      Articles.belongsTo(models.Tag, {
        targetKey: 'id',
        foreignKey: 'tag_id',
      })
      Articles.belongsTo(models.Topic, {
        sourceKey: 'id',
        foreignKey: 'topic_id',
      })
      Articles.belongsToMany(models.Storage, {
        as: 'StorageForArticle',
        through: models.Bucket,
        foreignKey: 'SourceId',
      })
    }
  }
  Articles.init(
    {
      is_public: DataTypes.BOOLEAN,
      status: DataTypes.STRING,
      type: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      content: DataTypes.STRING,
      tumbnail: DataTypes.STRING,
      topic_id: DataTypes.UUID,
      tag_id: DataTypes.UUID,
      attachments: DataTypes.UUID,
      publisher_id: DataTypes.UUID,
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.id = uuidv4()
        },
      },
      sequelize,
      modelName: 'Articles',
    },
  )
  return Articles
}
