const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const router = require('./routes/mainRoutes.js');
const routerDiff = require('./routes/diffRoutes.js');


app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', router);
app.use('/tasks', routerDiff);

const PORT = 3000;

app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

app.listen(PORT, () => {
    console.log(`Server is listening in ${PORT}`);
});
