require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const { sequelize, Aluno, Professor, Disciplina, Escola } = require('./models');

// Testa conexão com o banco
sequelize.authenticate()
  .then(() => console.log('✅ Banco conectado com sucesso'))
  .catch((err) => console.error('❌ Erro ao conectar ao banco:', err));

// Rotas
const alunoRoutes = require('./routes/alunoRoutes');
const professorRoutes = require('./routes/professorRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const escolaRoutes = require('./routes/escolaRoutes');

app.use('/alunos', alunoRoutes);
app.use('/professores', professorRoutes);
app.use('/disciplinas', disciplinaRoutes);
app.use('/escolas', escolaRoutes);

// Sincroniza o banco e popula dados iniciais
sequelize.sync({ force: true }).then(async () => {
  console.log('✅ Banco de dados sincronizado');

  // Criar Escolas
  const escola1 = await Escola.create({
    nome: 'Escola Técnica Central',
    endereco: 'Av. Principal, 123',
    cidade: 'Recife'
  });

  const escola2 = await Escola.create({
    nome: 'Colégio Estadual Modelo',
    endereco: 'Rua das Flores, 456',
    cidade: 'Olinda'
  });

 const prof1 = await Professor.create({
  nome: 'João Silva',
  email: 'joao@escola.com',
  senha: 'senha123',
  area: 'Matemática',
  escolaId: escola1.id
});

const prof2 = await Professor.create({
  nome: 'Maria Souza',
  email: 'maria@escola.com',
  senha: 'senha456',
  area: 'História',
  escolaId: escola2.id
});


  // Criar Disciplinas associadas a professores e escolas
  await Disciplina.create({
    nome: 'Cálculo I',
    cargaHoraria: 60,
    professorId: prof1.id,
    escolaId: escola1.id
  });

  await Disciplina.create({
    nome: 'História Geral',
    cargaHoraria: 40,
    professorId: prof2.id,
    escolaId: escola2.id
  });

  // Inicializa o servidor
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });

}).catch(err => {
  console.error('❌ Erro ao sincronizar o banco:', err);
});
