const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('¡Hola desde el backend!');
});

app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
