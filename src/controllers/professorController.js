const professorService = require('../services/professorService');

exports.criarProfessor = async (req, res, next) => {
    try {
        const professor = await professorService.criarProfessor(req.body);
        res.status(201).json(professor);
    } catch (error) {
        next(error);
    }
};

exports.listarTodos = async (req, res, next) => {
    try {
        const professores = await professorService.listarTodos();
        res.json(professores);
    } catch (error) {
        next(error);
    }
};

exports.buscarPorId = async (req, res, next) => {
    try {
        const professor = await professorService.buscarPorId(req.params.id);
        res.json(professor);
    } catch (error) {
        next(error);
    }
};

exports.atualizarProfessor = async (req, res, next) => {
    try {
        const professor = await professorService.atualizarProfessor(req.params.id, req.body);
        res.json(professor);
    } catch (error) {
        next(error);
    }
};

exports.deletarProfessor = async (req, res, next) => {
    try {
        await professorService.deletarProfessor(req.params.id);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};
