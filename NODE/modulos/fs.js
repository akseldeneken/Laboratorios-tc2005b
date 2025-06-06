const fs = require('fs');

fs.readFileSync('index.html', 'utf-8', (err, contenido) => {
    if (err) {
        throw err;
    }
    console.log(contenido);
});

fs.renameSync('main.html', 'hola.html', (err) => {
    if (err) {
        throw err;
    }
    console.log('Nombre cambiado exitosamente');
});

fs.appendFile('main.html', '<p>Hol, mi nomre es drupi!</p>', (err) => {
    if (err) {
        throw err;
    }
    console.log('Archivo actualizado')
});

fs.writeFile('main.html', 'Contenido nuevoooo wuuwuwu', (err) => {
    if (err) {
        throw err;
    }
    console.log('Contenido reemplazado')
});

fs.unlink('main.html', (err) => {
    if (err) {
        throw err;
    }
    console.log('Archivo Eliminado');
});