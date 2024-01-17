const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  concepto: {
    type: String,
    required: true,
  },
  importe: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, // Puedes cambiar el tipo de dato según tus necesidades
  },
  direccion: {
    type: String, // O un tipo más específico para la dirección si es necesario
  },
});

const pago = mongoose.model('Pago', pagoSchema);

module.exports = pago;
