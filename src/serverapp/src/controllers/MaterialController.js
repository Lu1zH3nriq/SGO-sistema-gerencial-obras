const { Material } = require('../models');

const MaterialController = {
  async createMaterial(req, res) {
    try {
      const material = await Material.create(req.body);
      res.status(201).json(material);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getMateriais(req, res) {
    try {
      const materiais = await Material.findAll();
      res.status(200).json(materiais);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getMaterialById(req, res) {
    try {
      const material = await Material.findByPk(req.query.id);
      if (material) {
        res.status(200).json(material);
      } else {
        res.status(404).json({ error: 'Material não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateMaterial(req, res) {
    try {
      const [updated] = await Material.update(req.body, {
        where: { id: req.query.id }
      });
      if (updated) {
        const updatedMaterial = await Material.findByPk(req.query.id);
        res.status(200).json(updatedMaterial);
      } else {
        res.status(404).json({ error: 'Material não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteMaterial(req, res) {
    try {
      const deleted = await Material.destroy({
        where: { id: req.query.id }
      });
      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'Material não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = MaterialController;