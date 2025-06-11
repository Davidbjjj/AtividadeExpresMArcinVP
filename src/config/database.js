const { Sequelize } = require('sequelize');

// Configuração explícita do dialeto PostgreSQL
const sequelize = new Sequelize({
  database: 'teste_esprex',
  username: 'teste_esprex_user',
  password: 'kkepcKuDW1VT50wiBJwJ0vcTWZl2lbVC',
  host: 'dpg-d13kkgnfte5s738rupf0-a.oregon-postgres.render.com',
  port: 5432,
  dialect: 'postgres', // Especifica explicitamente o dialeto
  dialectModule: require('pg'), // Força o uso do módulo pg
  
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
});

// Teste de conexão
sequelize.authenticate()
  .then(() => console.log('✅ Conexão com PostgreSQL estabelecida com sucesso'))
  .catch(err => {
    console.error('❌ Falha ao conectar ao PostgreSQL:', err);
    process.exit(1);
  });

module.exports = sequelize;