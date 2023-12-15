const mongoose = require('mongoose');

const modelo1Schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  lugar: {
    direccion: {
      type: String,
      required: true,
      trim: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
  organizador: {
    email: {
      type: String,
      required: true,
      trim: true,
    },
  },
  imagen: {
    type: String, // Puedes cambiar el tipo a Buffer si deseas almacenar la imagen directamente en la base de datos.
    required: true,
  },
});


const modelo = mongoose.model("modelo", modelo1Schema);
module.exports = modelo;
