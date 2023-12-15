import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Evento = () => {
  const [direccion, setDireccion] = useState('');
  const [eventos, setEventos] = useState([]);
  const [detalleEvento, setDetalleEvento] = useState(null);

  const obtenerEventosCercanos = async () => {
    try {
      const response = await axios.get(`https://server-examen.vercel.app/eventos/cercanos?direccion=${direccion}`);
      setEventos(response.data);
    } catch (error) {
      console.error('Error al obtener eventos cercanos', error);
    }
  };

  const obtenerDetallesEvento = async (id) => {
    try {
      const response = await axios.get(`https://server-examen.vercel.app/eventos/${id}`);
      setDetalleEvento(response.data);
    } catch (error) {
      console.error('Error al obtener detalles del evento', error);
    }
  };

  const crearEvento = async () => {
    try {
      const nuevoEvento = {
        nombre: 'Nuevo Evento',
        lugar: {
          direccion: 'Nueva Dirección',
          lat: 0.0,
          lon: 0.0,
        },
        timestamp: new Date(),
        organizador: {
          email: 'organizador@example.com',
        },
        imagen: 'https://ejemplo.com/imagen.jpg',
      };

      const response = await axios.post('https://server-examen.vercel.app/eventos', nuevoEvento);
      console.log(response.data);
      obtenerEventosCercanos();
    } catch (error) {
      console.error('Error al crear un nuevo evento', error);
    }
  };

  const borrarEvento = async (id) => {
    try {
      const response = await axios.delete(`https://server-examen.vercel.app/eventos/${id}`);
      console.log(response.data);
      obtenerEventosCercanos();
    } catch (error) {
      console.error('Error al borrar el evento', error);
    }
  };

  useEffect(() => {
    obtenerEventosCercanos();
  }, [direccion]);

  return (
    <div>
      <h2>Eventos Cercanos</h2>
      <label>
        Dirección Postal:
        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
      </label>
      <button onClick={obtenerEventosCercanos}>Buscar Eventos</button>

      <ul>
        {eventos.map((evento) => (
          <li key={evento._id}>
            <strong>{evento.nombre}</strong> - {evento.organizador.email}
            <button onClick={() => obtenerDetallesEvento(evento._id)}>Ver Detalles</button>
            <button onClick={() => borrarEvento(evento._id)}>Borrar Evento</button>
          </li>
        ))}
      </ul>

      {detalleEvento && (
        <div>
          <h2>Detalles del Evento</h2>
          <p>Nombre: {detalleEvento.nombre}</p>
          <p>Organizador: {detalleEvento.organizador.email}</p>
        </div>
      )}

      <button onClick={crearEvento}>Crear Nuevo Evento</button>
    </div>
  );
};

export default Evento;
