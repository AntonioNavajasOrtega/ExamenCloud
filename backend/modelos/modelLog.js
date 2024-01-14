const mongoose = require('mongoose');
const LogSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    usuario: { type: String, required: true },
    caducidad: { type: Date, required: true },
    token: { type: String, required: true },
  });
  
  const Log = mongoose.model('Log', LogSchema);

  module.exports = Log;