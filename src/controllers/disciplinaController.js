const disciplinaService = require('../services/disciplinaService');

exports.criarDisciplina = async (req, res, next) => {
  try {
    const disciplina = await disciplinaService.criarDisciplina(req.body);
    res.status(201).json(disciplina);
  } catch (error) {
    next(error);
  }
};

exports.listarTodas = async (req, res, next) => {
  try {
    const disciplinas = await disciplinaService.listarTodas();
    res.json(disciplinas);
  } catch (error) {
    next(error);
  }
};

exports.buscarPorId = async (req, res, next) => {
  try {
    const disciplina = await disciplinaService.buscarPorId(req.params.id);
    res.json(disciplina);
  } catch (error) {
    next(error);
  }
};

exports.atualizarDisciplina = async (req, res, next) => {
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

exports.deletarDisciplina = async (req, res, next) => {
  try {
    await disciplinaService.deletarDisciplina(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.matricularAluno = async (req, res, next) => {
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

exports.desmatricularAluno = async (req, res, next) => {
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

exports.listarAlunos = async (req, res, next) => {
  try {
    const alunos = await disciplinaService.listarAlunos(req.params.disciplinaId);
    res.json(alunos);
  } catch (error) {
    next(error);
  }
};

exports.notificarAlunos = async (req, res, next) => {
  try {
    const result = await disciplinaService.notificarAlunos(
      req.params.disciplinaId,
      req.query.titulo,
      req.query.mensagem
    );
    res.json({ message: result });
  } catch (error) {
    next(error);
  }
};

exports.listarPorNomeEscola = async (req, res, next) => {
  try {
    const disciplinas = await disciplinaService.listarPorNomeEscola(req.params.nome);
    res.json(disciplinas);
  } catch (error) {
    next(error);
  }
};

exports.associarProfessor = async (req, res, next) => {
  try {
    const disciplina = await disciplinaService.associarProfessor(
      req.params.nomeDisciplina,
      req.params.emailProfessor
    );
    res.json({
      message: `Professor '${disciplina.professor.nome}' associado à disciplina '${disciplina.nome}' com sucesso.`
    });
  } catch (error) {
    next(error);
  }
};