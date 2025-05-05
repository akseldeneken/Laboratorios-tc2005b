const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h1>Página principal</h1><a href="/formulario">Ir al formulario</a>');
});


app.get('/contacto', (req, res) => {
    res.send('<h1>Contacto</h1><p>Correo: ejemplo@correo.com</p>');
});

app.get('/formulario', (req, res) => {
    res.send(`
        <h1>Formulario</h1>
        <form action="/guardar" method="POST">
            <input name="nombre" placeholder="Tu nombre" required>
            <button type="submit">Enviar</button>
        </form>
    `);
});


app.post('/guardar', (req, res) => {
    const nombre = req.body.nombre;
    fs.appendFileSync('nombres.txt', nombre + '\n');
    res.send('<h1>Gracias por enviar tu nombre.</h1><a href="/">Volver al inicio</a>');
});

app.use((req, res) => {
    res.status(404).send('<h1>Error 404: Página no encontrada</h1>');
});


app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
