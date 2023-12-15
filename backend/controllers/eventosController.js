// eventosController.js
const Modelo1 = require('../modelos/modelo1'); // Asegúrate de tener la ruta correcta al modelo


// Obtener eventos próximos
exports.obtenerEventosProximos = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    // Convertir las coordenadas de cadena a números
    const latitud = parseFloat(lat);
    const longitud = parseFloat(lon);

    const eventosProximos = await Modelo1.find({
      'lugar.lat': { $lte: latitud + 0.2, $gte: latitud - 0.2 },
      'lugar.lon': { $lte: longitud + 0.2, $gte: longitud - 0.2 },
    }).sort({ timestamp: 1 });

    res.json(eventosProximos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener eventos próximos' });
  }
};

// Obtener detalles de un evento
exports.obtenerDetallesEvento = async (req, res) => {
  try {
    const evento = await Modelo1.findById(req.params.id);
    res.json(evento);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener detalles del evento' });
  }
};

// Crear un nuevo evento
exports.crearEvento = async (req, res) => {
  try {
    const nuevoEvento = new Modelo1(req.body);
    await nuevoEvento.save();
    res.json({ mensaje: 'Evento creado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el evento' });
  }
};

// Modificar un evento existente
exports.modificarEvento = async (req, res) => {
  try {
    await Modelo1.findByIdAndUpdate(req.params.id, req.body);
    res.json({ mensaje: 'Evento modificado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al modificar el evento' });
  }
};

// Borrar un evento
exports.borrarEvento = async (req, res) => {
  try {
    await Modelo1.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Evento borrado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al borrar el evento' });
  }
};
