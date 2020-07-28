
//Comando para establecer la conexión
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function () {
    console.log('Usuario conectado');
});

socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
});

socket.on('estadoActual', function (estadoActual) {
    label.text(estadoActual.actual);
})

$('button').on('click', function () {
    socket.emit('siguienteTicket', null, function (siguienteTicket) {
        label.text(siguienteTicket);
    });
})