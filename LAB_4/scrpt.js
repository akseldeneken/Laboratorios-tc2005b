
document.addEventListener('DOMContentLoaded', () => {
    let cuad = 1;
    let cub = 1;
    const num = Number(prompt('Escribe un número'));
    document.write('<link href="styles.css" rel="stylesheet">')
    document.write('<h1>Ejercicio 1</h1>')
    document.write('<table class="tabla">');
    document.write('<thead><tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr></thead>')
    document.write('<tbody>')
    for (let i = 1; i <= num; i++){
        cuad = Math.pow(i, 2);
        cub = Math.pow(i, 3);
        document.write(`<tr><td>${i}</td> <td>${cuad}</td> <td>${cub}</td></tr>`);
    }
    document.write('</tbody></table>')


    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    let num1 = getRandomInt(10);
    let num2 = getRandomInt(10);
    let suma = num1 + num2;
    const start = Date.now();
    const res = Number(prompt(`${num1} + ${num2} ¿Cuál es la respuesta?`))
    const time = Date.now() - start;
    document.write('<h1>Ejercicio 2</h1>')
    document.write(`<p>La suma: ${num1} + ${num2}</p>`)
    document.write(`<p>Tardaste ${time/1000} segundos en responder.</p>`)
    if (suma == res) {
        document.write(`<p>Tu respuesta: ${res} es CORRECTA</p>`)
    }else{
        document.write(`<p>Tu respuesta: "${res}" es INCORRECTA. La respuesta correcta es ${suma}</p>`)
    }

    const list = [-2,0,4,-5,3]
    let negativos = 0;
    let positivos = 0;
    let ceros = 0;
    list.forEach((n) => {
        if (n > 0) positivos++;
        else if (n === 0) ceros++;
        else negativos++;
    });
    document.write("<h1>Ejercicio 3</h1>")
    document.write(`<p>El arreglo es ${list}</p>`)
    document.write(`<p>Este arreglo cuenta con ${positivos} números positivos, ${ceros} cero/s y ${negativos} números negativos</p>`)


    const matriz = [
        [10, 20, 30],
        [5, 15, 25, 35],
        [100, 200]
      ];
    
    const avg = [];
      
    matriz.forEach((n) => {
        let count = 0;
        let sum = 0;
        n.forEach((i) => {
            count++;
            sum = sum + i;
        })
        avg.push(sum/count);
      })
    document.write("<h1>Ejercicio 4</h1>")
    document.write(`<p>El arreglo es ${matriz}</p>`)
    document.write(`<p>Y el arreglo de promedios es ${avg}</p>`)


    document.write("<h1>Ejercicio 5</h1>")
    let large = prompt('Escribe un número largo');
    document.write(`<p>El número inicial es ${large}</p>`)
    let array = large.split('');
    array.reverse();
    let invertido = array.join('');
    let invertidoNum = Number(invertido)
    document.write(`<p>El número invertido es ${invertidoNum}</p>`)

    document.write("<h1>Ejercicio 6</h1>")

    class Disco {
        constructor(nombre, artista, numCanciones) {
            this.nombre = nombre;
            this.artista = artista;
            this.numCanciones = numCanciones;
        }

        descripcion() {
            return `El disco "${this.nombre}" de ${this.artista} tiene ${this.numCanciones} canciones.`;
        }

        duracionTotal() {
            return this.numCanciones * 3.5;
        }
    }

    let nombreDisco = prompt('¿Cómo se llama el disco?');
    let artistaDisco = prompt('¿Quién es el artista?');
    let cancionesDisco = Number(prompt('¿Cuántas canciones tiene el disco?'));

    const miDisco = new Disco(nombreDisco, artistaDisco, cancionesDisco);

    document.write(`<p>${miDisco.descripcion()}</p>`);
    document.write(`<p>Duración aproximada del disco: ${miDisco.duracionTotal()} minutos</p>`);


});

