const { Material, Obra, ObraMateriais } = require('../models');
const sequelize = require('sequelize');

const ObraMateriaisController = {
  async addMaterial(req, res) {
    try {
      const { ObraId, MaterialId, quantidade, valor, dataAlocacao, nomeMaterial, nomeObra } = req.body;

      const obra = await Obra.findByPk(ObraId);
      const material = await Material.findByPk(MaterialId);

      if (!obra || !material) {
        return res.status(404).json({ error: 'Obra ou material não encontrado' });
      }

      const valorDecimal = parseFloat(valor); 

      const existingEntry = await ObraMateriais.findOne({ where: { ObraId, MaterialId } });

      if (existingEntry) {
        await existingEntry.update({
          quantidade,
          valor: valorDecimal,
          dataAlocacao,
          nomeMaterial,
          nomeObra
        });
      } else {
        await ObraMateriais.create({
          ObraId,
          MaterialId,
          quantidade,
          valor: valorDecimal,
          dataAlocacao,
          nomeMaterial,
          nomeObra
        });
      }

      res.status(200).json({ message: 'Material adicionado à obra' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getMateriaisPorObra(req, res) {
    try {
      const { ObraId } = req.query;

      const obra = await Obra.findByPk(ObraId, {
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
      const { ObraId, MaterialId, quantidade, valor, dataAlocacao, nomeMaterial, nomeObra } = req.body;

      const obra = await Obra.findByPk(ObraId);
      const material = await Material.findByPk(MaterialId);

      if (!obra || !material) {
        return res.status(404).json({ error: 'Obra ou material não encontrado' });
      }

      await ObraMateriais.update({
        quantidade,
        valor,
        dataAlocacao,
        nomeMaterial,
        nomeObra
      }, { where: { ObraId, MaterialId } });

      res.status(200).json({ message: 'Material atualizado na obra com sucesso' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async removeMaterial(req, res) {
    try {
      const { obraId, materialId } = req.query;

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
  },

  async getObrasComMaisMateriais(req, res) {
    try {
      const obras = await Obra.findAll({
        order: [['createdAt', 'DESC']],
        limit: 5,
      });

      const obraComMateriais = await Promise.all(
        obras.map(async (obra) => {
          const qtdMateriais = await ObraMateriais.count({ where: { ObraId: obra.id } });
          const totalMateriais = await ObraMateriais.sum('valor', { where: { ObraId: obra.id } });
          return {
            obra: obra.nome,
            materiais: {
              quantidade: qtdMateriais,
              totalMateriais: parseFloat(totalMateriais).toFixed(2) || 0,
            },
          };
        })
      );

      res.status(200).json(obraComMateriais);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

};

module.exports = ObraMateriaisController;