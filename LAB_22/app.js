const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const archivoController = require('./controllers/archivoController');

const app = express();

// Configuración de almacenamiento
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

// Filtro de tipos de archivos
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('archivo'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', 'views');

// Rutas
app.get('/', archivoController.getFormulario);
app.post('/archivo', archivoController.postArchivo);

// Servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
