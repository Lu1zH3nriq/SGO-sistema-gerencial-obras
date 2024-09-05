const { BlobServiceClient } = require("@azure/storage-blob");
const Usuario = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../sendEmails/sendEmails");

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);

// Criar usuário
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
    const subject = "Bem-vindo ao Sistema Gerencial de Obras! Aqui está sua senha de acesso";
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

// Editar foto do usuário
const editPhoto = async (req, res) => {
  try {
    const email = req.query.email;
    const file = req.file;

    // Buscar usuário pelo email
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Fazer upload da foto para o Azure Blob Storage
    const containerName = "imagens";
    const blobName = `${usuario.id}-${file.originalname}`;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file.buffer);

    // Obter a URL da foto no Azure
    const photoUrl = blockBlobClient.url;

    // Atualizar o usuário no banco de dados com a URL da foto
    usuario.urlFoto = photoUrl;
    await usuario.save();

    // Retornar a URL da foto para o frontend
    res.status(200).json({ message: "Foto atualizada com sucesso", photoUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remover foto do usuário
const removePhoto = async (req, res) => {
  try {
    const email = req.query.email;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const containerName = "imagens";
    const blobName = `${req.query.photoName}`;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    console.log("blobName", blobName);
    console.log("blockBlobClient", blockBlobClient);

    // Verificar se o blob existe
    const exists = await blockBlobClient.exists();
    if (!exists) {
      return res.status(404).json({ error: "A foto especificada não existe" });
    }

    // Deletar o blob
    await blockBlobClient.delete();

    // Atualizar o usuário no banco de dados
    usuario.urlFoto = null;
    await usuario.save();

    res.status(200).json({ message: "Foto removida com sucesso" });
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
  editPhoto,
  removePhoto
};