'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AlunoDisciplinas', {
      alunoId: {
        type: Sequelize.UUID,
        references: {
          model: 'Alunos',
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true
      },
      disciplinaId: {
        type: Sequelize.UUID,
        references: {
          model: 'Disciplinas',
          key: 'id'
        },
        onDelete: 'CASCADE',
        primaryKey: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AlunoDisciplinas');
  }
};
