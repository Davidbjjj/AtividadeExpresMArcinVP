const sequelize = require('../config/database');
const Sequelize = require('sequelize');

const Aluno = require('./Aluno')(sequelize, Sequelize.DataTypes);
const Disciplina = require('./Disciplina')(sequelize, Sequelize.DataTypes);

// Associações
if (Aluno.associate) Aluno.associate({ Disciplina });
if (Disciplina.associate) Disciplina.associate({ Aluno });

module.exports = {
  sequelize,
  Sequelize,
  Aluno,
  Disciplina,
  Professor: null,
  Escola: null
};
