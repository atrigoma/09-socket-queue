var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];


socket.on('getCurrentTicket', function(resp) {
    let attendedTickets = resp.attendedTickets;
    updateHTML(attendedTickets);
});

socket.on('getAttendedTickets', function(attendedTickets) {

    var audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    updateHTML(attendedTickets);
});


function updateHTML (attendedTickets){

    console.log('Dentro de updateHTML');
    console.log(attendedTickets.length);
    for (var i=0; i <= (attendedTickets.length-1); i++ ){
        console.log('Dentro bucle ' + i);
        lblTickets[i].text('Ticket: ' + attendedTickets[i].number);
        lblEscritorios[i].text('Escritorio: ' + attendedTickets[i].desktop);
    }
}