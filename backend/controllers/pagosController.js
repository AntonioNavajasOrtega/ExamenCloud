// controllers/pagosController.js
const Pago = require('../modelos/pago'); // Ajusta la ruta según tu estructura de archivos

const express = require('express');
const router = express.Router();
const verifyTokenMiddleware = require("../rutas/middleware")

router.use(verifyTokenMiddleware);

const pagosController = {
  obtener: async (req, res) => {
    try {
      const pagos = await Pago.find(); // Obtén todos los pagos desde la base de datos
      res.json(pagos);
    } catch (error) {
      console.error('Error al obtener los pagos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  guardar: async (req, res) => {
    try {
      const nuevoPago = new Pago(req.body);
      await nuevoPago.save(); // Guarda el nuevo pago en la base de datos
      res.status(201).json(nuevoPago);
    } catch (error) {
      console.error('Error al guardar el pago:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  borrar: async (req, res) => {
    try {
      const id = req.params.id;
      const pago = await Pago.findByIdAndDelete(id); // Busca y borra el pago por ID
      if (!pago) {
        return res.status(404).json({ error: 'Pago no encontrado' });
      }
      res.json(pago);
    } catch (error) {
      console.error('Error al borrar el pago:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
};

module.exports = pagosController;
