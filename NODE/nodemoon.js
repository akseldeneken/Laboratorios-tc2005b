const http = require('http');

const servidor = http.createServer((req, res) => {
    res.end('HOLIIIIII, freeCodeCammpa');
});

const PUERTO = 3000;

servidor.listen(PUERTO, () => {
    console.log(`El servidor está escuchando en el puerto ${PUERTO}`);
})