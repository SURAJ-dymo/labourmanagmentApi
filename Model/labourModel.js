const mongoose = require("mongoose");
const labourSchema = new mongoose.Schema({
    lname: {
        type: String,
        required: true
    },
    morning: {
        type: Boolean,
        default: true
    },
    present: {
        type: String,
        default: ""
    },
    sname: {
        type: String,
        required: true
    },
   
    paidStatus: {
        type: String,
        default: "NO"
    },
    
    pay: {
        type: String,
        default: "0"
    },

    createdAt: {
        type: String,
        required: true
    },
})

const Labour = new mongoose.model("labours", labourSchema);


module.exports = Labour;