import React, { useState } from 'react';
import axios from 'axios';
import { Image, Transformation } from 'cloudinary-react';
import Mapa from './mapa'

const FormularioPago = ({ userEmail }) => {
  const [nuevoPago, setNuevoPago] = useState({
    concepto: '',
    importe: '',
    email: userEmail,
    imageUrl: '',
    direccion: '',
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoPago({ ...nuevoPago, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (image) {
      try {
        // Cargar la imagen en Cloudinary
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'jkhtnekl'); // Reemplaza con tu propio upload preset de Cloudinary

        const response = await axios.post('https://api.cloudinary.com/v1_1/dwhe8hrlr/image/upload', formData);
        const imageUrl = response.data.secure_url;

        setNuevoPago({ ...nuevoPago, imageUrl });
      } catch (error) {
        console.error('Error al cargar la imagen en Cloudinary', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Antes de enviar el formulario, carga la imagen en Cloudinary
    await handleImageUpload();

    const token = localStorage.getItem("token");
    // Realiza la solicitud HTTP para guardar el nuevo pago
    axios.post('https://server-examen.vercel.app/pagos', nuevoPago, {
    headers: {
        'Authorization': `Bearer ${token}`, // Asegúrate de tener el token definido antes de esta línea 
    },
})
.then(response => {
    console.log('Pago creado con éxito', response.data);
})
.catch(error => {
    console.error('Error al crear el pago', error);
});

  };

  return (
    <div>
      <h2>Crear Nuevo Pago</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="concepto">Concepto:</label>
          <input
            type="text"
            id="concepto"
            name="concepto"
            value={nuevoPago.concepto}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="importe">Importe:</label>
          <input
            type="number"
            id="importe"
            name="importe"
            value={nuevoPago.importe}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={nuevoPago.direccion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleImageChange}
            accept="image/*"
          />
          {image && (
            <div>
              <img src={image} alt="Imagen del pago" />
            </div>
          )}
        </div>
        <button type="submit">Crear Pago</button>
      </form>
      <Mapa direccion={nuevoPago.direccion}></Mapa>
    </div>
  );
};

export default FormularioPago;
