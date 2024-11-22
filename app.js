const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const path = require('path');  // Para manejar rutas de archivos
const app = express();
const port = 3002;

// Configuración de la conexión a la base de datos
const config = {
    user: 'axelito',
    password: 'Deadmau5blend%',
    server: 'dockerdb.database.windows.net',
    database: 'dockerbase',
    options: {
        encrypt: true,
        trustServerCertificate: false,
    },
};

// Middleware para aceptar JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'crud' y otras necesarias
app.use(express.static(path.join(__dirname, 'crud')));
app.use(express.static(path.join(__dirname, 'footer')));
app.use(express.static(path.join(__dirname, 'home')));

//comando para servir proxy inverso
app.set('trust proxy', true);

// Ruta para servir el archivo 'index.html' desde la carpeta 'crud'
app.get('/crud', (req, res) => {
    res.sendFile(path.join(__dirname, 'crud', 'index.html'));
});

// Rutas de la API CRUD
app.get('/api/items', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM tableName`;  // Reemplaza "tableName" por tu tabla
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
});

// Agregar un nuevo elemento
app.post('/api/items', async (req, res) => {
    const { name } = req.body;
    try {
        await sql.connect(config);
        await sql.query`INSERT INTO tableName (name) VALUES (${name})`;
        res.status(201).send('Elemento agregado');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al agregar el elemento');
    }
});

// Actualizar un elemento
app.put('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await sql.connect(config);
        await sql.query`UPDATE tableName SET name = ${name} WHERE id = ${id}`;
        res.send('Elemento actualizado');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar el elemento');
    }
});

// Eliminar un elemento
app.delete('/api/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql.connect(config);
        await sql.query`DELETE FROM tableName WHERE id = ${id}`;
        res.send('Elemento eliminado');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar el elemento');
    }
});

// Iniciar servidor en el puerto 3002
app.listen(port, () => {
    console.log(`Servidor Home corriendo en http://localhost:${port}`);
});