'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Users', {
      type: 'foreign key',
      fields: ['cursoId'],
      name: 'user_curso_fk',
      references: {
        table: 'Cursos',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'Users',
      'user_curso_fk'
    )
  }
};
