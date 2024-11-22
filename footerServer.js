const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3003;

// Middleware para habilitar CORS y servir archivos estáticos
app.use(cors());
app.use(express.static(path.join(__dirname, 'footer')));

// Ruta para el Home (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'footer', 'index.html'));
});

// Iniciar servidor en el puerto 3003
app.listen(port, () => {
    console.log(`Servidor Home corriendo en http://localhost:${port}`);
});