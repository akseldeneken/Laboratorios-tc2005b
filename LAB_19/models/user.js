const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  save() {
    return bcrypt.hash(this.password, 12).then(hashedPassword => {
      return db.execute(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [this.username, hashedPassword]
      );
    });
  }

  static findByUsername(username) {
    return db.execute('SELECT * FROM usuarios WHERE nombre = ?', [username]);
  }
};
