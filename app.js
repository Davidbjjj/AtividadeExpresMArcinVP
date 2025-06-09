require('dotenv').config();
const express = require('express');
const { sequelize } = require('./src/models');
const app = express();

app.use(express.json());

// Testa conexão
sequelize.authenticate()
  .then(() => console.log('✅ Banco conectado com sucesso'))
  .catch((err) => console.error('❌ Erro ao conectar:', err));

// Rotas
const alunoRoutes = require('./src/routes/alunoRoutes');
const disciplinaRoutes = require('./src/routes/disciplinaRoutes');

app.use('/alunos', alunoRoutes);
app.use('/disciplinas', disciplinaRoutes);

// Inicializa servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
