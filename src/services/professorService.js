const { Professor } = require('../models');

exports.criarProfessor = async (dto) => {
    return await Professor.create({
        nome: dto.nome,
        email: dto.email,
        escolaId: dto.escolaId, // Assumindo que isso vem no JSON
    });
};

exports.listarTodos = async () => {
    return await Professor.findAll();
};

exports.buscarPorId = async (id) => {
    const professor = await Professor.findByPk(id);
    if (!professor) throw new Error('Professor não encontrado');
    return professor;
};

exports.atualizarProfessor = async (id, dto) => {
    const professor = await Professor.findByPk(id);
    if (!professor) throw new Error('Professor não encontrado');

    professor.nome = dto.nome || professor.nome;
    professor.email = dto.email || professor.email;
    professor.escolaId = dto.escolaId || professor.escolaId;

    await professor.save();
    return professor;
};

exports.deletarProfessor = async (id) => {
    const professor = await Professor.findByPk(id);
    if (!professor) throw new Error('Professor não encontrado');
    await professor.destroy();
};
