const fs = require('fs');

const MAX_ATTENDED_TICKETS = 4;

class Ticket {
    // Cada ticket tiene un número y es atendido en un escritorio.
    constructor (number, desktop){
        this.number=number;
        this.desktop=desktop;
    }
}

class TicketControl {

    constructor (){
        console.log('Dentro constructor ticket-control');
        this.last = 0;
        this.today = new Date().getDate();

        // Array to contain each ticket dont manage.
        this.tickets =[];

        // Array to contain the tickets are being attended
        this.attendedTickets = [];
        let data = require('../data/data.json');

        console.log(this.today);
        console.log(data);



        if (data.today === this.today){
            console.log('constructor ticket-control. misma fecha: ', data.today);
            this.tickets = data.tickets;
            this.attendedTickets= data.attendedTickets;
            this.last = data.last;
        }
        else{
            console.log('constructor ticket-control. misma fecha: ', data.today);
            this.resetData ();
        }

        console.log(data);
    }

    getCurrentTicket() {

        return `Ticket: ${this.last}`;
    }

    getAttendedTickets() {
        return this.attendedTickets;
    }


    nextTicket () {
        console.log('nextTicket: ',  this.last);
        this.last +=1 ;

        // En el momento de la creación del ticket, no se conoce el escritorio que lo va a atender
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveData();
        return this.getCurrentTicket();
        //return `Ticket: ${this.last}`;
    }

    attendTicket ( desktop) {
        if (this.tickets.length === 0) {
            return false;
        }
        else{
            let numberTicket = this.tickets[0].number;
            // Delete the first element
            this.tickets.shift();

            let attendedTicket = new Ticket(numberTicket,desktop);

            // El comando unshift lo que hace es incluir el objeto al inicio del array. 
            // En este caso, el objeto attendedTicket lo pone el primero del array
            this.attendedTickets.unshift(attendedTicket);

            if (this.attendedTickets.length > MAX_ATTENDED_TICKETS) {
                let ticket = this.attendedTickets.pop();
                // Otra forma de borrar el último registro que indican en el curso:
                // this.attendedTickets.splice(-1,1);

                console.log(ticket);
            }

            this.saveData();

            // Devolvemos el ticket a atender
            return attendedTicket;
        }
    }

    resetData (){
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets=[];

        this.saveData();
    }

    saveData (){

        let jsonData = { 
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            attendedTickets: this.attendedTickets
        }
console.log('***** SAVE DATA *****');
console.log(jsonData);
console.log('*********************');
        let jsonDataString = JSON.stringify(jsonData);
        //fs.writeFileSync('../data/data.json',jsonDataString);
        fs.writeFileSync('./server/data/data.json',jsonDataString);
    }
}

module.exports = {
    TicketControl
}