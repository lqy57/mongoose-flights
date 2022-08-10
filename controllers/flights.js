const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
    delete: deleteFlight
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights', {flights, title: 'Flights'})
    });
};

function newFlight(req, res) {
    res.render('flights/new', {title: 'Add Flight'});
};

function create(req, res) {
    if (!req.body.departs) delete req.body.departs;
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if(err) return res.render('flights/new');
        res.redirect('/flights');
    });
};

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            res.render('flights/show', {flight, tickets});
        });
    });
};

function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id, function(err, flight) {
        if(err) return res.render('flights/new');
        res.redirect('/flights');
    });
};
