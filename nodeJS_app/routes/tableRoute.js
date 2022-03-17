const express = require('express');
const router = express.Router();

const tableController = require('../controllers/tableController');


router.get('/delete/:tableId', tableController.DeleteTable);
router.get('/add', tableController.AddTableForm);
router.get('/addSucces', tableController.AddTableFormSucces);
router.get('/edit/:tableId', tableController.EditTableForm);
router.get('/editSucces', tableController.EditTableSucces);
router.get('/deleteSucces', tableController.DeleteTableSucces);
router.get('/details/:tableId', tableController.DetailsTable);
router.get('/', function (req, res, next) {
    res.render('pages/administrationSide/reservationList_adm', { navLocation: 'reservation' });
});

router.post("/add", tableController.addTable);
router.post("/edit/:tableId", tableController.updateTable);
router.get("/delete/confirm/:tableId", tableController.delete);



module.exports = router;