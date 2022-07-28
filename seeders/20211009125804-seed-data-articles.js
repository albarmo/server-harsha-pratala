'use strict'
const { v4: uuidv4 } = require('uuid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Articles',
      [
        {
          id: uuidv4(),
          is_public: true,
          status: 'Published',
          type: 'Blog',
          title: 'Article Test 1',
          description: 'article description',
          content: 'content articles',
          tumbnail: null,
          topic_id: '872a2532-4c78-4406-af34-5f3244a2736b',
          tag_id: '6eb50b0d-c6dc-4228-b324-be60ff3bd5d1',
          attachments: null,
          publisher_id: '06e8ae84-3a99-45cc-a662-e558c3ba9f9b',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          is_public: true,
          status: 'Published',
          type: 'Blog',
          title: 'Article Test 2',
          description: 'article description',
          content: 'content articles',
          tumbnail: null,
          topic_id: '872a2532-4c78-4406-af34-5f3244a2736b',
          tag_id: '6eb50b0d-c6dc-4228-b324-be60ff3bd5d1',
          attachments: null,
          publisher_id: '06e8ae84-3a99-45cc-a662-e558c3ba9f9b',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Articles', null, {})
  },
}
