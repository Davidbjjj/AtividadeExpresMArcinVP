const express = require('express');
const { sequelize, Professor, Disciplina } = require('./src/models');
const app = express();

app.use(express.json());

const disciplinaRoutes = require('./src/routes/disciplinaRoutes');
const professorRoutes = require('./src/routes/professorRoutes');

app.use('/disciplinas', disciplinaRoutes);
app.use('/professores', professorRoutes);

// Sincronizar banco de dados e adicionar dados iniciais
sequelize.sync({ force: true }).then(async () => {
  console.log('Banco de dados conectado');

  // Pré-cadastrar Professores
  const prof1 = await Professor.create({ nome: 'João Silva', area: 'Matemática' });
  const prof2 = await Professor.create({ nome: 'Maria Souza', area: 'História' });

  // Pré-cadastrar Disciplinas relacionadas
  await Disciplina.create({ nome: 'Cálculo I', cargaHoraria: 60, professorId: prof1.id });
  await Disciplina.create({ nome: 'História Geral', cargaHoraria: 40, professorId: prof2.id });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => console.error('Erro ao conectar ao banco:', err));
