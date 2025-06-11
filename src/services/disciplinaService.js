const { Disciplina, Professor, Escola, Aluno } = require('../models');

exports.criarDisciplina = async (dto) => {
  // Verifica se professorId é um UUID válido
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(dto.professorId)) {
    throw new Error('ID do professor em formato inválido (deve ser UUID v4)');
  }

  const professor = await Professor.findOne({
    where: { id: dto.professorId }
  });
  
  if (!professor) {
    throw new Error(`Professor com ID ${dto.professorId} não encontrado`);
  }

  const escola = await Escola.findOne({ where: { nome: dto.escola } });
  if (!escola) throw new Error('Escola não encontrada');

  // Verifica se o professor pertence à escola
  if (professor.escolaId !== escola.id) {
    throw new Error('O professor não pertence à escola informada');
  }

  const disciplina = await Disciplina.create({
    nome: dto.nome,
    professorId: professor.id,
    escolaId: escola.id
  });

  return {
    id: disciplina.id,
    nome: disciplina.nome,
    professorNome: professor.nome,
    professorEmail: professor.email,
    escola: escola.nome
  };
};

exports.listarTodas = async () => {
  return await Disciplina.findAll({
    include: [
  { model: Professor, attributes: ['nome', 'email'] },
  { model: Escola, attributes: ['nome'] }
]

  });
};

exports.buscarPorId = async (id) => {
  console.log('Buscando disciplina com ID:', id); // Log para debug
  
  const disciplina = await Disciplina.findOne({
    where: { id: id },
    include: [
      { model: Professor, attributes: ['id', 'nome', 'email'] },
      { model: Escola, attributes: ['id', 'nome'] },
      { model: Aluno, attributes: ['id', 'nome', 'email'] }
    ]
  });
  
  if (!disciplina) {
    throw new Error(`Disciplina com ID ${id} não encontrada`);
  }
  
  return disciplina;
};

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
    include: { model: Aluno, attributes: ['id', 'nome', 'email'] }
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
  { model: Professor, attributes: ['nome', 'email'] },
  { model: Escola, attributes: ['nome'] }
]

  });
};

exports.associarProfessorPorId = async (disciplinaId, professorId) => {
  const disciplina = await Disciplina.findByPk(disciplinaId);
  if (!disciplina) throw new Error('Disciplina não encontrada');

  const professor = await Professor.findByPk(professorId);
  if (!professor) throw new Error('Professor não encontrado');

  await disciplina.setProfessor(professor); // ou disciplina.professorId = professorId

  return { mensagem: 'Professor associado com sucesso!' };
};
