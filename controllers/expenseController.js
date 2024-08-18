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
      console.log(`Attempting to delete expense with ID: ${req.params.id}`);
      
      const expense = await Expense.findById(req.params.id);
      if (!expense) {
        console.log('Expense not found');
        return res.status(404).json({ error: 'Expense not found' });
      }
  
      await Expense.deleteOne({ _id: req.params.id });
      console.log('Expense removed');
      res.status(200).json({ message: 'Expense removed' });
    } catch (err) {
      console.error('Error in deleteExpense:', err);
  
      if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid Expense ID format' });
      }
      res.status(500).json({ error: 'Server Error' });
    }
  };
