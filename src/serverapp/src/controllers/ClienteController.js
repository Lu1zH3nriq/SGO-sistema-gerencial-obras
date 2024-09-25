const { Cliente } = require("../models");

const ClienteController = {
  async createCliente(req, res) {
    try {
      const cliente = await Cliente.create(req.body);
      res.status(201).json(cliente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getClientes(req, res) {
    try {
      const clientes = await Cliente.findAll();
      res.status(200).json(clientes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getClienteById(req, res) {
    try {
      const id = req.query.id;
      const cliente = await Cliente.findByPk(id);
      if (cliente) {
        res.status(200).json(cliente);
      } else {
        res.status(404).json({ error: "Cliente não encontrado" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateCliente(req, res) {
    try {
      const cliente = await Cliente.findByPk(req.query.id);
      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      await Cliente.update(req.body, {
        where: { id: req.query.id },
      });

      const updatedCliente = await Cliente.findByPk(req.query.id);
      res.status(200).json(updatedCliente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteCliente(req, res) {
    try {
      const cliente = await Cliente.findByPk(req.query.id);
      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      await Cliente.destroy({
        where: { id: req.query.id },
      });

      res.status(204).json();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async buscaClienteQuery(req, res) {
    try {
      const { nome, email, cpf, cnpj, tipoCliente } = req.query;
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
      if (cnpj) {
        where.cnpj = cnpj;
      }

      if (tipoCliente && tipoCliente !== "Todos") {
        where.tipoPessoa = tipoCliente;
      }

      const clientes = await Cliente.findAll({ where });

      if (clientes.length > 0) {
        res.status(200).json(clientes);
      } else {
        res.status(404).json({ error: "Nenhum cliente encontrado" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = ClienteController;
