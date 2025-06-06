const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const app = express();

const authRoutes = require('./routes/auth');
const videojuegosRoutes = require('./routes/videojuegos');

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));


app.use(session({
  secret: 'tu-secreto-aleatorio',
  resave: false,
  saveUninitialized: false
}));


const csrfProtection = csrf();
app.use(csrfProtection);


app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(authRoutes);
app.use(videojuegosRoutes);

app.listen(3000);
