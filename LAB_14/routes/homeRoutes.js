const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const cookie = req.get('Cookie');
    const sessionData = req.session.user;
    res.render('home', { title: 'Inicio', cookie, sessionData });
});

router.get('/set-cookie', (req, res) => {
    res.setHeader('Set-Cookie', 'usuario=Aksel; HttpOnly');
    res.redirect('/');
});

router.get('/read-cookie', (req, res) => {
    const cookie = req.get('Cookie');
    res.send(`Cookies del navegador: ${cookie}`);
});

router.get('/set-session', (req, res) => {
    req.session.user = {
        name: 'Aksel',
        role: 'admin'
    };
    res.redirect('/');
});

router.get('/read-session', (req, res) => {
    const user = req.session.user;
    if (user) {
        res.send(`Sesión activa: ${user.name} - ${user.role}`);
    } else {
        res.send('No hay sesión activa');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
