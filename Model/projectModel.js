const mongoose=require("mongoose");
const projectSchema=new mongoose.Schema({
    pname:{
        type:String,
        required:true
    },
    pdesc:{
        type:String,
        required:true
    },
    pdescD:{
        type:String,
        required:true
    },
    plink:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

const Project=new mongoose.model("projects",projectSchema);


module.exports=Project;