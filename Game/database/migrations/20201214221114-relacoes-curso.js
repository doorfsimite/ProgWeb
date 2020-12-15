'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Cursos', {
      type: 'foreign key',
      fields: ['areaId'],
      name: 'curso_area_fk',
      references: {
        table: 'Areas',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'Cursos',
      'curso_area_fk'
    )
  }
};
