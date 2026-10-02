const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
require("dotenv").config();


const app=express();


app.use(cors());

app.use(express.json());



// routes

const authRoutes=require("./routes/authRoutes");
const expenseRoutes=require("./routes/expenseRoutes");
const userRoutes=require("./routes/user");



app.use("/api/auth",authRoutes);

app.use("/api/expenses",expenseRoutes);

app.use("/api/user",userRoutes);





app.get("/",(req,res)=>{

res.send("Server is running");

});





mongoose.connect(process.env.MONGO_URI)

.then(()=>{


console.log("MongoDB connected");



app.listen(5000,()=>{


console.log("Server running on port 5000");


});


})


.catch(err=>{


console.log(err);


});