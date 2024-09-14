const { Funcionario } = require('../models');

const FuncionarioController = {
  async createFuncionario(req, res) {
    try {
      const funcionario = await Funcionario.create(req.body);
      res.status(201).json(funcionario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getFuncionarios(req, res) {
    try {
      const funcionarios = await Funcionario.findAll();
      res.status(200).json(funcionarios);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getFuncionarioById(req, res) {
    try {
      const funcionario = await Funcionario.findByPk(req.query.id);
      if (funcionario) {
        res.status(200).json(funcionario);
      } else {
        res.status(404).json({ error: 'Funcionario não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateFuncionario(req, res) {
    try {
      const [updated] = await Funcionario.update(req.body, {
        where: { id: req.query.id }
      });
      if (updated) {
        const updatedFuncionario = await Funcionario.findByPk(req.query.id);
        res.status(200).json(updatedFuncionario);
      } else {
        res.status(404).json({ error: 'Funcionario não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteFuncionario(req, res) {
    try {
      const deleted = await Funcionario.destroy({
        where: { id: req.query.id }
      });
      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'Funcionario não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }, 

  async buscaFuncionarioQuery(req, res) {
    try {
      const { nome, email, cpf } = req.query;
      const where = {};

      if (nome) {
        where.nome = nome;
      }
      if (email) {
        where.email = email;
      }
      if (cpf) {
        where.cpf = cpf;
      }

      const funcionario = await Funcionario.findAll({ where });

      if (funcionario.length > 0) {
        res.status(200).json(funcionario);
      } else {
        res.status(404).json({ error: "Nenhum funcionario encontrado" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = FuncionarioController;