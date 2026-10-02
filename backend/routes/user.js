const express = require("express");

const router = express.Router();

const User = require("../models/User");

const auth = require("../middleware/auth");




// Test route

router.get("/test",(req,res)=>{


res.json({

message:"User route working"

});


});






// Get profile

router.get("/profile",auth,async(req,res)=>{


try{


const user = await User.findById(

req.user.id || req.user._id

);



if(!user){


return res.status(404).json({

message:"User not found"

});


}



res.json(user);



}

catch(err){


console.log(err);


res.status(500).json({

message:err.message

});


}



});









// Update category budgets

router.put("/category-budget",auth,async(req,res)=>{


try{


const user = await User.findById(

req.user.id || req.user._id

);




if(!user){


return res.status(404).json({

message:"User not found"

});


}





user.categoryBudgets = req.body;



await user.save();





res.status(200).json({


message:"Category budget updated successfully",


categoryBudgets:user.categoryBudgets


});



}



catch(err){


console.log("CATEGORY BUDGET ERROR:",err);



res.status(500).json({

message:err.message

});


}



});






module.exports = router;