const mongoose=require("mongoose");
const itemSchema=new mongoose.Schema({
    iname:{
        type:String,
        required:true
    },
    iqty:{
        type:String,
        required:true
    },
    icost:{
        type:String,
        required:true
    },
    fcat:{
        type:String,
        required:true
    },
    sname:{
        type:String,
        required:true
    },
    istock:{
        type:String,
        required:true
    },
   
    createdAt: {
        type: Date,
        default: Date.now,
      }
})

const Item=new mongoose.model("items",itemSchema);


module.exports=Item;