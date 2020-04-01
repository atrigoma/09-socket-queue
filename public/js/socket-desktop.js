var socket = io();

// Los eventos "on" son para escuchar sucesos
socket.on('connect', function(){
    console.log("Connect to the server!!!");
});

socket.on('disconnect', function(){
    console.log("Disconnect to the server!!!");
});


// Captura los parámetros que llegan en la URL.
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location='index.html';
    throw new Error('Desktop is mandatory');
}

var desktop = searchParams.get('escritorio');
console.log(desktop);

$('h1').text('Escritorio: ' + desktop);

$('button').on('click', function(){

    socket.emit('attendTicket',{desktop: desktop}, function(resp) {
        console.log(resp);
        if (resp.number){

            $('small').text(resp.number);
        }
        else{
            alert('There isnt any ticket');
        }
    });


})
