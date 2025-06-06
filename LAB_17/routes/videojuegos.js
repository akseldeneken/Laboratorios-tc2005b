const express = require('express');
const router = express.Router();
const controller = require('../controllers/videojuegosController');

router.get('/', controller.getList);
router.get('/add', controller.getAdd);
router.post('/add', controller.postAdd);
router.get('/videojuegos/:id', controller.getById);  // ← esta es la importante
router.post('/update', controller.update);
router.get('/preguntas', controller.getQuestions);

module.exports = router;
