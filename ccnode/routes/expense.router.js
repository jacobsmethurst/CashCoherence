var express = require('express');
var router = express.Router();
const expenseController = require('../controllers/expense.controller');

router.post('/create', expenseController.create);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;