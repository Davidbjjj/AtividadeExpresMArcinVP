const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Disciplina = require('./Disciplina')(sequelize, Sequelize.DataTypes);
const Evento = require('./Evento')(sequelize, Sequelize.DataTypes);

const models = {
  Disciplina,
  Evento,
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

module.exports = {
  sequelize,
  ...models,
};
