
function promedio(arr) {
    let sum = 0;
    arr.forEach((n) => {
        sum = sum + n;
    })
    return sum/arr.length;
};

const numeros = [1,56,23,12,1,4,5];
const resultado = promedio(numeros);

console.log(`El arreglo es ${numeros}`)
console.log(`El promedio del arreglo es ${resultado}`)

console.assert(promedio([1, 2, 3]) === 2, "Error en promedio de [1, 2, 3]");