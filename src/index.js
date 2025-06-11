require('dotenv').config();
const express = require('express');
const { sequelize, Aluno, Professor, Disciplina, Escola } = require('./models');
const app = express();

app.use(express.json());

// Testa conexão
sequelize.authenticate()
  .then(() => console.log('✅ Banco conectado com sucesso'))
  .catch((err) => console.error('❌ Erro ao conectar:', err));

// Rotas
const alunoRoutes = require('./routes/alunoRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const professorRoutes = require('./routes/professorRoutes');
const escolaRoutes = require('./routes/escolaRoutes');

app.use('/alunos', alunoRoutes);
app.use('/disciplinas', disciplinaRoutes);
app.use('/professores', professorRoutes);
app.use('/escolas', escolaRoutes);

// Sincronizar banco de dados e adicionar dados iniciais
sequelize.sync({ force: true }).then(async () => {
  console.log('Banco de dados conectado e sincronizado');

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
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
}).catch(err => console.error('Erro ao conectar ao banco:', err));