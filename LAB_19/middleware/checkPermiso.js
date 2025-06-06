module.exports = (privilegio, accion) => {
  return (req, res, next) => {
    const permisos = req.session?.user?.permisos || [];

    const tienePermiso = permisos.some(p => 
      p.privilegio === privilegio && p.accion === accion
    );

    if (!tienePermiso) {
      return res.status(403).render('403', { mensaje: 'No tienes permiso para acceder a esta función' });
    }

    next();
  };
};
