// logController.js
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'logs.txt');

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
      const logs = fs.readFileSync(logFilePath, 'utf-8').split('\n').filter(log => log.trim() !== '');
  
      // Formatear los logs como objetos JSON si es necesario
      const logsJSON = logs.map(log => {
        const logParts = log.split(', ');
        return {
          timestamp: logParts[0].split(': ')[1],
          usuario: logParts[1].split(': ')[1],
          caducidad: logParts[2].split(': ')[1],
          token: logParts[3].split(': ')[1],
          accion: logParts[4].split(': ')[1],
        };
      });
  
      res.json(logsJSON);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener los logs' });
    }
  };