const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Importar modelos
const Disciplina = require('./Disciplina')(sequelize, DataTypes);
const Professor = require('./Professor')(sequelize, DataTypes);

// RELACIONAMENTO: 1 Professor → N Disciplinas
Professor.hasMany(Disciplina, { as: 'disciplinas', foreignKey: 'professorId' });
Disciplina.belongsTo(Professor, { foreignKey: 'professorId' });

module.exports = {
  sequelize,
  Disciplina,
  Professor,
  // Placeholder para futuros modelos
  Aluno: null,
  Escola: null
};
