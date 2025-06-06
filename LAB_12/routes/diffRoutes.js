const express = require('express');
const routerDiff = express.Router();
const path = require('path');
const fs = require('fs');

routerDiff.post('/new', (req, res) => {
    const { title, desc } = req.body;
    const texto = `Título: ${title}\nDescripción: ${desc}\n---\n`;

    fs.appendFileSync('tasks.txt', texto);
    res.redirect('/tasks');
});

routerDiff.get('/', (req, res) => {
    let tareas = [];

    try {
        const data = fs.readFileSync('tasks.txt', 'utf8');
        tareas = data.trim().split('---\n').filter(t => t).map(t => {
            const [titulo, descripcion] = t.split('\n');
            return {
                title: titulo.replace('Título: ', ''),
                desc: descripcion.replace('Descripción: ', '')
            };
        });
    } catch (err) {
        tareas = [];
    }

    res.render('tasks', { tareas, title: 'Tareas' });

});


module.exports = routerDiff;