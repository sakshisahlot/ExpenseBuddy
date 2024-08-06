const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const {addIncome, getIncome, deleteIncome} = require('../controllers/income')
const router = require('express').Router();


router.post('/add-income/:userId', addIncome)
    .get('/get-incomes/:userId',getIncome)
    .delete('/delete-income/:id',deleteIncome)
    .post('/add-expense/:userId',addExpense)
    .get('/get-expenses/:userId', getExpense)
    .delete('/delete-expense/:id', deleteExpense)

module.exports = router;