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
            type:Date,
            default:Date.now
        }

//    labourReport:[

//     {
//         lpresent: {
//         type: String,
//         default: "Absent"
//     },
//         sname: {
//         type: String,
//         default: "not Mentioned yet"
       
//     },
//         lkharchi:{
//         type:Number,
//         default:0
//     },
       
//     lpay: {
//         type: Number,
//         default: 0
//     },
//     createdAt:{
//         type:Date,
//         default:Date.now
//     }



//     }




//    ],
    
    
  

})

const myAllLabour = new mongoose.model("myAllLabours", mylabourSchema);


module.exports = myAllLabour;