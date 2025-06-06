const http = require('http');

const servidor  = http.createServer((req, res) => {
    console.log('===> res (Solicitud');
    
    res.setHeader('content-type', 'application/json');
    console.log(res.getHeaders());

    res.end('Holaaa')
});

const puerto = 3000;
servidor.listen(puerto, () => {
    console.log(`El servidor esta escuchando en el puerto ${puerto}`)
});