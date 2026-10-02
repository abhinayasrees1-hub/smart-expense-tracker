const express = require("express");

const router = express.Router();

const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");




// REGISTER

router.post("/register", async(req,res)=>{


try{


const {

name,

email,

password

}=req.body;



const exists = await User.findOne({

email

});



if(exists){


return res.status(400).json({

message:"User already exists"

});


}




const hashedPassword = await bcrypt.hash(

password,

10

);




const user = new User({


name,


email,


password:hashedPassword



});





await user.save();





res.json({

message:"Registered successfully"

});



}

catch(err){


res.status(500).json({

message:err.message

});


}


});









// LOGIN

router.post("/login",async(req,res)=>{


try{


const {

email,

password

}=req.body;





const user = await User.findOne({

email

});




if(!user){


return res.status(400).json({

message:"User not found"

});


}





const checkPassword = await bcrypt.compare(

password,

user.password

);





if(!checkPassword){


return res.status(400).json({

message:"Invalid password"

});


}






const token = jwt.sign(

{

id:user._id.toString()

},


process.env.JWT_SECRET,


{

expiresIn:"7d"

}

);





res.json({

token,


user:{


id:user._id,

name:user.name,

email:user.email


}



});



}



catch(err){


res.status(500).json({

message:err.message

});


}



});









// GET PROFILE

router.get("/profile",auth,async(req,res)=>{


try{


const user = await User.findById(

req.user.id

).select("-password");





res.json(user);



}

catch(err){


res.status(500).json({

message:err.message

});


}



});









// UPDATE PROFILE

router.put("/profile",auth,async(req,res)=>{


try{


const user = await User.findById(

req.user.id

);




if(!user){


return res.status(404).json({

message:"User not found"

});


}






user.name=req.body.name;


user.email=req.body.email;






await user.save();






res.json({

message:"Profile updated successfully",


user:{


id:user._id,


name:user.name,


email:user.email


}


});




}



catch(err){


console.log(err);


res.status(500).json({

message:err.message

});


}



});






module.exports = router;