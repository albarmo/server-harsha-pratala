'use strict'
const { v4: uuidv4 } = require('uuid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Topics',
      [
        {
          id: '872a2532-4c78-4406-af34-5f3244a2736b',
          name: 'Pendidikan Dan Latihan',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '0fc27257-144e-4a98-abb2-b186df00115e',
          name: 'Perjalanan',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Topics', null, {})
  },
}
