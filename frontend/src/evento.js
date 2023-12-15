import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Mapa from './mapa'

const Evento = () => {
  const [codigoPostal, setCodigoPostal] = useState('');
  const [eventos, setEventos] = useState([]);
  const [detalleEvento, setDetalleEvento] = useState(null);

  const obtenerEventosCercanos = async () => {
    try {
      // Obtener las coordenadas directamente desde la dirección postal
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(codigoPostal)}`);
      
      if (response.data.length > 0) {
        const coordenadas = {
          lat: parseFloat(response.data[0].lat),
          lon: parseFloat(response.data[0].lon),
        };
  
        // Realizar la solicitud con las coordenadas obtenidas
        const eventosResponse = await axios.get(`https://server-examen.vercel.app/eventos?lat=${coordenadas.lat}&lon=${coordenadas.lon}`);
        setEventos(eventosResponse.data);
      } else {
        console.error('No se encontraron coordenadas para la dirección proporcionada');
      }
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
  }, [codigoPostal]);

  return (
    <div>
      <h2>Eventos Cercanos</h2>
      <label>
        Código Postal:
        <input type="text" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
      </label>
      
      <button onClick={obtenerEventosCercanos}>Buscar Eventos</button>
      <Mapa direccion={codigoPostal} />
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
