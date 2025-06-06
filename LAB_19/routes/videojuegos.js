const express = require('express');
const router = express.Router();
const controller = require('../controllers/videojuegosController');
const isAuth = require('../middleware/is-auth');
const checkPermiso = require('../middleware/checkPermiso');

router.get('/', isAuth, checkPermiso('videojuegos', 'ver'), controller.getList);
router.get('/add', isAuth, checkPermiso('videojuegos', 'crear'), controller.getAdd);
router.post('/add', isAuth, checkPermiso('videojuegos', 'crear'), controller.postAdd);
router.get('/videojuegos/:id', isAuth, checkPermiso('videojuegos', 'ver'), controller.getById);
router.post('/update', isAuth, checkPermiso('videojuegos', 'editar'), controller.update);
router.get('/preguntas', isAuth, checkPermiso('videojuegos', 'ver'), controller.getQuestions);

module.exports = router;
