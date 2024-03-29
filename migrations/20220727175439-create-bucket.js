'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Buckets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      SourceId: {
        type: Sequelize.UUID,
        primaryKey: false,
        references: {
          model: 'Articles',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        unique: 'unique-storage-per-article-1',
      },
      StorageId: {
        type: Sequelize.UUID,
        primaryKey: false,
        references: {
          model: 'Storages',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        unique: 'unique-storage-per-article-2',
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Buckets')
  },
}
