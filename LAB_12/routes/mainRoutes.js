const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.render('index', { title: 'Inicio' });
});


router.get('/about-us', (req, res) => {
    res.render('about-us', { title: 'Sobre Nosotros' });
});


router.get('/preguntas', (req, res) => {
    res.render('preguntas', { title: 'Preguntas del Lab' });
});


module.exports = router;

