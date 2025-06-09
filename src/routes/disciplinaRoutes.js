const express = require('express');
const router = express.Router();
const disciplinaController = require('../controllers/disciplinaController');

// CRUD básico
router.post('/', disciplinaController.criarDisciplina);
router.get('/', disciplinaController.listarTodas);
router.get('/:id', disciplinaController.buscarPorId);
router.put('/:id', disciplinaController.atualizarDisciplina);
router.delete('/:id', disciplinaController.deletarDisciplina);

// // Matrícula de alunos
// router.post('/:disciplinaId/alunos/:alunoId', disciplinaController.matricularAluno);
// router.delete('/:disciplinaId/alunos/:alunoId', disciplinaController.desmatricularAluno);
// router.get('/:disciplinaId/alunos', disciplinaController.listarAlunos);

// // Notificações
// router.post('/:disciplinaId/notificar', disciplinaController.notificarAlunos);

// // Consultas específicas
// router.get('/escola/nome/:nome', disciplinaController.listarPorNomeEscola);
// router.post('/:nomeDisciplina/associar-professor/:emailProfessor', disciplinaController.associarProfessor);

module.exports = router;