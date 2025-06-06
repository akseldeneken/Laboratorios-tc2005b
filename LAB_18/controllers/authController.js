const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getRegister = (req, res) => {
  res.render('register', { 
    errorMessage: null,
    csrfToken: req.csrfToken()  // <- Agrega esto
  });
};


exports.postRegister = (req, res) => {
  const { username, password } = req.body;
  User.findByUsername(username)
    .then(([rows]) => {
      if (rows.length > 0) {
        return res.render('register', { errorMessage: 'Usuario ya existe' });
      }
      const user = new User(username, password);
      return user.save().then(() => res.redirect('/login'));
    })
    .catch(err => console.log(err));
};

exports.getLogin = (req, res) => {
  res.render('login', { errorMessage: null, csrfToken: req.csrfToken()  });
};

exports.postLogin = (req, res) => {
  const { username, password } = req.body;
  User.findByUsername(username)
    .then(([rows]) => {
      if (rows.length === 0) {
        return res.render('login', { errorMessage: 'Usuario no encontrado' });
      }
      const user = rows[0];
      bcrypt.compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              res.redirect('/');
            });
          }
          res.render('login', { errorMessage: 'Contraseña incorrecta' });
        });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res) => {
  req.session.destroy(err => {
    res.redirect('/login');
  });
};
