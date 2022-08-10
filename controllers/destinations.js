const Flight = require('../models/flight');

module.exports = {
    create,
    delete: deleteDest
};

function create(req, res) {
    if (!req.body.arrival) delete req.body.arrival;
    Flight.findById(req.params.id, function(err, flight) {
        flight.destinations.push(req.body);
        flight.save(function(err) {
            res.redirect(`/flights/${flight._id}`);
        });
    });
};

function deleteDest(req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        const idx = flight.destination.findIndex(dest => dest._id == req.params.destid)
        flight.destination.splice(idx, 1)
        flight.save(function (err) {
            res.redirect(`/flights/${flight._id}`)
        });
    });
};