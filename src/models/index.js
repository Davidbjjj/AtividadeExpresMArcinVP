const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const Disciplina = require('./Disciplina')(sequelize, DataTypes);
const Professor = require('./Professor')(sequelize, DataTypes);
const Escola = require('./Escola')(sequelize, DataTypes);

// Relação 1: Escola 1 → N Professores
Escola.hasMany(Professor, { as: 'professores', foreignKey: 'escolaId' });
Professor.belongsTo(Escola, { foreignKey: 'escolaId' });

// Relação 2: Escola 1 → N Disciplinas
Escola.hasMany(Disciplina, { as: 'disciplinas', foreignKey: 'escolaId' });
Disciplina.belongsTo(Escola, { foreignKey: 'escolaId' });

// Relação 3: Professor 1 → N Disciplinas (já tinha)
Professor.hasMany(Disciplina, { as: 'disciplinas', foreignKey: 'professorId' });
Disciplina.belongsTo(Professor, { foreignKey: 'professorId' });

module.exports = {
  sequelize,
  Disciplina,
  Professor,
  Escola,
};
