//Comando para establecer la conexión
var socket = io();
var searcParams = new URLSearchParams(window.location.search);
var label = $('small');

if (!searcParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario')
}

var escritorio = searcParams.get('escritorio');
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function () {
    socket.emit('atenderTicket', {escritorio: escritorio}, function (respuesta) {

        if (respuesta === 'No hay tickets') {
            label.text(respuesta);
            alert(respuesta);
            return;
        }

        label.text(respuesta.numero);
    });

});


socket.on('connect', function () {
    console.log('Usuario conectado');
});

socket.on('disconnect', function () {
    console.log('Perdimos conexión con el servidor');
});
