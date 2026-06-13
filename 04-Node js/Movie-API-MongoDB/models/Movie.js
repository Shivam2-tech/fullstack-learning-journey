const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    rating: {
       type: Number,
       min:1,
       max:10,
       required: true
    },
    year: {
        type: Number,
        required:true
    }
});

module.exports = mongoose.model("Movie", movieSchema);