const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    image: {
        type:String,
        /* required:true */
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
    },
    state:{
        type:String,
        enum:["todo","doing","done"]
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

module.exports = mongoose.model("Tasks",schema);