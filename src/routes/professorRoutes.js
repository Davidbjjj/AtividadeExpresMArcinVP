const express = require('express');
const router = express.Router();
const { Professor, Disciplina } = require('../models');

// Criar professor
router.post('/', async (req, res) => {
    try {
        const professor = await Professor.create(req.body);
        res.status(201).json(professor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar todos os professores com disciplinas
router.get('/', async (req, res) => {
    const professores = await Professor.findAll({ include: ['disciplinas'] });
    res.json(professores);
});

// Buscar professor por ID
router.get('/:id', async (req, res) => {
    const professor = await Professor.findByPk(req.params.id, { include: ['disciplinas'] });
    if (professor) res.json(professor);
    else res.status(404).json({ error: 'Professor não encontrado' });
});

// Atualizar professor
router.put('/:id', async (req, res) => {
    const professor = await Professor.findByPk(req.params.id);
    if (!professor) return res.status(404).json({ error: 'Professor não encontrado' });

    await professor.update(req.body);
    res.json(professor);
});

// Deletar professor
router.delete('/:id', async (req, res) => {
    const professor = await Professor.findByPk(req.params.id);
    if (!professor) return res.status(404).json({ error: 'Professor não encontrado' });

    await professor.destroy();
    res.json({ message: 'Professor removido com sucesso' });
});

module.exports = router;
