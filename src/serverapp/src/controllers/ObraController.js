const { Obra } = require('../models');

const ObraController = {
  async createObra(req, res) {
    try {
      const obra = await Obra.create(req.body);
      res.status(201).json(obra);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getObras(req, res) {
    try {
      const obras = await Obra.findAll();
      res.status(200).json(obras);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getObraById(req, res) {
    try {
      const obra = await Obra.findByPk(req.query.id);
      if (obra) {
        res.status(200).json(obra);
      } else {
        res.status(404).json({ error: 'Obra não encontrada' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateObra(req, res) {
    try {
      const [updated] = await Obra.update(req.body, {
        where: { id: req.query.id }
      });
      if (updated) {
        const updatedObra = await Obra.findByPk(req.query.id);
        res.status(200).json(updatedObra);
      } else {
        res.status(404).json({ error: 'Obra não encontrada' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteObra(req, res) {
    try {
      const deleted = await Obra.destroy({
        where: { id: req.query.id }
      });
      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: 'Obra não encontrada' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getObrasByQuery(req, res) {
    try {
        const { nome, contrato, alvara } = req.query;
        const where = {};

        if (nome) {
            where.nome = nome;
        }
        if (contrato) {
            where.numeroContrato = contrato;
        }
        if (alvara) {
            where.alvara = alvara;
        }

        const obras = await Obra.findAll({ where });

        if (obras.length > 0) {
            res.status(200).json(obras);
        } else {
            res.status(404).json({ error: 'Nenhuma obra encontrada' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
};

module.exports = ObraController;