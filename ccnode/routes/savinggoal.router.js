var express = require('express');
var router = express.Router();
const savinggoalController = require('../controllers/savinggoal.controller');

router.post('/create', savinggoalController.create);
router.post('/adduser', savinggoalController.addUser);

module.exports = router;