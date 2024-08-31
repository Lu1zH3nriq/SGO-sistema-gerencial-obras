const Usuario = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../sendEmails/sendEmails");

//criar usuario
const createUsuario = async (req, res) => {
  try {
    const { email, nivelUsuario } = req.body;
    const password = Math.random().toString(36).slice(-8);
    console.log("password", password);
    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      ...req.body,
      password: hashedPassword,
      nivelUsuario: parseInt(nivelUsuario),
    });

    // Enviar e-mail com a senha gerada
    const subject = "Bem-vindo so Sistema Gerencial de Obras! Aqui está sua senha de acesso";
    const text = `Olá ${usuario.nome},\n\nSua conta foi criada com sucesso! Aqui está sua senha para acessar o sistema: ${password}\n\nRecomendamos que você altere sua senha após o primeiro login.\n\nObrigado!`;
    await sendEmail(email, subject, text);

    res.status(201).json({ message: "Usuário criado com sucesso!", usuario });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obter todos os usuários
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter um usuário por email
const getUsuarioByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const usuario = await Usuario.findOne({ where: { email } });
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar um usuário por ID
const updateUsuario = async (req, res) => {
  try {
    const [updated] = await Usuario.update(req.body, {
      where: { id: req.query.id },
    });
    if (updated) {
      const updatedUsuario = await Usuario.findByPk(req.query.id);
      res.status(200).json(updatedUsuario);
    } else {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar um usuário por ID
const deleteUsuario = async (req, res) => {
  try {
    const deleted = await Usuario.destroy({
      where: { id: req.query.id },
    });
    if (deleted) {
      res.status(204).json({ message: "Usuário deletado com sucesso" });
    } else {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUsuario,
  getUsuarios,
  getUsuarioByEmail,
  updateUsuario,
  deleteUsuario,
};
