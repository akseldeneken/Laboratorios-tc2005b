const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const homeRoutes = require('./routes/home');
const formRoutes = require('./routes/formulario');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(homeRoutes);
app.use(formRoutes);


app.use((req, res) => {
    res.status(404).send('<h1>404 - Página no encontrada</h1>');
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
