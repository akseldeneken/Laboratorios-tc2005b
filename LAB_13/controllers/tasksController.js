const Task = require('../models/Task');

exports.getAddTask = (req, res) => {
    res.render('add', { title: 'Agregar tarea' });
};

exports.postAddTask = (req, res) => {
    const nuevaTarea = new Task(req.body.title, req.body.desc);
    nuevaTarea.save();
    res.redirect('/');
};

exports.getTasks = (req, res) => {
    const tareas = Task.fetchAll();
    res.render('list', { tareas, title: 'Lista de tareas' });
};

exports.searchTasks = (req, res, next) => {
    const query = req.query.query || '';
    const tareasFiltradas = Task.searchByTitle(query);
    res.render('list', {
        title: 'Resultados',
        tareas: tareasFiltradas
    });
};
