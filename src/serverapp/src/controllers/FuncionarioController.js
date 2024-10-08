const { Funcionario } = require("../models");
const { Op } = require("sequelize");
const { format } = require('date-fns');
const Usuario = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../sendEmails/sendEmails");

const FuncionarioController = {
  async createFuncionario(req, res) {
    const isUser = req.body.isUser;
    try {
      const funcionario = await Funcionario.create(req.body);

      if (isUser) {
        const data = {
          nome: funcionario.nome,
          email: funcionario.email,
          telefone: funcionario.telefone,
          cargo: funcionario.cargo,
          dataCadastro: format(new Date(), "yyyy-MM-dd"),
          status: "Ativo",
          nivelUsuario: 2,
          tipo: "Interno",
        };

        try {
          const user = data;
          const password = Math.random().toString(36).slice(-8);
          const hashedPassword = await bcrypt.hash(password, 10);

          const usuario = await Usuario.create({
            ...user,
            password: hashedPassword
          });

          if (usuario) {


            // Enviar e-mail com a senha gerada
            const subject =
              "Bem-vindo ao Sistema Gerencial de Obras! Aqui está sua senha de acesso";
            const text = `Olá ${usuario.nome},\n\nSua conta foi criada com sucesso! Aqui está sua senha para acessar o sistema: ${password}\n\nRecomendamos que você altere sua senha após o primeiro login.\n\nObrigado!`;
            await sendEmail(user.email, subject, text);

            res.status(201).json({ funcionario, usuario });
          }

          else {

            await Funcionario.destroy({ where: { id: funcionario.id } });
            res.status(400).json({ error: "Erro ao criar usuário" });

          }
        } catch (error) {
          await Funcionario.destroy({ where: { id: funcionario.id } });
          res.status(400).json({ error: `Erro ao criar usuário: ${error.message}` });

        }
      } else {
        res.status(201).json(funcionario);
      }
    } catch (error) {

      res.status(400).json({ error: `Erro ao criar funcionário: ${error.message}` });
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
        res.status(404).json({ error: "Funcionario não encontrado" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateFuncionario(req, res) {
    try {
      const [updated] = await Funcionario.update(req.body, {
        where: { id: req.query.id },
      });
      if (updated) {
        const updatedFuncionario = await Funcionario.findByPk(req.query.id);
        res.status(200).json(updatedFuncionario);
      } else {
        res.status(404).json({ error: "Funcionario não encontrado" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteFuncionario(req, res) {
    try {
      const deleted = await Funcionario.destroy({
        where: { email: req.query.id },
      });
      if (deleted) {

        await Usuario.findOne({ where: { email: req.query.id } }).then(async (user) => {
          if (user) {
            await Usuario.destroy({ where: { email: req.query.id } });
          }
        });

        res.status(204).json();
      } else {
        res.status(404).json({ error: "Funcionario não encontrado" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async buscaFuncionarioQuery(req, res) {
    try {
      const { nome, email, cpf, tipoFuncionario } = req.query;
      const where = {};

      if (nome) {
        where.nome = { [Op.like]: `%${nome}%` };
      }
      if (email) {
        where.email = email;
      }
      if (cpf) {
        where.cpf = cpf;
      }
      if (tipoFuncionario && tipoFuncionario !== "Todos") {
        where.tipo = tipoFuncionario;
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

  async buscaFuncionariosPorObra(req, res) {
    try {
      const obraId = req.query.obraId;
      const funcionarios = await Funcionario.findAll({
        where: { obraId },
      });
      if (funcionarios.length > 0) {
        res.status(200).json(funcionarios);
      } else {
        res.status(404).json({ message: "Nenhum funcionario encontrado" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = FuncionarioController;