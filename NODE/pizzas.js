const estatusPedido = () => {
    const estatus = Math.random() < 0.8;
    return estatus;
}

const miPedidoDePizza = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (estatusPedido()) {
            resolve('Pedido Exitoso!');
        } else {
            reject('Ocurrió un error pendejito');
        }
    }, 3000);
});



miPedidoDePizza
    .then((mensajeDeConfirmacion) => {
        console.log(mensajeDeConfirmacion);
    })
    .catch((mensajeError) => {
        console.log(mensajeError);
    })