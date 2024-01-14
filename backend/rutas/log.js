const express = require('express');
const router = express.Router();

const Log = require("../modelos/modelLog");

const verifyTokenMiddleware = require("../rutas/middleware")

router.use(verifyTokenMiddleware);


obtenerLogs = async (req, res) => {
    try {
      const response = await Log.find();
      res.json(response);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener eventos próximos' });
    }
  };

router.get('/',obtenerLogs);


module.exports = router;
