const mongoose=require("mongoose");
const serviceSchema=new mongoose.Schema({
    sname:{
        type:String,
        required:true
    },
    sdesc:{
        type:String,
        required:true
    },
    sdescD:{
        type:String,
        required:true
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

const Service=new mongoose.model("services",serviceSchema);


module.exports=Service;