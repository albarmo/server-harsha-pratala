'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Articles', {
      fields: ['topic_id'],
      type: 'foreign key',
      name: 'Fkey_Articles_Topics',
      references: {
        table: 'Topics',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })

    await queryInterface.addConstraint('Articles', {
      fields: ['tag_id'],
      type: 'foreign key',
      name: 'Fkey_Articles_Tags',
      references: {
        table: 'Tags',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })

    await queryInterface.addConstraint('Articles', {
      fields: ['publisher_id'],
      type: 'foreign key',
      name: 'Fkey_Articles_Users',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'Articles',
      'Fkey_Articles_Topics',
      {},
    )
    await queryInterface.removeConstraint('Articles', 'Fkey_Articles_Tags', {})
    await queryInterface.removeConstraint('Articles', 'Fkey_Articles_Users', {})
  },
}
