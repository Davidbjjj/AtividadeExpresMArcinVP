const express = require('express');
const router = express.Router();

// Importe as rotas corretamente
const disciplinaRoutes = require('./disciplinaRoutes');
const alunoRoutes = require('./alunoRoutes');
const professorRoutes = require('./professorRoutes');

// Use as rotas
router.use('/disciplinas', disciplinaRoutes);
router.use('/alunos', alunoRoutes);
router.use('/professores', professorRoutes);

module.exports = router;