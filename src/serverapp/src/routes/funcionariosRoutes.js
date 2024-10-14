const express = require('express');
const FuncionarioController = require('../controllers/FuncionarioController');

const funcionariosRoutes = express.Router();

funcionariosRoutes.post('/novoFuncionario', FuncionarioController.createFuncionario);
funcionariosRoutes.get('/funcionarios', FuncionarioController.getFuncionarios);
funcionariosRoutes.get('/funcionario', FuncionarioController.getFuncionarioById);
funcionariosRoutes.put('/alterarFuncionario', FuncionarioController.updateFuncionario);
funcionariosRoutes.delete('/deleteFuncionario', FuncionarioController.deleteFuncionario);
funcionariosRoutes.get('/buscaFuncionarioQuery', FuncionarioController.buscaFuncionarioQuery);
funcionariosRoutes.get('/buscaFuncionarioPorObra', FuncionarioController.buscaFuncionariosPorObra);
funcionariosRoutes.get('/funcionariosPorStatus', FuncionarioController.getStatusFuncionarios);

module.exports = funcionariosRoutes;