const express = require('express');
const router = express.Router();
const AlunoController = require('../controllers/alunoController');

router.get('/', AlunoController.listarTodos);
router.post('/', AlunoController.criar);
router.get('/:id', AlunoController.buscarAluno);
router.put('/:id', AlunoController.atualizarAluno);
router.delete('/:id', AlunoController.deletarAluno);

// Rota para restaurar aluno (soft delete)
router.post('/:id/restaurar', AlunoController.restaurarAluno);

module.exports = router;