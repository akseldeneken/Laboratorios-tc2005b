const Videojuego = require('../models/videojuego');

exports.getAdd = (req, res) => {
    res.render('add.ejs');
};

exports.postAdd = (req, res) => {
    const videojuego = new Videojuego(req.body.nombre, req.body.plataforma);
    videojuego.save()
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
};

exports.getById = (req, res) => {
    const id = req.params.id;
    Videojuego.findById(id)
        .then(([rows]) => {
            console.log('Llamando a render edit.ejs');
            if (rows.length > 0) {
                res.render('edit.ejs', { videojuego: rows[0] });
            } else {
                res.send('Videojuego no encontrado');
            }
        })
        .catch(err => console.log(err));
};



exports.update = (req, res) => {
    const { id, nombre, plataforma } = req.body;
    Videojuego.update(id, nombre, plataforma)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
};


exports.getList = (req, res) => {
    Videojuego.fetchAll()
        .then(([rows]) => {
            res.render('list.ejs', { videojuegos: rows });
        })
        .catch(err => console.log(err));
};

exports.update = (req, res) => {
    const { id, nombre, plataforma } = req.body;
    Videojuego.update(id, nombre, plataforma)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
};
