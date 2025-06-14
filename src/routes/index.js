const express = require('express');
const router = express.Router();

// Importe as rotas corretamente
const disciplinaRoutes = require('./disciplinaRoutes');
const alunoRoutes = require('./alunoRoutes');
const professorRoutes = require('./professorRoutes');
const eventoRoutes = require('./eventoRoutes'); 

// Use as rotas
router.use('/disciplinas', disciplinaRoutes);
router.use('/alunos', alunoRoutes);
router.use('/professores', professorRoutes);
router.use('/eventos', eventoRoutes); 

module.exports = router;