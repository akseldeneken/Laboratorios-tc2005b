const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'loquesea123',
    resave: false,
    saveUninitialized: false
}));

const homeRoutes = require('./routes/homeRoutes');
app.use(homeRoutes);

const mainRoutes = require('./routes/mainRoutes');
app.use(mainRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
