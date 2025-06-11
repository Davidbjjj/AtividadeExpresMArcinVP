const AlunoService = require('../services/AlunoService');
const { Aluno } = require('../models');

// Instância do service (minúsculo para consistência)
const service = new AlunoService(Aluno);

module.exports = {
  // Listar todos os alunos (com filtros)
  async listarTodos(req, res) {
    try {
      const { success, data, error, details } = await service.listarAlunos(req.query);
      
      if (!success) {
        return res.status(400).json({ error, details });
      }

      return res.json(data);
    } catch (error) {
      return res.status(500).json({ 
        error: 'Erro interno no servidor',
        details: error.message 
      });
    }
  },

  // Criar novo aluno
  async criar(req, res) {
    try {
      const { success, data, error, details } = await service.criarAluno(req.body);
      
      if (!success) {
        return res.status(400).json({ error, details });
      }

      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json({ 
        error: 'Erro interno no servidor',
        details: error.message 
      });
    }
  },

  // Buscar aluno por ID
  async buscarAluno(req, res) {
    try {
      const { success, data, error, details, status } = await service.buscarAlunoPorId(req.params.id);
      
      if (!success) {
        return res.status(status || 404).json({ error, details });
      }

      return res.json(data);
    } catch (error) {
      return res.status(500).json({ 
        error: 'Erro interno no servidor',
        details: error.message 
      });
    }
  },

  // Atualizar aluno
  async atualizarAluno(req, res) {
    try {
      const { id } = req.params;
      const { success, data, error, details, status } = await service.atualizarAluno(id, req.body);
      
      if (!success) {
        return res.status(status || 400).json({ error, details });
      }

      return res.json(data);
    } catch (error) {
      return res.status(500).json({ 
        error: 'Erro interno no servidor',
        details: error.message 
      });
    }
  },

  // Deletar aluno (soft delete)
  async deletarAluno(req, res) {
    try {
      const { id } = req.params;
      const { success, message, error, details, status } = await service.deletarAluno(id);
      
      if (!success) {
        return res.status(status || 500).json({ error, details });
      }

      return res.json({ message });
    } catch (error) {
      return res.status(500).json({ 
        error: 'Erro interno no servidor',
        details: error.message 
      });
    }
  },

  // Restaurar aluno (undo soft delete)
  async restaurarAluno(req, res) {
    try {
      const { id } = req.params;
      const { success, data, error, details, status } = await service.restaurarAluno(id);
      
      if (!success) {
        return res.status(status || 500).json({ error, details });
      }

      return res.json(data);
    } catch (error) {
      return res.status(500).json({ 
        error: 'Erro interno no servidor',
        details: error.message 
      });
    }
  }
};