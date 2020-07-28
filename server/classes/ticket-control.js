const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        let data = require('../data/data.json');
        this.tickets = [];
        this.ultimos4 = [];

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo++;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //Elimina primer elemento
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4.unshift(atenderTicket); //Lo agrega al inicio del arreglo

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1)//Borra el ultimo elemento
        }

        this.grabarArchivo();
        return atenderTicket;

    }

    getUltimos4() {
        return this.ultimos4;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    reiniciarConteo() {
        console.log('Reiniciar conteo');
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            "ultimo": this.ultimo,
            "hoy": this.hoy,
            "tickets": this.tickets,
            "ultimos4": this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}