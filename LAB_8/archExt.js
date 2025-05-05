const fs = require('fs');

function writeFile(text) {
    fs.writeFileSync('salida.txt', text);
    console.log(`El texto "${text}" fue guardado en salida.txt`)
}

writeFile('Holaaa, este texto se va a aguardar adentro de salida.txt, a hvo que si');