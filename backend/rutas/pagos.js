// pagos.js
const express = require('express');
const router = express.Router();
const pagosController = require('../controllers/pagosController');

router.get('/', pagosController.obtener);
router.post('/', pagosController.guardar);
router.delete('/:id', pagosController.borrar);

module.exports = router;