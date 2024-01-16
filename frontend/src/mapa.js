import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { PunteroMapa } from "./PunteroMapa";
import 'leaflet/dist/leaflet.css';

const Mapa = ({ direccion }) => {
  const [coordinates, setCoordinates] = useState([50, 50]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerCoordenadas = async () => {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`);
        const results = response.data;
        
        setCoordinates([parseFloat(results[0].lat), parseFloat(results[0].lon)]);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener coordenadas:', error);
        setLoading(false);
      }
    };

    if (direccion) {
      setLoading(true);
      obtenerCoordenadas();
    }
  }, [direccion]);

  return (
    <div style={{ height: '300px', width: '300px', margin: 'auto', position: 'relative' }}>
      {!loading && (
        <MapContainer center={coordinates} zoom={11} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker icon={PunteroMapa} position={coordinates}></Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Mapa;
