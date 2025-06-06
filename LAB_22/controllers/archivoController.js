exports.getFormulario = (req, res) => {
  res.render('subir', { imagen: null });
};

exports.postArchivo = (req, res) => {
  const ruta_archivo = req.file?.path;
  console.log('Archivo subido:', ruta_archivo);

  res.render('subir', { imagen: ruta_archivo });
};
