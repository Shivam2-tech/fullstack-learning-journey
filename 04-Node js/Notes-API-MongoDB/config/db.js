const mongoose=require("mongoose");

async function db(){
    try{
await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    }
    catch(err){
        console.error(err);
    }
}
module.exports=db;