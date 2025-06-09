const sequelize = require('../config/database');
const Disciplina = require('./Disciplina')(sequelize, require('sequelize').DataTypes);

module.exports = {
  sequelize,
  Disciplina,
  // Outros modelos serão adicionados depois
  Professor: null,
  Aluno: null,
  Escola: null
};