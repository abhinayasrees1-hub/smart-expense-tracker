const jwt = require("jsonwebtoken");


module.exports = (req,res,next)=>{


try{


const header = req.headers.authorization;


console.log("AUTH HEADER:",header);



if(!header){

return res.status(401).json({

message:"Authorization missing"

});

}




const token = header.replace("Bearer ","");



const decoded = jwt.verify(

token,

process.env.JWT_SECRET

);



console.log("DECODED TOKEN:",decoded);





req.user = decoded;



next();



}

catch(err){


console.log("AUTH FAILED:",err);


return res.status(401).json({

message:"Token invalid"

});


}


};