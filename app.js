const express = require('express');
const { sequelize, Professor, Disciplina, Escola } = require('./src/models');
const app = express();

app.use(express.json());

// Importar rotas
const disciplinaRoutes = require('./src/routes/disciplinaRoutes');
const professorRoutes = require('./src/routes/professorRoutes');
const escolaRoutes = require('./src/routes/escolaRoutes'); // 👈 nova rota

// Usar rotas
app.use('/disciplinas', disciplinaRoutes);
app.use('/professores', professorRoutes);
app.use('/escolas', escolaRoutes); // 👈 nova rota

// Sincronizar banco de dados e adicionar dados iniciais
sequelize.sync({ force: true }).then(async () => {
  console.log('Banco de dados conectado');

  // Criar escolas primeiro
  const escola1 = await Escola.create({ nome: 'Escola Técnica Central', endereco: 'Av. Principal, 123', cidade: 'Recife' });
  const escola2 = await Escola.create({ nome: 'Colégio Estadual Modelo', endereco: 'Rua das Flores, 456', cidade: 'Olinda' });

  // Criar professores vinculando ao id da escola
  const prof1 = await Professor.create({ nome: 'João Silva', area: 'Matemática', escolaId: escola1.id });
  const prof2 = await Professor.create({ nome: 'Maria Souza', area: 'História', escolaId: escola2.id });

  // Criar disciplinas vinculando professor e escola
  await Disciplina.create({ nome: 'Cálculo I', cargaHoraria: 60, professorId: prof1.id, escolaId: escola1.id });
  await Disciplina.create({ nome: 'História Geral', cargaHoraria: 40, professorId: prof2.id, escolaId: escola2.id });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => console.error('Erro ao conectar ao banco:', err));
