const express = require('express');
const ClienteController = require('../controllers/ClienteController');

const clientesRoutes = express.Router();

clientesRoutes.post('/novoCliente', ClienteController.createCliente);
clientesRoutes.get('/clientes', ClienteController.getClientes);
clientesRoutes.get('/cliente', ClienteController.getClienteById);
clientesRoutes.put('/alterarCliente', ClienteController.updateCliente);
clientesRoutes.delete('/deleteCliente', ClienteController.deleteCliente);
clientesRoutes.get('/buscaClienteQuery', ClienteController.buscaClienteQuery);

module.exports = clientesRoutes;