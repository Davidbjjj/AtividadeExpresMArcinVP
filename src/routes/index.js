const express = require('express');
const router = express.Router();

// Importe as rotas corretamente
const disciplinaRoutes = require('./disciplinaRoutes');

// Use as rotas
router.use('/disciplinas', disciplinaRoutes);

module.exports = router;