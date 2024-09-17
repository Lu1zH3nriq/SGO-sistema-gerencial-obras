const express = require('express');
const MaterialController = require('../controllers/MaterialController');

const materiaisRoutes = express.Router();

materiaisRoutes.post('/novoMaterial', MaterialController.createMaterial);
materiaisRoutes.get('/materiais', MaterialController.getMateriais);
materiaisRoutes.get('/material', MaterialController.getMaterialById);
materiaisRoutes.put('/alterarMaterial', MaterialController.updateMaterial);
materiaisRoutes.delete('/deleteMaterial', MaterialController.deleteMaterial);

module.exports = materiaisRoutes;