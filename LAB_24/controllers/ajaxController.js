exports.getIndex = (req, res) => {
  res.render('index');
};

exports.postMensaje = (req, res) => {
  const mensaje = req.body.mensaje;
  res.status(200).json({ respuesta: `Servidor recibió: ${mensaje}` });
};
