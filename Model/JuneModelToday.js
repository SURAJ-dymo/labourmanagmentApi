const mongoose = require("mongoose");
const mylabourSchema = new mongoose.Schema({
    lname:{
        type:String,
        required: true
    
       },
   ltoken:{
    type:Number,
    unique:true,
    required: true

   },
   createdAt:{
    
        type:String,
   
   },
   present:{
           type:Boolean
   },
  
    
  

   labourReport:[

    {
        mpresent: {
            type: String,
            default: "p"
        },

        lpresent: {
        type: String,
        default: "0"
    },
        sname: {
        type: String,
        default: "not Mentioned yet"
       
    },
        lkharchi:{
        type:Number,
        default:0
    },
       
    lpay: {
        type: Number,
        default: 0
    },
    createdAt:{
        type:String,
       
    }



    }




   ],
    
    
  

})

const mylaboursJuneToday = new mongoose.model("mylaboursJuneToday", mylabourSchema);


module.exports = mylaboursJuneToday;