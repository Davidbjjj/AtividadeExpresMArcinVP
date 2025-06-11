const disciplinaService = require('../services/disciplinaService');

const criarDisciplina = async (req, res, next) => {
  try {
    const novaDisciplina = await disciplinaService.criarDisciplina(req.body);
    res.status(201).json(novaDisciplina);
  } catch (error) {
    next(error);
  }
};

const listarTodas = async (req, res, next) => {
  try {
    const disciplinas = await disciplinaService.listarTodas();
    res.json(disciplinas);
  } catch (error) {
    next(error);
  }
};

const buscarPorId = async (req, res, next) => {
  try {
    const disciplina = await disciplinaService.buscarPorId(req.params.id);
    res.json(disciplina);
  } catch (error) {
    next(error);
  }
};

const atualizarDisciplina = async (req, res, next) => {
  try {
    const disciplina = await disciplinaService.atualizarDisciplina(
      req.params.id,
      req.body
    );
    res.json(disciplina);
  } catch (error) {
    next(error);
  }
};

const deletarDisciplina = async (req, res, next) => {
  try {
    await disciplinaService.deletarDisciplina(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const matricularAluno = async (req, res, next) => {
  try {
    const disciplina = await disciplinaService.matricularAluno(
      req.params.disciplinaId,
      req.params.alunoId
    );
    res.json(disciplina);
  } catch (error) {
    next(error);
  }
};

const desmatricularAluno = async (req, res, next) => {
  try {
    await disciplinaService.desmatricularAluno(
      req.params.disciplinaId,
      req.params.alunoId
    );
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const listarAlunos = async (req, res, next) => {
  try {
    const alunos = await disciplinaService.listarAlunos(req.params.disciplinaId);
    res.json(alunos);
  } catch (error) {
    next(error);
  }
};

const notificarAlunos = async (req, res, next) => {
  try {
    const result = await disciplinaService.notificarAlunos(
      req.params.disciplinaId,
      req.body.titulo,  // Changed from query to body
      req.body.mensagem // Changed from query to body
    );
    res.json({ message: result });
  } catch (error) {
    next(error);
  }
};

const listarPorNomeEscola = async (req, res, next) => {
  try {
    const disciplinas = await disciplinaService.listarPorNomeEscola(req.params.nome);
    res.json(disciplinas);
  } catch (error) {
    next(error);
  }
};

const associarProfessor = async (req, res, next) => {
  try {
    const result = await disciplinaService.associarProfessorPorNome(
      req.params.nomeDisciplina,
      req.params.emailProfessor
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  criarDisciplina,
  listarTodas,
  buscarPorId,
  atualizarDisciplina,
  deletarDisciplina,
  matricularAluno,
  desmatricularAluno,
  listarAlunos,
  notificarAlunos,
  listarPorNomeEscola,
  associarProfessor
};