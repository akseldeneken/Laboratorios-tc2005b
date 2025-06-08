const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const ajaxRoutes = require('./routes/ajaxRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', ajaxRoutes);

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
