const express = require('express');
const router = express.Router();

const clientApiController = require('../api/ClientAPI');

router.get('/', clientApiController.getClients);
router.post('/', clientApiController.addClient);

module.exports = router;