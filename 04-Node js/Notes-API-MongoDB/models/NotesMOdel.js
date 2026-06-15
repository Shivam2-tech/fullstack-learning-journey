const mongoose=require("mongoose");

const notesSchema=new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    content:{
        required:true,
        type:String
    },
    createdBy:{
        type:Number
    }
});

module.exports=mongoose.model("notesSchema",notesSchema);