const ExpenseSchema = require('../models/ExpenseModel');

exports.addExpense = async (req, res) => {
    const { userId, title, amount, category, description, date } = req.body;

    // Create a new instance of the income model
    const expense = new ExpenseSchema({
        userId,
        title,
        amount,
        category,
        description,
        date
    });

    try {
        // Validate input data
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        if (!amount === "number" || amount <= 0) {
            return res.status(400).json({ message: "Amount should be a positive number!" });
        }

        // Save the expense to the database
        await expense.save();
        res.status(200).json({ message: 'Expense added!' });
    } catch (error) {
        // Enhanced error handling
        console.error("Error adding expense:", error.message); // Log only the error message for clarity
        res.status(500).json({ message: "Server Error. Please try again later.", error: error.message });
    }

    // Optional: Debugging
    console.log(expense);
};


exports.getExpense = async (req, res) => {
    const {userId} = req.params;
    try {
        const expenses = await ExpenseSchema.find({userId}).sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({ message: "Server Error. Please try again later.", error: error.message });
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ message: 'Expense deleted!' });
        })
        .catch((error) => {
            res.status(500).json({ message: "Server Error. Please try again later.", error: error.message });
        })
}