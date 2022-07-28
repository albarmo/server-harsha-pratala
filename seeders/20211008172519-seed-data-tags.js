'use strict'
const { v4: uuidv4 } = require('uuid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Tags',
      [
        {
          id: '6eb50b0d-c6dc-4228-b324-be60ff3bd5d1',
          name: 'Konservasi',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '0ff8895b-f183-4157-8d8f-5c70a119b9dd',
          name: 'River Life',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'd042e9a7-7046-4309-abb3-aa9867b0b393',
          name: 'Gunung',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'ee148018-3e3d-4506-b833-9d9fa229ff04',
          name: 'Raft',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tags', null, {})
  },
}
