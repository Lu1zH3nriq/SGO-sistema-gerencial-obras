const { Obra, Cliente } = require("../models");
const { Funcionario } = require("../models");
const Usuario = require("../models/User");
const { BlobServiceClient } = require("@azure/storage-blob");


const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);

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
          const urlContrato = await ObraController.uploadDocContrato(obra.id, file);
          obra.urlContrato = urlContrato;
        }

        await obra.save();
        await funcResponsavel.save();
        res.status(201).json({ message: "Obra criada com sucesso", obra: obra });
      }
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
        res.status(404).json({ error: "Obra não encontrada" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateObra(req, res) {
    try {
      const [updated] = await Obra.update(req.body, {
        where: { id: req.query.id },
      });
      if (updated) {
        const updatedObra = await Obra.findByPk(req.query.id);
        res.status(200).json(updatedObra);
      } else {
        res.status(404).json({ error: "Obra não encontrada" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteObra(req, res) {
    try {
      const deleted = await Obra.destroy({
        where: { id: req.query.id },
      });
      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: "Obra não encontrada" });
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
        res.status(404).json({ error: "Nenhuma obra encontrada" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },


  async getObrasPorFuncionario(req, res) {
    const userEmail = req.query.userId;
    try {
      // Buscar o funcionário pelo email
      const funcionario = await Funcionario.findOne({
        where: { email: userEmail },
      });

      // Verificar se o funcionário existe
      if (!funcionario) {
        return res.status(404).json({ error: "Funcionario não encontrado" });
      }

      // Buscar todas as obras associadas ao funcionário
      const obras = await Obra.findAll({
        include: [{
          model: Funcionario,
          where: { id: funcionario.id }
        }]
      });

      // Verificar se foram encontradas obras
      if (obras.length === 0) {
        return res.status(404).json({ error: "Nenhuma obra encontrada para este funcionário" });
      }

      // Retornar as obras encontradas
      res.status(200).json(obras);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async uploadDocContrato(_id, _file) {
    try {
      const id = _id;
      const file = _file;

      const containerName = "contratos";
      const blobName = `${id}-${file.originalname}-${new Date()}`;
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.uploadData(file.buffer);

      // Obter a URL do contrato no Azure Blob Storage
      const contratoURL = blockBlobClient.url;

      return contratoURL;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = ObraController;
