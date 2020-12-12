var express = require('express');
var router = express.Router();
const savingController = require('../controllers/saving.controller');

router.post('/create', savingController.create);

module.exports = router;