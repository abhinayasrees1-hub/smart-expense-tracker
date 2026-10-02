import { useState } from "react";
import axios from "axios";

function AddExpense({ refresh }) {

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");

    const token = localStorage.getItem("token");


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:5000/api/expenses",
                {
                    title,
                    amount,
                    category,
                    date: new Date()
                },
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            alert("Expense Added Successfully");

            setTitle("");
            setAmount("");
            setCategory("");

            refresh(); // reload dashboard

        }
        catch (error) {
            console.log(error);
            alert("Error adding expense");
        }
    };


    return (

        <div className="add-expense">

            <h2>Add Expense</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                </select>

                <button type="submit">
                    Add Expense
                </button>

            </form>

        </div>

    );
}

export default AddExpense;