const express = require("express");

const router = express.Router();


const Expense = require("../models/Expense");

const auth = require("../middleware/auth");





// GET ALL EXPENSES

router.get("/", auth, async(req,res)=>{


try{


const expenses = await Expense.find({

user:req.user.id

}).sort({

date:-1

});



res.json(expenses);



}

catch(err){


console.log("GET ERROR:",err);


res.status(500).json({

message:err.message

});


}



});









// ADD EXPENSE

router.post("/add", auth, async(req,res)=>{


try{


console.log("USER FROM AUTH:",req.user);





if(!req.user || !req.user.id){


return res.status(401).json({

message:"User authentication failed"

});


}






const expense = new Expense({



user:req.user.id,



title:req.body.title,



category:req.body.category,



amount:Number(req.body.amount),



date:req.body.date



});






console.log("EXPENSE BEFORE SAVE:",expense);





const savedExpense = await expense.save();





res.status(201).json(savedExpense);



}



catch(err){


console.log("ADD EXPENSE ERROR:",err);



res.status(500).json({

message:err.message

});


}



});









// UPDATE EXPENSE


router.put("/:id",auth,async(req,res)=>{


try{


const expense = await Expense.findById(

req.params.id

);




if(!expense){


return res.status(404).json({

message:"Expense not found"

});


}





expense.title=req.body.title;


expense.category=req.body.category;


expense.amount=Number(req.body.amount);


expense.date=req.body.date;





await expense.save();





res.json(expense);



}



catch(err){


console.log("UPDATE ERROR:",err);



res.status(500).json({

message:err.message

});


}



});









// DELETE EXPENSE


router.delete("/:id",auth,async(req,res)=>{


try{


await Expense.findByIdAndDelete(

req.params.id

);



res.json({

message:"Expense deleted"

});



}



catch(err){


console.log("DELETE ERROR:",err);



res.status(500).json({

message:err.message

});


}



});






module.exports = router;