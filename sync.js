const { sequelize } = require('./models');

sequelize.sync({ force: true })
  .then(() => {
    console.log('Banco sincronizado com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar banco:', err);
  });
