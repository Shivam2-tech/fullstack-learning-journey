const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: String,
    rating: Number,
    year: Number
});

module.exports = mongoose.model("Movie", movieSchema);
