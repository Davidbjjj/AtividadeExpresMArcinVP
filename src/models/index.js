const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Inicializa o objeto que conterá os modelos
const db = {};

// Criação dos modelos
db.Aluno = require('./Aluno')(sequelize, DataTypes);
db.Disciplina = require('./Disciplina')(sequelize, DataTypes);
db.Professor = require('./Professor')(sequelize, DataTypes);
db.Escola = require('./Escola')(sequelize, DataTypes);

// Associações se existirem nos próprios modelos
if (db.Aluno.associate) db.Aluno.associate(db);
if (db.Disciplina.associate) db.Disciplina.associate(db);

// Relações diretas
db.Escola.hasMany(db.Professor, { as: 'professores', foreignKey: 'escolaId' });
db.Professor.belongsTo(db.Escola, { foreignKey: 'escolaId' });

db.Escola.hasMany(db.Disciplina, { as: 'disciplinas', foreignKey: 'escolaId' });
db.Disciplina.belongsTo(db.Escola, { foreignKey: 'escolaId' });

db.Professor.hasMany(db.Disciplina, { as: 'disciplinas', foreignKey: 'professorId' });
db.Disciplina.belongsTo(db.Professor, { foreignKey: 'professorId' });

// Exporta tudo
db.sequelize = sequelize;
db.Sequelize = { DataTypes };

module.exports = db;
