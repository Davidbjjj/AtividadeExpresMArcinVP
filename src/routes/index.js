const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Página inicial');
});

router.get('/sobre', (req, res) => {
  res.send('Página sobre');
});

module.exports = router;