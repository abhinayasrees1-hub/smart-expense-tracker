const mongoose=require("mongoose");


const budgetSchema=new mongoose.Schema({

month:String,

amount:Number

});


module.exports =
mongoose.model("Budget",budgetSchema);