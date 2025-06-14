const { Evento, Aluno } = require('../models');

async function criarEventoService(disciplinaId, dadosEvento) {
  const eventoCriado = await Evento.create({ ...dadosEvento, disciplinaId });
  return eventoCriado;
}

async function listarEventosPorDisciplinaService(disciplinaId) {
  const eventos = await Evento.findAll({ where: { disciplinaId } });
  return eventos;
}

async function listarEventoPorIdService(eventoId) {
  const evento = await Evento.findByPk(eventoId, {
    include: ['alunos', 'disciplina'],
  });
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

async function adicionarAlunoAoEventoService(eventoId, alunoId) {
  const evento = await Evento.findByPk(eventoId);
  if (!evento) throw new Error('Evento não encontrado');

  const aluno = await Aluno.findByPk(alunoId);
  if (!aluno) throw new Error('Aluno não encontrado');

  await evento.addAluno(aluno); 
  return await Evento.findByPk(eventoId, {
    include: ['alunos', 'disciplina'],
  });
}

module.exports = {
  criarEventoService,
  listarEventosPorDisciplinaService,
  listarEventoPorIdService,
  atualizarEventoService,
  deletarEventoService,
  adicionarAlunoAoEventoService,
};
