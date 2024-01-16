import React, { useState } from 'react';
import axios from 'axios';

const CloudinaryUploader = ( ) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('Selecciona un archivo antes de subirlo.');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dwhe8hrlr/image/upload',
        formData
      );

      // Setear la url al atributo de la entidad con la imagen
      //setProduct((prevProduct) => ({
        //...prevProduct,
       // fotos: [...prevProduct.fotos, response.data.secure_url],
     // }));

     // luego para obtener <img src={entityWithImageUrl.imagenUrl} alt="Cargada" />

      console.log('Carga exitosa:', response.data);

      
    } catch (error) {
      console.error('Error al subir la imagen a Cloudinary:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        Subir Imagen
      </button>
    </div>
  );
};

export default CloudinaryUploader;
