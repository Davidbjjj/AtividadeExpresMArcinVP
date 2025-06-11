const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'teste_esprex', // DB_NAME
  'teste_esprex_user', // DB_USER
  'kkepcKuDW1VT50wiBJwJ0vcTWZl2lbVC', // DB_PASSWORD
  {
    host: 'dpg-d13kkgnfte5s738rupf0-a.oregon-postgres.render.com',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Teste de conexão imediata
sequelize.authenticate()
  .then(() => console.log('✅ Conexão com o banco de dados estabelecida com sucesso'))
  .catch(err => {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  });

module.exports = sequelize;