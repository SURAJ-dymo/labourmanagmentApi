const mongoose=require("mongoose");
const siteSchema=new mongoose.Schema({
    sname:{
        type:String,
        required:true
    },
    slocation:{
        type:String,
        required:true
    },
    sowner:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

const Site=new mongoose.model("sites",siteSchema);


module.exports=Site;