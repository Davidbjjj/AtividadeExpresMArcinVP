const express = require('express');
const router = express.Router();
const { Escola } = require('../models');

// Criar escola
router.post('/', async (req, res) => {
    try {
        const escola = await Escola.create(req.body);
        res.status(201).json(escola);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar todas as escolas
router.get('/', async (req, res) => {
    const escolas = await Escola.findAll();
    res.json(escolas);
});

// Buscar escola por ID
router.get('/:id', async (req, res) => {
    const escola = await Escola.findByPk(req.params.id);
    if (escola) res.json(escola);
    else res.status(404).json({ error: 'Escola não encontrada' });
});

// Atualizar escola
router.put('/:id', async (req, res) => {
    const escola = await Escola.findByPk(req.params.id);
    if (!escola) return res.status(404).json({ error: 'Escola não encontrada' });

    await escola.update(req.body);
    res.json(escola);
});

// Deletar escola
router.delete('/:id', async (req, res) => {
    const escola = await Escola.findByPk(req.params.id);
    if (!escola) return res.status(404).json({ error: 'Escola não encontrada' });

    await escola.destroy();
    res.json({ message: 'Escola removida com sucesso' });
});

module.exports = router;
