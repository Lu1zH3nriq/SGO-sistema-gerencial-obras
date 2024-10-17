const express = require('express');
const ObraController = require('../controllers/ObraController');
const multer = require('multer');

const obrasRoutes = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

obrasRoutes.post('/novaObra', upload.single('contrato'), ObraController.createObra);
obrasRoutes.get('/obras', ObraController.getObras);
obrasRoutes.get('/obra', ObraController.getObraById);
obrasRoutes.put('/alterarObra', ObraController.updateObra);
obrasRoutes.delete('/deleteObra', ObraController.deleteObra);
obrasRoutes.get('/buscaObraQuery', ObraController.getObrasByQuery);
obrasRoutes.get('/buscaObraPorUser', ObraController.getObrasPorFuncionario);
obrasRoutes.get('/buscaObraPorPeriodo', ObraController.getObrasPorPeriodo);
obrasRoutes.get('/buscaObraPorDataFinal', ObraController.getObrasPorDataFinal);
obrasRoutes.get('/funcionariosPorObra', ObraController.getFuncionariosPorObra);
obrasRoutes.get('/getObrasComFuncionarios',ObraController.getObrasComFuncionarios);

module.exports = obrasRoutes;
