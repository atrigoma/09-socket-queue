var socket = io();
var labelTicket = $('#lblNuevoTicket');

// Los eventos "on" son para escuchar sucesos
socket.on('connect', function(){
    console.log("Connect to the server!!!");
});

socket.on('disconnect', function(){
    console.log("Disconnect to the server!!!");
});

socket.on('getCurrentTicket', function(resp) {
    console.log(resp);
    labelTicket.text(resp.currentTicket);
});

// Desarrollo en JQuery para coger los eventos de todos los botones

$('button').on('click', function(){
    console.log('evento click');

    // El parámetro que ponemos como "null", es dónde pondríamos los datos que quisieramos enviar, que en este caso no es así.
    // Y el tercer parámetro es el callback
    socket.emit('nextTicket',null, function(newTicket) {
        console.log(newTicket);
        labelTicket.text(newTicket);
    });
    

})