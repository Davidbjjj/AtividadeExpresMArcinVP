const alunoService = require('../services/alunoService');

exports.criarAluno = async (req, res, next) => {
  try {
    const aluno = await alunoService.criarAluno(req.body);
    res.status(201).json(aluno);
  } catch (error) {
    next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    const alunos = await alunoService.listarAlunos();
    res.json(alunos);
  } catch (error) {
    next(error);
  }
};

exports.buscar = async (req, res, next) => {
  try {
    const aluno = await alunoService.buscarPorId(req.params.id);
    res.json(aluno);
  } catch (error) {
    next(error);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const aluno = await alunoService.atualizarAluno(req.params.id, req.body);
    res.json(aluno);
  } catch (error) {
    next(error);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    await alunoService.deletarAluno(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};