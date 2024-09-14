const express = require('express');
const EquipamentoController = require('../controllers/EquipamentoController');

const equipamentosRoutes = express.Router();

equipamentosRoutes.post('/novoEquipamento', EquipamentoController.createEquipamento);
equipamentosRoutes.get('/equipamentos', EquipamentoController.getEquipamentos);
equipamentosRoutes.get('/equipamento', EquipamentoController.getEquipamentoById);
equipamentosRoutes.put('/alterarEquipamento', EquipamentoController.updateEquipamento);
equipamentosRoutes.delete('/deleteEquipamento', EquipamentoController.deleteEquipamento);

module.exports = equipamentosRoutes;