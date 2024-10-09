const { Material, Obra, ObraMateriais } = require('../models');

const ObraMateriaisController = {
  async addMaterial(req, res) {
    try {
      const { obraId, materialId, quantidade, valor, dataAlocacao, nomeMaterial, nomeObra } = req.body;

      const obra = await Obra.findByPk(obraId);
      const material = await Material.findByPk(materialId);

      if (!obra || !material) {
        return res.status(404).json({ error: 'Obra ou material não encontrado' });
      }

      await ObraMateriais.create({
        obraId,
        materialId,
        quantidade,
        valor,
        dataAlocacao,
        nomeMaterial,
        nomeObra
      });

      res.status(200).json({ message: 'Material adicionado à obra com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getMateriaisPorObra(req, res) {
    try {
      const { obraId } = req.query;

      const obra = await Obra.findByPk(obraId, {
        include: {
          model: Material,
          as: 'materiais',
          through: {
            attributes: ['quantidade', 'valor', 'dataAlocacao', 'nomeMaterial', 'nomeObra']
          }
        }
      });

      if (!obra) {
        return res.status(404).json({ error: 'Obra não encontrada' });
      }

      res.status(200).json(obra.materiais);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateMaterialObra(req, res) {
    try {
      const { obraId, materialId, quantidade, valor, dataAlocacao, nomeMaterial, nomeObra } = req.body;

      const obra = await Obra.findByPk(obraId);
      const material = await Material.findByPk(materialId);

      if (!obra || !material) {
        return res.status(404).json({ error: 'Obra ou material não encontrado' });
      }

      await ObraMateriais.update({
        quantidade,
        valor,
        dataAlocacao,
        nomeMaterial,
        nomeObra
      }, { where: { obraId, materialId } });

      res.status(200).json({ message: 'Material atualizado na obra com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async removeMaterial(req, res) {
    try {
      const { obraId, materialId } = req.body;

      const obra = await Obra.findByPk(obraId);
      const material = await Material.findByPk(materialId);

      if (!obra || !material) {
        return res.status(404).json({ error: 'Obra ou material não encontrado' });
      }

      await ObraMateriais.destroy({ where: { obraId, materialId } });
      res.status(200).json({ message: 'Material removido da obra com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = ObraMateriaisController;
