const User = require('../models/user');
const bcrypt = require('bcryptjs');
const db = require('../util/database');

exports.getRegister = (req, res) => {
  res.render('register', { 
    errorMessage: null,
    csrfToken: req.csrfToken()
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
  res.render('login', { errorMessage: null, csrfToken: req.csrfToken() });
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await User.findByUsername(username);
    if (rows.length === 0) {
      return res.render('login', { errorMessage: 'Usuario no encontrado' });
    }

    const user = rows[0];
    console.log('USER:', user);
    const doMatch = await bcrypt.compare(password, user.contrasena);

    if (!doMatch) {
      return res.render('login', { errorMessage: 'Contraseña incorrecta' });
    }

    // Obtener roles
    const [roles] = await db.query(`
      SELECT r.descripcion FROM roles r
      JOIN usuarios_roles ur ON r.id = ur.id_rol
      WHERE ur.id_usuario = ?
    `, [user.id]);

    // Obtener permisos
    const [permisos] = await db.query(`
      SELECT p.privilegio, p.accion FROM privilegios p
      JOIN roles_privilegios rp ON p.id = rp.id_privilegio
      JOIN usuarios_roles ur ON rp.id_rol = ur.id_rol
      WHERE ur.id_usuario = ?
    `, [user.id]);

    // Guardar en sesión
    req.session.isLoggedIn = true;
    req.session.user = {
      id: user.id,
      nombre: user.nombre,
      permisos: permisos,
      roles: roles.map(r => r.descripcion)
    };

    req.session.save(err => {
      console.log('SESION:', req.session.user);
      res.redirect('/');
    });

  } catch (err) {
    console.log(err);
    res.render('login', { errorMessage: 'Error en login' });
  }
};

exports.postLogout = (req, res) => {
  req.session.destroy(err => {
    res.redirect('/login');
  });
};
