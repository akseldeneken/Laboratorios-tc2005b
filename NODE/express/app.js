const express = require('express');
const app = express();

const routerMatematicas = require('./routers/matematicas.js');
const {infoCursos} = require('./cursos/cursos.js');
const routerProgramacion = require('./routers/programacion.js');

app.use('/api/cursos/programacion', routerProgramacion);


app.use('/api/cursos/matematicas', routerMatematicas);

app.get('/', (req, res) => {
    res.send('Mi primer servidor');
});

app.get('/api/cursos', (req, res) => {
    res.send(JSON.stringify(infoCursos));
});


const PUERTO = 3000; // process.env.PORT

app.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`)
});

