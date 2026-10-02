const Expense = require("../models/Expense");
const addExpense = async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save();
        res.json({
            message: "Expense Added Successfully"
        });
    } 
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const getExpenses = async (req, res) => {
    console.log("GET/api/expense HIT");
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } 
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};
const deleteExpense = async (req, res) => {

    try {

        await Expense.findByIdAndDelete(req.params.id);


        res.json({

            message: "Expense Deleted Successfully"

        });

    } 
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

const updateExpense = async (req, res) => {

    try {

        await Expense.findByIdAndUpdate(
            req.params.id,
            req.body
        );


        res.json({

            message: "Expense Updated Successfully"

        });

    } 
    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    addExpense,
    getExpenses,
    deleteExpense,
    updateExpense

};