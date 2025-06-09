const escolaService = require('../services/escolaService');

exports.criarEscola = async (req, res) => {
    try {
        const escola = await escolaService.criarEscola(req.body);
        res.status(201).json(escola);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.listarEscolas = async (req, res) => {
    try {
        const escolas = await escolaService.listarEscolas();
        res.json(escolas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.buscarEscolaPorId = async (req, res) => {
    try {
        const escola = await escolaService.buscarEscolaPorId(req.params.id);
        if (!escola) {
            return res.status(404).json({ error: 'Escola não encontrada' });
        }
        res.json(escola);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.atualizarEscola = async (req, res) => {
    try {
        const escolaAtualizada = await escolaService.atualizarEscola(req.params.id, req.body);
        res.json(escolaAtualizada);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deletarEscola = async (req, res) => {
    try {
        await escolaService.deletarEscola(req.params.id);
        res.json({ message: 'Escola removida com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
