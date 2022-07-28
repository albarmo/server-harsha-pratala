'use strict'
const { hashPassword } = require('../helpers/bcrypt')
const { v4: uuidv4 } = require('uuid')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: uuidv4(),
          first_name: 'Albar',
          last_name: 'Moerhamsa',
          gender: 'Male',
          birth_date: new Date(),
          member_id: 'HP-146',
          email: 'moerhamsa@gmail.com',
          phone: '087885711430',
          address: 'Jalan H Mandor 12A, Cilandak Barat Jakarta Selatan',
          is_admin: false,
          profile_picture:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          password: hashPassword('123456'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          first_name: 'Alyaa',
          last_name: 'Atiqoh',
          gender: 'Female',
          birth_date: new Date(),
          member_id: 'HP-158',
          email: 'alya123@gmail.com',
          phone: '087885711431',
          address: 'Jalan H Mandor 12A, Cilandak Barat Jakarta Selatan',
          is_admin: false,
          profile_picture:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          password: hashPassword('123456'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '06e8ae84-3a99-45cc-a662-e558c3ba9f9b',
          first_name: 'HP',
          last_name: 'Admin',
          gender: 'Male',
          birth_date: new Date(),
          member_id: 'HP-146',
          email: 'admin@hp.com',
          phone: '087885711432',
          address: 'Sekretariat Harsha Pratala',
          is_admin: true,
          profile_picture: null,
          password: hashPassword('123456'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
