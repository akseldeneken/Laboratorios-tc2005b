const express = require('express');
const router = express.Router();
const controller = require('../controllers/videojuegosController');
const isAuth = require('../middleware/is-auth');


router.get('/', isAuth, controller.getList);
router.get('/add', isAuth, controller.getAdd);
router.post('/add', isAuth, controller.postAdd);
router.get('/videojuegos/:id', isAuth, controller.getById);
router.post('/update', isAuth, controller.update);
router.get('/preguntas', isAuth, controller.getQuestions);


module.exports = router;
