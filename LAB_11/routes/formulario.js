const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/form', (req, res) => {
    res.send(`
        <h1>Formulario</h1>
        <form action="/form" method="POST">
            <input name="nombre" placeholder="Escribe tu nombre">
            <button type="submit">Enviar</button>
        </form>
    `);
});

router.post('/form', (req, res) => {
    const nombre = req.body.nombre || 'Nombre no proporcionado';

    fs.appendFile('datos.txt', `Nombre: ${nombre}\n`, (err) => {
        if (err) {
            return res.status(500).send('Error al guardar el dato.');
        }
        res.send('<h2>Formulario recibido y guardado correctamente.</h2>');
    });
});

module.exports = router;
