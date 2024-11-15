const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        require:true,
    },
    //array liya hai coz here we can store multiple url of that image
    images:[String],
    tags:[String]
})
module.exports = mongoose.model("Cars",CarSchema);