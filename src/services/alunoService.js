const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

class AlunoService {
  constructor(AlunoModel) {
    this.Aluno = AlunoModel;
  }

  async criarAluno(alunoData) {
    
     const alunoExistente = await this.Aluno.findOne({
      where: { email: alunoData.email }
    });

    if (alunoExistente) {
      return { 
        success: false, 
        error: 'E-mail já cadastrado',
        details: ['O e-mail fornecido já está em uso por outro aluno'],
        status: 409 // Conflict
      };
    }

    
    try {
      if (alunoData.senha) {
        const saltRounds = 10;
        alunoData.senha = await bcrypt.hash(alunoData.senha, saltRounds);
      }

      const aluno = await this.Aluno.create(alunoData);
      const alunoSemSenha = aluno.toJSON();
      delete alunoSemSenha.senha;
      
      return { success: true, data: alunoSemSenha };
    } catch (error) {
      return { 
        success: false, 
        error: 'Falha ao criar aluno',
        details: error.errors ? error.errors.map(err => err.message) : error.message
      };
    }
  }

  async listarAlunos(filtros = {}) {
    try {
      const where = {};
      
      if (filtros.nome) {
        where.nome = {
          [Op.like]: `%${filtros.nome}%`
        };
      }

      const alunos = await this.Aluno.findAll({
        where,
        order: [['nome', 'ASC']],
        attributes: { exclude: ['senha'] }
      });
      
      return { success: true, data: alunos };
    } catch (error) {
      console.error('Erro no listarAlunos:', error);
      return { 
        success: false, 
        error: 'Falha ao listar alunos',
        details: error.message
      };
    }
  }

  async buscarAlunoPorId(id) {
    try {
      const aluno = await this.Aluno.findByPk(id, {
        paranoid: false // Para incluir registros deletados
      });
      
      if (!aluno) {
        return { 
          success: false, 
          error: 'Aluno não encontrado',
          status: 404
        };
      }
      
      return { success: true, data: aluno };
    } catch (error) {
      return { 
        success: false, 
        error: 'Falha ao buscar aluno',
        details: error.message
      };
    }
  }

  async atualizarAluno(id, novosDados) {
    try {
      const aluno = await this.Aluno.findByPk(id);
      
      if (!aluno) {
        return { 
          success: false, 
          error: 'Aluno não encontrado',
          status: 404
        };
      }

      if (novosDados.senha) {
        const saltRounds = 10;
        novosDados.senha = await bcrypt.hash(novosDados.senha, saltRounds);
      }

      await aluno.update(novosDados);
      
      const alunoAtualizado = aluno.toJSON();
      delete alunoAtualizado.senha;
      
      return { success: true, data: alunoAtualizado };
    } catch (error) {
      return { 
        success: false, 
        error: 'Falha ao atualizar aluno',
        details: error.errors ? error.errors.map(err => err.message) : error.message,
        status: 400
      };
    }
  }

  async deletarAluno(id) {
    try {
      const aluno = await this.Aluno.findByPk(id);
      
      if (!aluno) {
        return { 
          success: false, 
          error: 'Aluno não encontrado',
          status: 404
        };
      }

      await aluno.destroy();
      return { success: true, message: 'Aluno removido com sucesso' };
    } catch (error) {
      return { 
        success: false, 
        error: 'Falha ao remover aluno',
        details: error.message
      };
    }
  }

  async restaurarAluno(id) {
    try {
      const aluno = await this.Aluno.findOne({
        where: { id },
        paranoid: false
      });
      
      if (!aluno) {
        return { 
          success: false, 
          error: 'Aluno não encontrado',
          status: 404
        };
      }

      if (!aluno.deletedAt) {
        return { 
          success: false, 
          error: 'Aluno não está deletado',
          status: 400
        };
      }

      await aluno.restore();
      
      const alunoRestaurado = aluno.toJSON();
      delete alunoRestaurado.senha;
      
      return { success: true, data: alunoRestaurado };
    } catch (error) {
      return { 
        success: false, 
        error: 'Falha ao restaurar aluno',
        details: error.message
      };
    }
  }
}

module.exports = AlunoService;