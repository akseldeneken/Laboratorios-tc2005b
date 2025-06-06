const { moveCursor } = require("readline");

function mostrarTema(tema) {
    console.log(`Estoy aprendiendo ${tema}`)
}

setTimeout(mostrarTema, 1000, 'node.js'); 

function suma(a, b) {
    console.log(a + b)
}

setTimeout(suma, 3000, 3, 4);

console.log('Antes de setinmmim');
setImmediate(mostrarTema, 'node.js');
console.log('depuescito de setinmmim');

setInterval(mostrarTema, 2000, 'node.js');

setInterval(suma, 2000, 2, 2);