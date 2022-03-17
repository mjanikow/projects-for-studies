const express = require('express');
const router = express.Router();

const reservationApiController = require('../api/ReservationAPI');

router.get('/', reservationApiController.getReservations);
router.get('/freeTables/:reservationTimeData', reservationApiController.getFreeTables);
router.get('/reservedTables/:reservationTimeData', reservationApiController.getReservedTables);
router.get('/:reservationId', reservationApiController.getReservationById);
router.post('/', reservationApiController.addReservation);
router.post('/add', reservationApiController.addReservation);
router.delete('/:reservationId', reservationApiController.deleteReservation);



module.exports = router;