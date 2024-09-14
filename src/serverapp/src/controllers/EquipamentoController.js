const { Equipamento } = require('../models');

const EquipamentoController = {
  async createEquipamento(req, res) {
    try {
      const equipamento = await Equipamento.create(req.body);
      res.status(201).json(equipamento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getEquipamentos(req, res) {
    try {
      const equipamentos = await Equipamento.findAll();
      res.status(200).json(equipamentos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getEquipamentoById(req, res) {
    try {
      const equipamento = await Equipamento.findByPk(req.query.id);
      if (equipamento) {
        res.status(200).json(equipamento);
      } else {
        res.status(404).json({ error: 'Equipamento não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateEquipamento(req, res) {
    try {
      const [updated] = await Equipamento.update(req.body, {
        where: { id: req.query.id }
      });
      if (updated) {
        const updatedEquipamento = await Equipamento.findByPk(req.query.id);
        res.status(200).json(updatedEquipamento);
      } else {
        res.status(404).json({ error: 'Equipamento não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteEquipamento(req, res) {
    try {
      const deleted = await Equipamento.destroy({
        where: { id: req.query.id }
      });
      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'Equipamento não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = EquipamentoController;