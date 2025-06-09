const { Disciplina, Professor, Aluno, Escola } = require('../models');

// exports.criarDisciplina = async (dto) => {
//   const professor = await Professor.findOne({ where: { email: dto.professorEmail } });
//   if (!professor) throw new Error('Professor não encontrado');

//   const escola = await Escola.findOne({ where: { nome: dto.escola } });
//   if (!escola) throw new Error('Escola não encontrada');

//   if (professor.escolaId !== escola.id) {
//     throw new Error('O professor não pertence à escola informada');
//   }

//   const disciplina = await Disciplina.create({
//     nome: dto.nome,
//     professorId: professor.id,
//     escolaId: escola.id
//   });

//   return {
//     id: disciplina.id,
//     nome: disciplina.nome,
//     professorNome: professor.nome,
//     professorEmail: professor.email,
//     escola: escola.nome
//   };
// };

exports.criarDisciplina = async (dto) => {
  const disciplina = await Disciplina.create({
    nome: dto.nome,
    professorId: '00000000-0000-0000-0000-000000000000', // Temporário
    escolaId: '00000000-0000-0000-0000-000000000000'   // Temporário
  });

  return {
    id: disciplina.id,
    nome: disciplina.nome,
    professorNome: 'Professor Temporário', // Temporário
    professorEmail: 'prof@temp.com',      // Temporário
    escola: 'Escola Temporária'           // Temporário
  };
};

// exports.listarTodas = async () => {
//   return await Disciplina.findAll({
//     include: [
//       { models: Professor, attributes: ['nome', 'email'] },
//       { models: Escola, attributes: ['nome'] }
//     ]
//   });
// };
// Implemente apenas os métodos essenciais
exports.listarTodas = async () => {
  return await Disciplina.findAll();
};

exports.buscarPorId = async (id) => {
  const disciplina = await Disciplina.findByPk(id);
  if (!disciplina) throw new Error('Disciplina não encontrada');
  return disciplina;
};

// exports.buscarPorId = async (id) => {
//   const disciplina = await Disciplina.findByPk(id, {
//     include: [
//       { models: Professor, attributes: ['nome', 'email'] },
//       { models: Escola, attributes: ['nome'] },
//       { models: Aluno, attributes: ['id', 'nome', 'email'] }
//     ]
//   });
//   if (!disciplina) throw new Error('Disciplina não encontrada');
//   return disciplina;
// };

exports.atualizarDisciplina = async (id, dto) => {
  const disciplina = await Disciplina.findByPk(id);
  if (!disciplina) throw new Error('Disciplina não encontrada');

  disciplina.nome = dto.nome;
  await disciplina.save();
  return disciplina;
};

exports.deletarDisciplina = async (id) => {
  const disciplina = await Disciplina.findByPk(id);
  if (!disciplina) throw new Error('Disciplina não encontrada');
  await disciplina.destroy();
};

exports.matricularAluno = async (disciplinaId, alunoId) => {
  const disciplina = await Disciplina.findByPk(disciplinaId);
  if (!disciplina) throw new Error('Disciplina não encontrada');

  const aluno = await Aluno.findByPk(alunoId);
  if (!aluno) throw new Error('Aluno não encontrado');

  const jaMatriculado = await disciplina.hasAluno(aluno);
  if (jaMatriculado) throw new Error('Aluno já matriculado nesta disciplina');

  await disciplina.addAluno(aluno);
  return await this.buscarPorId(disciplinaId);
};

exports.desmatricularAluno = async (disciplinaId, alunoId) => {
  const disciplina = await Disciplina.findByPk(disciplinaId);
  if (!disciplina) throw new Error('Disciplina não encontrada');

  const aluno = await Aluno.findByPk(alunoId);
  if (!aluno) throw new Error('Aluno não encontrado');

  const matriculado = await disciplina.hasAluno(aluno);
  if (!matriculado) throw new Error('Aluno não está matriculado nesta disciplina');

  await disciplina.removeAluno(aluno);
};

exports.listarAlunos = async (disciplinaId) => {
  const disciplina = await Disciplina.findByPk(disciplinaId, {
    include: { models: Aluno, attributes: ['id', 'nome', 'email'] }
  });
  if (!disciplina) throw new Error('Disciplina não encontrada');
  return disciplina.alunos;
};

exports.notificarAlunos = async (disciplinaId, titulo, mensagem) => {
  const alunos = await this.listarAlunos(disciplinaId);
  if (alunos.length === 0) throw new Error('Nenhum aluno matriculado na disciplina');

  // Simulação de envio de notificação
  alunos.forEach(aluno => {
    console.log(`Notificação enviada para ${aluno.email}: ${titulo} - ${mensagem}`);
  });

  return `Notificações enviadas para ${alunos.length} alunos.`;
};

exports.listarPorNomeEscola = async (nomeEscola) => {
  const escola = await Escola.findOne({ where: { nome: nomeEscola } });
  if (!escola) throw new Error('Escola não encontrada');

  return await Disciplina.findAll({
    where: { escolaId: escola.id },
    include: [
      { models: Professor, attributes: ['nome', 'email'] },
      { models: Escola, attributes: ['nome'] }
    ]
  });
};

exports.associarProfessor = async (nomeDisciplina, emailProfessor) => {
  const disciplina = await Disciplina.findOne({ where: { nome: nomeDisciplina } });
  if (!disciplina) throw new Error('Disciplina não encontrada');

  const professor = await Professor.findOne({ where: { email: emailProfessor } });
  if (!professor) throw new Error('Professor não encontrado');

  if (disciplina.escolaId !== professor.escolaId) {
    throw new Error('Professor não pertence à mesma escola da disciplina');
  }

  disciplina.professorId = professor.id;
  await disciplina.save();

  return await this.buscarPorId(disciplina.id);
};