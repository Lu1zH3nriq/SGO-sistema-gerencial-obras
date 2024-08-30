const express = require('express');
const UserController = require('../controllers/UserController');

const usersRoutes = express.Router();

usersRoutes.post('/novoUsuario', UserController.createUsuario);
usersRoutes.get('/usuarios', UserController.getUsuarios);
usersRoutes.get('/usuario', UserController.getUsuarioById);
usersRoutes.put('/alterarUsuario', UserController.updateUsuario);
usersRoutes.delete('/deleteUsuario', UserController.deleteUsuario);

module.exports = usersRoutes;