var express = require('express');
var router = express.Router();
const savingController = require('../controllers/saving.controller');

router.post('/create', savingController.create);
router.delete('/:id', savingController.deleteSaving);

module.exports = router;