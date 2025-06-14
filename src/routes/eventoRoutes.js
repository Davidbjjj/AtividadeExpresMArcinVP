const express = require('express');
const router = express.Router();
const {
  criarEvento,
  listarEventosPorDisciplina,
  listarEventoPorId,
  atualizarEvento,
  deletarEvento,
  adicionarAlunoAoEvento 
} = require('../controllers/eventoController');

router.post('/disciplina/:disciplinaId', criarEvento);
router.get('/disciplina/:disciplinaId', listarEventosPorDisciplina);
router.get('/:eventoId', listarEventoPorId);
router.put('/:eventoId', atualizarEvento);
router.delete('/:eventoId', deletarEvento);

router.post('/:eventoId/aluno/:alunoId', adicionarAlunoAoEvento);

module.exports = router;
