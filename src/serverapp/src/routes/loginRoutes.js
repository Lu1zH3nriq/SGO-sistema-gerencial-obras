const express = require('express');
const LoginController = require('../controllers/LoginController');

const loginRoutes = express.Router();

loginRoutes.post('/login', LoginController.login);
loginRoutes.put('/resetSenha', LoginController.redefSenha);

module.exports = loginRoutes;