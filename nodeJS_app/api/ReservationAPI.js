const { response } = require('../app');
const ReservationRepository = require('../repository/mysql2/ReservationRepository');

exports.getReservations = (req, res, next) => {
    ReservationRepository.getReservations()
        .then(reservations => {
            res.status(200).json(reservations);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getReservationById = (req, res, next) => {
    const reservationId = req.params.reservationId;
    ReservationRepository.getReservationById(reservationId)
        .then(reservation => {
            if (!reservation)
                res.status(404).json({
                    message: 'Reservation with id: ' + reservationId + ' not found'
                })
            else {
                res.status(200).json(reservation);
            }
        })
}

exports.addReservation = (req, res, next) => {
    ReservationRepository.addReservation(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deleteReservation = (req, res, next) => {
    const reservationId = req.params.reservationId;
    ReservationRepository.deleteReservation(reservationId)
        .then(result => {
            res.status(200).json({ message: 'Removed reservation.', reservation: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getReservedTables = (req, res, next) => {
    const reservationTimeData = req.params.reservationTimeData;
    ReservationRepository.getReservedTables(reservationTimeData)
        .then(tables => {
            res.status(200).json(tables);
        })
        .catch(err => {
            console.log(err);
        })
}
exports.getFreeTables = (req, res, next) => {
    const reservationTimeData = req.params.reservationTimeData;
    ReservationRepository.getFreeTables(reservationTimeData)
        .then(tables => {
            res.status(200).json(tables);
        })
        .catch(err => {
            console.log(err);
        })
}