const express = require('express');
const ObraController = require('../controllers/ObraController');

const obrasRoutes = express.Router();

obrasRoutes.post('/novaObra', ObraController.createObra);
obrasRoutes.get('/obras', ObraController.getObras);
obrasRoutes.get('/obra', ObraController.getObraById);
obrasRoutes.put('/alterarObra', ObraController.updateObra);
obrasRoutes.delete('/deleteObra', ObraController.deleteObra);
obrasRoutes.get('/buscaObraQuery', ObraController.getObrasByQuery);

module.exports = obrasRoutes;