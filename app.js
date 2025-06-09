const express = require('express');
const { sequelize } = require('./src/models');
const app = express();

// Sincronizar banco de dados
sequelize.sync()
  .then(() => console.log('Banco de dados conectado'))
  .catch(err => console.error('Erro ao conectar ao banco:', err));

app.use(express.json());

const disciplinaRoutes = require('./src/routes/disciplinaRoutes');
app.use('/disciplinas', disciplinaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});