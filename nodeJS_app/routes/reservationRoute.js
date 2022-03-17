const express = require('express');
const router = express.Router();

const reservationControler = require('../controllers/reservationController');

router.get('/succes', reservationControler.showAddReservationSuccess);
router.get('/contact', reservationControler.showContact);
router.get('/delete/:reservationId', reservationControler.showDeleteReservationForm);
router.get("/delete/confirm/:reservationId", reservationControler.delete);
router.get('/deleteSucces', reservationControler.showDeleteReservationFormSucces);
router.get('/add/:newReservationData', reservationControler.showAddReservationForm);
router.get('/', reservationControler.showReservationList);
router.get('/details/:reservationId', reservationControler.showReservationDetails);
router.get('/search/:reservationTimeData', reservationControler.showReservationSearchResults);
router.post('/add/:value', reservationControler.addReservation);



module.exports = router;