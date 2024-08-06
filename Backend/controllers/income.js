const IncomeSchema = require('../models/incomeModel');

exports.addIncome = async (req, res) => {
    const {userId,title, amount, category, description, date } = req.body;

    // Create a new instance of the income model
    const income = new IncomeSchema({
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

        // Save the income to the database
        await income.save();
        res.status(200).json({ message: 'Income added!' });
    } catch (error) {
        // Enhanced error handling
        console.error("Error adding income:", error.message); // Log only the error message for clarity
        res.status(500).json({ message: "Server Error. Please try again later.", error: error.message });
    }

    // Optional: Debugging
    console.log(income);
};


exports.getIncome = async (req, res) => {
    const {userId} = req.params;
    try {
        const incomes = await IncomeSchema.find({userId}).sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({ message: "Server Error. Please try again later.", error: error.message });
    }
}

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ message: 'Income deleted!' });
        })
        .catch((error) => {
            res.status(500).json({ message: "Server Error. Please try again later.", error: error.message });
        })
}