'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Partidas', {
      type: 'foreign key',
      fields: ['userId'],
      name: 'partida_user_fk',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'Partidas',
      'partida_user_fk'
    )
  }
};
