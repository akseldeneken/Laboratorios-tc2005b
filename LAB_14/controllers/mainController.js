exports.home = (req, res, next) => {
    res.render('home', {
        title: 'Inicio',
        cookie: req.get('Cookie'),
        sessionData: req.session.userData || null
    });
};

exports.setCookie = (req, res, next) => {
    res.setHeader('Set-Cookie', 'username=Aksel; HttpOnly');
    res.redirect('/');
};

exports.readCookie = (req, res, next) => {
    const cookie = req.get('Cookie') || 'No hay cookie';
    res.render('home', {
        title: 'Leer Cookie',
        cookie: cookie,
        sessionData: req.session.user
    });
};


exports.setSession = (req, res, next) => {
    req.session.userData = {
        name: 'Aksel',
        role: 'Estudiante'
    };
    res.redirect('/');
};

exports.readSession = (req, res, next) => {
    res.send(`Datos de sesión: ${JSON.stringify(req.session.userData)}`);
};

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
