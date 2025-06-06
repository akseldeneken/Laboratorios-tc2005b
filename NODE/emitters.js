const EventEmitter = require('events');

// console.log(EventEmitter);

const emisorProductos = new EventEmitter();

emisorProductos.on('compra', (total, numProductos) => {
    console.log(`Se realizó una compra por $${total}`);
    console.log(`Numero de productos: ${numProductos}`);
});

emisorProductos.emit('compra', 500, 2);
