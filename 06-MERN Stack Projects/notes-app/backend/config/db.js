const mongoose = require("mongoose");

async function DBConnect() {
    try {
        const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/notes-app";
        await mongoose.connect(uri);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    DBConnect
};