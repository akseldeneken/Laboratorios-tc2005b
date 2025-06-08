const express = require('express');
const bodyParser = require('body-parser');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/', gameRoutes);

app.listen(3000, () => {
  console.log('Batalla Naval API corriendo en http://localhost:3000');
});
