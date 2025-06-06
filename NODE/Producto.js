

function ordenarProducto(producto) {
    return new Promise((resolve, reject) => {
        console.log(`Ordenando: ${producto} de Picase`);
        setTimeout(() => {
            if (producto === 'taza') {
                resolve('Ordenando una taza con el logo de tu puta madre');
            } else {
                reject('Estas imbecil no existe no disponible nigg')
            }
        }, 1000);
    });
}

function procesarPedido(respuesta) {
    return new Promise(resolve => {
        console.log('Procesando respuesta...');
        console.log(`La respuesta fue "${respuesta}"`);
        setTimeout(() => {
            resolve('Gracias por tu compra bitch');
        }, 1000);
    });
}

ordenarProducto('lapiz')
.then(respuesta => {
    console.log('Respuesta recibida');
    return procesarPedido(respuesta);
})
.then(respuestaProcesada => {
    console.log(respuestaProcesada);

})
.catch(err => {
    console.log(err);
})

async function realizarPedido(producto) {
    try {
        const respuesta = await ordenarProducto(producto);
        console.log('Respuesta recibida');
        console.log(respuesta);
        const respuestaProcesada = await procesarPedido(respuesta);
        console.log(respuestaProcesada);
    } catch (err) {
        console.log(err);
    }
}

realizarPedido('taza');