// eventosRoutes.js
const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventosController');

router.get('/', eventosController.obtenerEventosProximos);
router.get('/:id', eventosController.obtenerDetallesEvento);
router.post('/', eventosController.crearEvento);
router.put('/:id', eventosController.modificarEvento);
router.delete('/:id', eventosController.borrarEvento);

module.exports = router;
