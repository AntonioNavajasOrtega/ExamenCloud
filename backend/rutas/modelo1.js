// eventosRoutes.js
const express = require('express');
const router = express.Router();
const eventosController = require('./eventosController');

router.get('/eventos', eventosController.obtenerEventosProximos);
router.get('/eventos/:id', eventosController.obtenerDetallesEvento);
router.post('/eventos', eventosController.crearEvento);
router.put('/eventos/:id', eventosController.modificarEvento);
router.delete('/eventos/:id', eventosController.borrarEvento);

module.exports = router;
