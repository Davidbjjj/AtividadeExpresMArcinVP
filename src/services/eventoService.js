const { Evento } = require('../models');

async function criarEventoService(disciplinaId, dadosEvento) {
  const eventoCriado = await Evento.create({ ...dadosEvento, disciplinaId });
  return eventoCriado;
}

async function listarEventosPorDisciplinaService(disciplinaId) {
  const eventos = await Evento.findAll({ where: { disciplinaId } });
  return eventos;
}

async function listarEventoPorIdService(eventoId) {
  const evento = await Evento.findByPk(eventoId);
  return evento;
}

async function atualizarEventoService(eventoId, dadosAtualizados) {
  const evento = await Evento.findByPk(eventoId);
  if (!evento) {
    throw new Error('Evento não encontrado');
  }
  await evento.update(dadosAtualizados);
  return evento;
}

async function deletarEventoService(eventoId) {
  const evento = await Evento.findByPk(eventoId);
  if (!evento) {
    throw new Error('Evento não encontrado');
  }
  await evento.destroy();
}

module.exports = {
  criarEventoService,
  listarEventosPorDisciplinaService,
  listarEventoPorIdService,
  atualizarEventoService,
  deletarEventoService,
};
