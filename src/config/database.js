const { Sequelize } = require('sequelize');

module.exports = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Arquivo temporário
  logging: console.log // Opcional para debug
});