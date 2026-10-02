const mongoose=require("mongoose");



const userSchema=new mongoose.Schema({



name:{


type:String,

required:true


},




email:{


type:String,

required:true,

unique:true


},




password:{


type:String,

required:true


},




budget:{


type:Number,

default:0


},




categoryBudgets:{


type:Object,


default:{


Food:0,

Shopping:0,

Travel:0,

Health:0,

Education:0


}


}



});




module.exports=

mongoose.model(

"User",

userSchema

);