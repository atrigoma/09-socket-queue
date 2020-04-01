const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {


    // client.emit('enviarMensaje', {
    //     usuario: 'Administrador',
    //     mensaje: 'Bienvenido a esta aplicación'
    // });

    const ticketControl = new TicketControl();


    client.on('nextTicket', (data, callback) => {
        console.log('Dentro de socket. En evento nextTicket');
        let nextTicket= ticketControl.nextTicket();

        console.log(nextTicket);
        callback(nextTicket);
    });

    console.log('socket-server: ', ticketControl.getCurrentTicket());

    client.emit('getCurrentTicket', {
        currentTicket: ticketControl.getCurrentTicket(),
        attendedTickets: ticketControl.getAttendedTickets()
    })

    client.on('attendTicket', (data, callback) => {
console.log('*** data: ' + data);
        if (!data.desktop) {
            return callback({
                err: true,
                msg: 'Desktop is mandatory'
            });
        }

        let attendTicket = ticketControl.attendTicket(data.desktop);
        callback(attendTicket);

        client.broadcast.emit('getAttendedTickets', ticketControl.getAttendedTickets());
    
    })

});