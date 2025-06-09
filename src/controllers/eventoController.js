const {
  criarEventoService,
  listarEventosPorDisciplinaService,
  listarEventoPorIdService,
  atualizarEventoService,
  deletarEventoService,
} = require('../services/eventoService');

async function criarEvento(req, res) {
  try {
    const disciplinaId = req.params.disciplinaId;
    const dadosEvento = req.body;
    const novoEvento = await criarEventoService(disciplinaId, dadosEvento);
    res.status(201).json(novoEvento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function listarEventosPorDisciplina(req, res) {
  try {
    const disciplinaId = req.params.disciplinaId;
    const eventos = await listarEventosPorDisciplinaService(disciplinaId);
    res.json(eventos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function listarEventoPorId(req, res) {
  try {
    const eventoId = req.params.eventoId;
    const evento = await listarEventoPorIdService(eventoId);
    if (!evento) return res.status(404).json({ error: 'Evento não encontrado' });
    res.json(evento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarEvento(req, res) {
  try {
    const eventoId = req.params.eventoId;
    const dadosAtualizados = req.body;
    const eventoAtualizado = await atualizarEventoService(eventoId, dadosAtualizados);
    res.json(eventoAtualizado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function deletarEvento(req, res) {
  try {
    const eventoId = req.params.eventoId;
    await deletarEventoService(eventoId);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  criarEvento,
  listarEventosPorDisciplina,
  listarEventoPorId,
  atualizarEvento,
  deletarEvento,
};
