const express = require('express');
const router = express.Router();

const disciplinaRoutes = require('./disciplinaRoutes');
const eventoRoutes = require('./eventoRoutes'); 

router.use('/disciplinas', disciplinaRoutes);
router.use('/eventos', eventoRoutes); 

module.exports = router;
