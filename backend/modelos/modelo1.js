const mongoose = require("mongoose");

const modelo1Schema = new mongoose.Schema({
  direccion: String, 
  anfitrion: String ,
  descripcion: String,
  inicio: Date,
  duracion : Number,
  invitados: [],  
  mensajes: [{
      emisor: String,
      receptor: String,
      fecha: {
        type: Date,
        default: Date.now,
      }
  }]
  
});

const evento = mongoose.model("modelo", modelo1Schema);
module.exports = evento;
