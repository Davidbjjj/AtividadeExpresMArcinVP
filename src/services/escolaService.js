const { Escola } = require('../models');

exports.criarEscola = async (dados) => {
    return await Escola.create(dados);
};

exports.listarEscolas = async () => {
    return await Escola.findAll();
};

exports.buscarEscolaPorId = async (id) => {
    return await Escola.findByPk(id);
};

exports.atualizarEscola = async (id, novosDados) => {
    const escola = await Escola.findByPk(id);
    if (!escola) {
        throw new Error('Escola não encontrada');
    }
    return await escola.update(novosDados);
};

exports.deletarEscola = async (id) => {
    const escola = await Escola.findByPk(id);
    if (!escola) {
        throw new Error('Escola não encontrada');
    }
    await escola.destroy();
};
