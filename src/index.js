require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const { sequelize, Aluno, Professor, Disciplina, Escola } = require('./models');
const bcrypt = require('bcrypt');

// Testa conexão com o banco
sequelize.authenticate()
  .then(() => console.log('✅ Banco conectado com sucesso'))
  .catch((err) => console.error('❌ Erro ao conectar ao banco:', err));

// Rotas
const alunoRoutes = require('./routes/alunoRoutes');
const professorRoutes = require('./routes/professorRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const escolaRoutes = require('./routes/escolaRoutes');

app.use('/aluno', alunoRoutes);
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

  // Criar Professores
  const prof1 = await Professor.create({
    nome: 'João Silva',
    email: 'joao@escola.com',
    senha: await bcrypt.hash('senha123', 10),
    area: 'Matemática',
    escolaId: escola1.id
  });

  const prof2 = await Professor.create({
    nome: 'Maria Souza',
    email: 'maria@escola.com',
    senha: await bcrypt.hash('senha456', 10),
    area: 'História',
    escolaId: escola2.id
  });

  // Criar Disciplinas associadas a professores e escolas
  const disc1 = await Disciplina.create({
    nome: 'Cálculo I',
    cargaHoraria: 60,
    professorId: prof1.id,
    escolaId: escola1.id
  });

  const disc2 = await Disciplina.create({
    nome: 'História Geral',
    cargaHoraria: 40,
    professorId: prof2.id,
    escolaId: escola2.id
  });

  // Criar Alunos com os campos solicitados (nome, email, senha)
  const aluno1 = await Aluno.create({
    nome: 'Carlos Oliveira',
    email: 'carlos@escola.com',
    senha: await bcrypt.hash('senha789', 10),
    escolaId: escola1.id
  });

  const aluno2 = await Aluno.create({
    nome: 'Ana Santos',
    email: 'ana@escola.com',
    senha: await bcrypt.hash('senha012', 10),
    escolaId: escola2.id
  });

  // Associar alunos a disciplinas (se houver relação no seu modelo)
  // Exemplo (descomente se necessário):
  // await aluno1.addDisciplina(disc1);
  // await aluno2.addDisciplina(disc2);

  // Inicializa o servidor
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log('📝 Dados iniciais criados:');
    console.log(`🏫 Escolas: 2 | 👨‍🏫 Professores: 2 | 📚 Disciplinas: 2 | 👨‍🎓 Alunos: 2`);
    
    // Mostra os dados dos alunos criados
    console.log('\nAlunos criados:');
    console.log(`1. Nome: ${aluno1.nome} | Email: ${aluno1.email} | Escola: ${escola1.nome}`);
    console.log(`2. Nome: ${aluno2.nome} | Email: ${aluno2.email} | Escola: ${escola2.nome}`);
  });

}).catch(err => {
  console.error('❌ Erro ao sincronizar o banco:', err);
});