const mongoose=require("mongoose");
const rateSchema=new mongoose.Schema({
    lrate:{
        type:String,
        required:true
    }
})

const Rate=new mongoose.model("rates",rateSchema);


module.exports=Rate;