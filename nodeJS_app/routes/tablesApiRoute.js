const express = require('express');
const router = express.Router();

const tableApiController = require('../api/TableAPI');

router.get('/', tableApiController.getTables);
router.get('/:tableId', tableApiController.getTableById);
router.post('/', tableApiController.addTable);
router.put('/:tableId', tableApiController.updateTable);
router.delete('/:tableId', tableApiController.deleteTable);


module.exports = router;