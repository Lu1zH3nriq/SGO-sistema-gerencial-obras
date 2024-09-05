const express = require('express');
const multer = require('multer');
const UserController = require('../controllers/UserController');

const usersRoutes = express.Router();

// Configuração do multer para upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

usersRoutes.post('/novoUsuario', UserController.createUsuario);
usersRoutes.get('/usuarios', UserController.getUsuarios);
usersRoutes.get('/usuario', UserController.getUsuarioByEmail);
usersRoutes.put('/alterarUsuario', UserController.updateUsuario);
usersRoutes.delete('/deleteUsuario', UserController.deleteUsuario);
usersRoutes.post('/editPhoto', upload.single('imagem'), UserController.editPhoto);
usersRoutes.delete('/removePhoto', UserController.removePhoto);

module.exports = usersRoutes;