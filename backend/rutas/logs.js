// eventosRoutes.js
const express = require('express');
const router = express.Router();
const logs = require('../controllers/logController');

router.post('/', logs.registrarLog);
router.get("/", logs.obtenerLogs);


module.exports = router;
