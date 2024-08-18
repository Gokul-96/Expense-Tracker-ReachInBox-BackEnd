const express = require('express');

const { getExpenses, addExpense, deleteExpense } = require('../controllers/expenseController');
const router = express.Router();


router.route('/').get(getExpenses).post(addExpense);
router.route('/:id').delete(deleteExpense);

module.exports = router;