const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Modelos
const Aluno = require('./Aluno')(sequelize, DataTypes);
const Disciplina = require('./Disciplina')(sequelize, DataTypes);
const Professor = require('./Professor')(sequelize, DataTypes);
const Escola = require('./Escola')(sequelize, DataTypes);

// Objeto contendo todos os modelos
const models = { Aluno, Disciplina, Professor, Escola };

// Associações
if (Aluno.associate) Aluno.associate(models);
if (Disciplina.associate) Disciplina.associate(models);

// Relação 1: Escola 1 → N Professores
Escola.hasMany(Professor, { as: 'professores', foreignKey: 'escolaId' });
Professor.belongsTo(Escola, { foreignKey: 'escolaId' });

// Relação 2: Escola 1 → N Disciplinas
Escola.hasMany(Disciplina, { as: 'disciplinas', foreignKey: 'escolaId' });
Disciplina.belongsTo(Escola, { foreignKey: 'escolaId' });

// Relação 3: Professor 1 → N Disciplinas
Professor.hasMany(Disciplina, { as: 'disciplinas', foreignKey: 'professorId' });
Disciplina.belongsTo(Professor, { foreignKey: 'professorId' });

module.exports = {
  sequelize,
  Sequelize: { DataTypes },
  Aluno,
  Disciplina,
  Professor,
  Escola
};
