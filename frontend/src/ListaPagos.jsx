import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListaPagos = ({ userEmail }) => {
  const [pagos, setPagos] = useState([]);
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    // Hacer la solicitud HTTP utilizando el correo electrónico del usuario
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`https://server-examen.vercel.app/pagos`, {
            headers: {
                'Authorization': `Bearer ${token}`,
              }
        });
        const sortedPagos = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setPagos(sortedPagos);

        const pagos = sortedPagos;

// Paso 1: Calcular el importe total de todos los pagos
const importeTotal = pagos.reduce((total, pago) => total + parseFloat(pago.importe), 0);

// Paso 2: Obtener la lista de usuarios distintos
const usuariosDistintos = [...new Set(pagos.map(pago => pago.email))];

// Paso 3: Calcular el importe total dividido por el número de usuarios distintos
const importePorUsuario = importeTotal / usuariosDistintos.length;

// Paso 4: Calcular el saldo del usuario
const importeUsuario = pagos
  .filter(pago => pago.email === userEmail)
  .reduce((total, pago) => total + parseFloat(pago.importe), 0);

const saldoUsuario = importeUsuario - importePorUsuario;
setSaldo(saldoUsuario)

      } catch (error) {
        console.error('Error al obtener los pagos:', error);
      }
    };
    fetchData();
  }, [userEmail,pagos]);

  const handleDeletePago = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://server-examen.vercel.app/pagos/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Actualizar la lista de pagos después del borrado
      const updatedPagos = pagos.filter(pago => pago._id !== id);
      setPagos(updatedPagos);
    } catch (error) {
      console.error('Error al borrar el pago:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Pagos</h2>
      <p><strong>Saldo:</strong> {saldo}</p>
      <ul>
        {pagos.map(pago => (
          <li key={pago._id}>
            <p><strong>Concepto:</strong> {pago.concepto}</p>
            <p><strong>Importe:</strong> {pago.importe}</p>
            <p><strong>Email:</strong> {pago.email}</p>
            <p><strong>Fecha:</strong> {new Date(pago.timestamp).toLocaleString()}</p>
            <p><strong>Token:</strong> {pago.token}</p>
            {/* Agrega lógica para mostrar imageUrl y dirección según sea necesario */}
            {pago.imageUrl && <img src={pago.imageUrl} alt="Imagen del pago" />}
            {pago.direccion && <p><strong>Dirección:</strong> {pago.direccion}</p>}
            {pago.email === userEmail && (
              <button onClick={() => handleDeletePago(pago._id)}>Borrar Pago</button>
            )}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaPagos;
