const Expense = require('../models/Expense');

//Get all expenses
// @route GET /api/expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Add new expense
// @route   POST /api/expenses
exports.addExpense = async (req, res) => {
  const { amount, category, date, description } = req.body;

  try {
    const newExpense = new Expense({
      amount,
      category,
      date,
      description,
    });

    const expense = await newExpense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete Expense 
// @route DELETE /api/expenses/:id

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ error: 'No expense found' });
    }

    await expense.remove();
    res.status(200).json({ message: 'Expense removed' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};
