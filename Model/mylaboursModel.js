const mongoose = require("mongoose");
const mylabourSchema = new mongoose.Schema({
    lname: {
        type: String,
        required: true
    },
   ltoken:{
    type:Number,
    unique:true,
    required: true

   },
    lpresent: {
        type: String,
        default: "Absent"
    },
    sname: {
        type: String,
       
    },
   lkharchi:{
    type:Number
   },
    lpay: {
        type: Number,
        default: 0
    },

})

const myLabour = new mongoose.model("mylabours", mylabourSchema);


module.exports = myLabour;