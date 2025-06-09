const express = require('express');
const app = express();
const { sequelize } = require('./src/models');

const eventoRoutes = require('./src/routes/eventoRoutes');
const disciplinaRoutes = require('./src/routes/disciplinaRoutes');

app.use(express.json());

app.use('/eventos', eventoRoutes);
app.use('/disciplinas', disciplinaRoutes);

sequelize.sync()
  .then(() => console.log('Banco de dados conectado'))
  .catch(err => console.error('Erro ao conectar ao banco:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
