const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);
router.post('/set-cookie', mainController.setCookie);
router.get('/read-cookie', mainController.readCookie);
router.get('/set-session', mainController.setSession);
router.get('/read-session', mainController.readSession);
router.get('/logout', mainController.logout);
router.get('/preguntas', (req, res) => {
    res.render('preguntas', {
        title: 'Preguntas del Lab 14'
    });
});

module.exports = router;
