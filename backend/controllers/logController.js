// logController.js
const fs = require('fs');
const path = require('path');

const logFilePath = path.join("../", 'logs.txt');

exports.registrarLog = async (usuario, caducidad, token) => {
  try {
    const logMessage = `Timestamp: ${new Date().toISOString()}, Usuario: ${usuario}, Caducidad: ${caducidad}, Token: ${token}\n`;

    // Agrega el log al archivo
    fs.appendFileSync(logFilePath, logMessage);

    // También podrías enviar el log a la consola o a otro destino si lo deseas
    console.log(logMessage);
  } catch (error) {
    console.error('Error al registrar el log:', error);
  }
};

exports.obtenerLogs = async (req, res) => {
    try {
        console.log('Ruta del archivo de logs:', logFilePath);

    const logMessage = `Timestamp: ${new Date().toISOString()}, Usuario: antonionavajasortega@gmail.com, Caducidad: 2023-12-16T12:34:56.789Z, Token: eyJhbGciOiJSUzI1NiIsImtpZCI6IjBhZDFmZWM3ODUwNGY0NDdiYWU2NWJjZjVhZmFlZGI2NWVlYzllODEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5MzQzMTAxNjI3NDEtZTc0YnA5bzA3dWE2a2lpdDdrZ2V1MHFmaW5samM4b2guYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5MzQzMTAxNjI3NDEtZTc0YnA5bzA3dWE2a2lpdDdrZ2V1MHFmaW5samM4b2guYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDg5MDE3NDQ3Njk5NDUxMzMwNzYiLCJlbWFpbCI6ImFudG9uaW9uYXZhamFzb3J0ZWdhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MDI2NjQ3MTQsIm5hbWUiOiJBbnRvbmlvIE5hdmFqYXMgT3J0ZWdhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tzdzdDQThhZ1I3WkxmNVlKeEhXMFcwWjBVdE1qdnBEeVg1M0daM0RpUz1zOTYtYyIsImdpdmVuX25hbWUiOiJBbnRvbmlvIiwiZmFtaWx5X25hbWUiOiJOYXZhamFzIE9ydGVnYSIsImxvY2FsZSI6ImVzIiwiaWF0IjoxNzAyNjY1MDE0LCJleHAiOjE3MDI2Njg2MTQsImp0aSI6IjA0NTk0OTk2ZGE5ZWEyNjA5MTQ5NjQ2MGI5ODdiNjkyODRmMmIwYjYifQ.WqTabPwCqbFvALgEl5QTseExpQq3VkSljVs0QhyNXqQEnJOoqoGwCQ4BL1SJDw9g2UmsDF6qp92D3FzqQaLwTDeUO22WT_lEJIdeskIIMe2QCGbpipUN52poULN3NJjK3GRZZwaOhFpkrrvPl1fYdRuWJQ63ElK6xwNVlzmzyAdZNid9Yt-j_VO0CwFovgONv-ndMybFbozM92izcBQamyHhFag4SPig_NMODj2thTdp2CZUdzh_RAeVNlBq-keQl7uzwSvGC_Mha0rPgeBtGybl_H4Q0RZhmeyVwYaHuZ_IYv7Kgmru3vPHsBGnTiGBPEvTvRkCEA1c-yN_Q_SgMQ\n`;

    // Agrega el log al archivo
    fs.appendFileSync(logFilePath, logMessage);
        

      // Verificar si el archivo de logs existe antes de intentar leerlo
      if (!fs.existsSync(logFilePath)) {
        return res.status(404).json({ mensaje: 'El archivo de logs no existe' });
      }
  
      // Leer el contenido del archivo de logs
      const logs = fs.readFileSync(logFilePath, 'utf-8').split('\n').filter(log => log.trim() !== '');
  
      // Formatear los logs como objetos JSON si es necesario
      const logsJSON = logs.map(log => {
        const logParts = log.split(', ');
        return {
          timestamp: logParts[0].split(': ')[1],
          usuario: logParts[1].split(': ')[1],
          caducidad: logParts[2].split(': ')[1],
          token: logParts[3].split(': ')[1]
        };
      });
  
      res.json(logsJSON);
    } catch (error) {
      console.error('Error al obtener los logs:', error);
      res.status(500).json({ mensaje: 'Error al obtener los logs' });
    }
  };