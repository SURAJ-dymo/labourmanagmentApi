const mongoose=require("mongoose");
const materialSchema=new mongoose.Schema({
    mname:{
        type:String,
        required:true
    },
   
    createdAt: {
        type: Date,
        default: Date.now,
      }
})

const Material=new mongoose.model("materials",materialSchema);


module.exports=Material;