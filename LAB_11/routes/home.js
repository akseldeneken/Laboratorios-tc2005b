const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send(`
        <h1>Inicio</h1>
        <nav>
            <a href="/">Inicio</a> |
            <a href="/about">Acerca</a> |
            <a href="/contacto">Contacto</a> |
            <a href="/form">Formulario</a>
        </nav>
    `);
});

router.get('/about', (req, res) => {
    res.send('<h1>Acerca de</h1><p>Esta es la página de información.</p>');
});

router.get('/contacto', (req, res) => {
    res.send('<h1>Contacto</h1><p>Puedes contactarnos en contacto@ejemplo.com</p>');
});

module.exports = router;
