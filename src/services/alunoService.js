const bcrypt = require('bcrypt');
const { Aluno } = require('../models/Aluno'); // <-- Import do model Aluno

exports.criarAluno = async (alunoData) => {
  const { nome, email, senha } = alunoData;

  if (!senha) {
    throw new Error('Senha é obrigatória');
  }

  const saltRounds = 10;
  const senhaHash = await bcrypt.hash(senha, saltRounds);

  const novoAluno = await Aluno.create({
    nome,
    email,
    senha: senhaHash
  });

  return novoAluno;
};
