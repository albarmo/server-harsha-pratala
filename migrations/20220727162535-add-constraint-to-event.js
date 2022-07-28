'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Events_Participants', {
      fields: ['event_id'],
      type: 'foreign key',
      name: 'Fkey_Event_Participants',
      references: {
        table: 'Events',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })

    await queryInterface.addConstraint('Events', {
      fields: ['publisher_id'],
      type: 'foreign key',
      name: 'Fkey_Events_Users',
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
      'Events_Participants',
      'Fkey_Event_Participants',
      {},
    )
    await queryInterface.removeConstraint('Events', 'Fkey_Events_Users', {})
  },
}
