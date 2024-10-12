const express = require('express');
const ObraMateriaisController = require('../controllers/ObraMateriaisController');

const obraMateriaisRoutes = express.Router();

obraMateriaisRoutes.post('/addMaterialObra', ObraMateriaisController.addMaterial);
obraMateriaisRoutes.get('/materiaisPorObra', ObraMateriaisController.getMateriaisPorObra);
obraMateriaisRoutes.put('/updateMaterialObra', ObraMateriaisController.updateMaterialObra);
obraMateriaisRoutes.delete('/removeMaterialObra', ObraMateriaisController.removeMaterial);


module.exports = obraMateriaisRoutes;