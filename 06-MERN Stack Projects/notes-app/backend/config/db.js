const mongoose = require("mongoose");

async function DBConnect() {
    try {
        const url = process.env.MONGODB_URL || "mongodb://localhost:27017/notes-app";
        await mongoose.connect(url);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    DBConnect
};