const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

router.get('/add', tasksController.getAddTask);
router.post('/add', tasksController.postAddTask);
router.get('/', tasksController.getTasks);
router.get('/search', tasksController.searchTasks);
router.get('/preguntas', (req, res) => {
    res.render('preguntas');
});


module.exports = router;
