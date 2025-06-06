const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const tasksRoutes = require('./routes/tasksRoutes');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(tasksRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
