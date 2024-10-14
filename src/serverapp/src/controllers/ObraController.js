const { Obra, Cliente } = require("../models");
const { Funcionario } = require("../models");
const Usuario = require("../models/User");
const { BlobServiceClient } = require("@azure/storage-blob");
const { Op, Sequelize } = require("sequelize");

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

const ObraController = {
  async createObra(req, res) {
    try {
      const data = {
        nome: req.body.nome,
        identificador: req.body.identificador,
        endereco: req.body.endereco,
        dataInicio: req.body.dataInicio,
        dataFinal: req.body.dataFinal,
        contrato: req.body.contrato,
        alvara: req.body.alvara,
        orcamento: req.body.orcamento,
        responsavelId: req.body.responsavelId,
        responsavel: req.body.responsavel,
        status: req.body.status,
        clienteId: req.body.clienteId,
        cliente: req.body.cliente,
      };
      const file = req.file;

      const obra = await Obra.create(data);

      if (!obra) {
        return res.status(400).json({ error: "Erro ao criar a obra" });
      } else {
        const funcResponsavel = await Funcionario.findByPk(data.responsavelId);
        funcResponsavel.obraId = obra.id;

        if (file) {
          const urlContrato = await ObraController.uploadDocContrato(
            obra.id,
            file
          );
          obra.urlContrato = urlContrato;
        }

        await obra.save();
        await funcResponsavel.save();
        res
          .status(201)
          .json({ message: "Obra criada com sucesso", obra: obra });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getObras(req, res) {
    try {
      const obras = await Obra.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(obras);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getObraById(req, res) {
    try {
      const obra = await Obra.findByPk(req.query.id);
      if (obra) {
        res.status(200).json(obra);
      } else {
        res.status(404).json({ message: "Obra não encontrada" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async updateObra(req, res) {
    try {
      const obra = await Obra.findByPk(req.query.id);
      if (!obra) {
        return res.status(404).json({ message: "Obra não encontrada" });
      }
      const obraData = {
        nome: req.body.nome,
        identificador: req.body.identificador,
        endereco: req.body.endereco,
        dataInicio: req.body.dataInicio,
        dataFinal: req.body.dataFinal,
        contrato: req.body.contrato,
        alvara: req.body.alvara,
        orcamento: req.body.orcamento,
        responsavelId: req.body.responsavelId,
        responsavel: req.body.responsavel,
        urlContrato: obra.urlContrato,
        status: req.body.status,
        clienteId: req.body.clienteId,
        cliente: req.body.cliente,
      };

      const updatedObra = await obra.update(obraData);

      if (updatedObra) {
        res
          .status(200)
          .json({ message: "Obra atualizada com sucesso", obra: updatedObra });
      } else {
        res.status(400).json({ message: "Erro ao atualizar a obra" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteObra(req, res) {
    try {
      const obra = await Obra.findByPk(req.query.id);

      if (!obra) {
        return res.status(404).json({ message: "Obra não encontrada" });
      }

      const cliente = await Cliente.findByPk(obra.clienteId);
      const funcionario = await Funcionario.findByPk(obra.responsavelId);

      if (!cliente || !funcionario) {
        return res
          .status(404)
          .json({ message: "Cliente ou Funcionário não encontrado" });
      }

      cliente.obraId = null;
      funcionario.obraId = null;

      await cliente.save();
      await funcionario.save();

      const urlContrato = obra.urlContrato;

      if (urlContrato !== null) {
        const fileName = urlContrato.split("/").pop();
        await ObraController.deleteDocContrato(req.query.id, fileName);
      }
      const deleted = await Obra.destroy({
        where: { id: req.query.id },
      });
      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ message: "Erro ao deletar a obra" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getObrasByQuery(req, res) {
    try {
      const { nome, contrato, alvara } = req.query;
      const where = {};

      if (nome) {
        where.nome = {
          [Op.like]: `%${nome}%`,
        };
      }
      if (contrato) {
        where.contrato = {
          [Op.like]: `%${contrato}%`,
        };
      }
      if (alvara) {
        where.alvara = {
          [Op.like]: `%${alvara}%`,
        };
      }

      const obras =
        Object.keys(where).length === 0
          ? await Obra.findAll()
          : await Obra.findAll({ where });

      if (obras.length > 0) {
        res.status(200).json(obras);
      } else {
        res.status(404).json({ message: "Nenhuma obra encontrada" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getObrasPorFuncionario(req, res) {
    const userEmail = req.query.userId;
    try {
      
      const funcionario = await Funcionario.findOne({
        where: { email: userEmail },
      });

      
      if (!funcionario) {
        return res.status(404).json({ message: "Funcionario não encontrado" });
      }

      
      const obras = await Obra.findAll({
        include: [
          {
            model: Funcionario,
            where: { id: funcionario.id },
          },
        ],
      });

      
      if (obras.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhuma obra encontrada para este funcionário" });
      }

      
      res.status(200).json(obras);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async uploadDocContrato(_id, _file) {
    try {
      const id = _id;
      const file = _file;

      const date = new Date().toISOString().split("T")[0].toString();
      const containerName = "contratos";
      const blobName = `${id}-${date}-${file.originalname}`;
      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.uploadData(file.buffer);

      // Obter a URL do contrato no Azure Blob Storage
      const contratoURL = blockBlobClient.url;

      return contratoURL;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async deleteDocContrato(_id, fileUrl) {
    try {
      const id = _id;
      const containerName = "contratos";
  
      // Extrair o nome do blob da URL completa
      const blobName = fileUrl.split('/').pop().split('?')[0];
  
      console.log("blobName", blobName);
  
      if (!blobName) {
        throw new Error('Nome do blob não pôde ser extraído da URL.');
      }
  
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  
      const exists = await blockBlobClient.exists();
      if (!exists) {
        throw new Error(`O blob ${blobName} não existe.`);
      }
  
      await blockBlobClient.delete();
  
      return `Contrato ${blobName} excluído com sucesso.`;
    } catch (error) {
      throw new Error(`Erro ao excluir o contrato: ${error.message}`);
    }
  },

  async getObrasPorPeriodo(req, res) {
    try {
      const { dataInicial, dataFinal } = req.query;

      if (!dataInicial || !dataFinal) {
        return res
          .status(400)
          .json({ message: "Data inicial e data final são obrigatórias" });
      }

      const obras = await Obra.findAll({
        where: {
          dataInicio: {
            [Op.between]: [new Date(dataInicial), new Date(dataFinal)],
          },
        },
        order: [["dataInicio", "DESC"]],
      });

      res.status(200).json(obras);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getObrasPorDataFinal(req, res) {
    try {
      const { dataInicial, dataFinal } = req.query;

      if (!dataInicial || !dataFinal) {
        return res
          .status(400)
          .json({ message: "Data inicial e data final são obrigatórias" });
      }

      const obras = await Obra.findAll({
        where: {
          dataFinal: {
            [Op.between]: [new Date(dataInicial), new Date(dataFinal)],
          },
        },
        order: [["dataFinal", "DESC"]],
      });

      res.status(200).json(obras);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getFuncionariosPorObra(req, res) {
    try {
      const obras = await Obra.findAll({
        include: [
          {
            model: Funcionario,
            attributes: [],
          },
        ],
        attributes: [
          'id',
          'nome',
          [Sequelize.fn('COUNT', Sequelize.col('Funcionarios.id')), 'qtdFuncionarios'],
        ],
        group: ['Obra.id'],
      });
      
      if (obras.length > 0) {
        res.status(200).json(obras);
      } else {
        res.status(404).json({ message: "Nenhuma obra encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }, 
  async getObrasComFuncionarios(req, res) {
    try {
      const obras = await Obra.findAll({
        order: [['createdAt', 'DESC']], 
        limit: 5, 
      });

      const obrasComFuncionarios = await Promise.all(
        obras.map(async (obra) => {
          const qtdFuncionarios = await Funcionario.count({ where: { obraId: obra.id } });
          return {
            obra: obra.nome,
            operarios: qtdFuncionarios, 
          };
        })
      );

      res.status(200).json(obrasComFuncionarios);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = ObraController;