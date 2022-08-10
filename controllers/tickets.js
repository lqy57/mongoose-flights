const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create,
}

function newTicket(req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        Ticket.find({flight: flight._id}, function (err, tickets) {
            res.render('tickets/new', {title: 'Add Ticket', tickets, flight})
        })
    })
}

function create (req, res) {
    req.body.flight=req.params.id;
    Flight.findById(req.params.id, function (err, flight) {
        Ticket.create(req.body, function(err) {
            if (err) return res.render('tickets/new');
            res.redirect(`/flights/${flight._id}`);
        });
    });
};
