const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const videojuegosRoutes = require('./routes/videojuegos');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(videojuegosRoutes);

app.listen(3000);
