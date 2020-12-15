'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Areas', [
    {
      nome: 'Ciências Exatas',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Ciências Humanas',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Ciências Biológicas',
      createdAt: new Date(),
      updatedAt: new Date()
    } ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Areas', null, {});
  }
};
