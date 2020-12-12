var express = require('express');
var router = express.Router();
const incomeController = require('../controllers/income.controller');

router.post('/create', incomeController.create);

module.exports = router;