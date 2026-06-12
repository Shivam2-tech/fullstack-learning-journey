const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const validate = require("../middleware/validate");

router.get("/", async (req, res) => {
    const movies = await Movie.find();

    res.json(movies);
});

router.get("/id/:id", async(req, res) => {
    const id = req.params.id;

    const newId = await Movie.findById(id);

    res.status(404).json(newId || {
        text: "Movie not Found"
    });
});

router.get("/movie/:title", async (req, res) => {
    const movie = await Movie.findOne({
        title: req.params.title
    });

    if (!movie) {
        return res.status(404).json({
            msg: "Movie Not Found"
        });
    }

    res.json(movie);
});

router.post("/", validate.validate, async (req, res) => {
    const newMovie = await Movie.create(req.body);
    res.status(201).json({
        msg: "Movie received",
        movie: newMovie
    });
});

router.delete("/id/:id", async (req, res) => {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
        return res.status(404).json({
            msg: "Movie Not Found"
        });
    }

    res.json({
        msg: "Movie Deleted",
        movie: deletedMovie
    });
});

router.put("/id/:id", validate.validate, async(req, res) => {
    const updateMovie= await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    if(!updateMovie){
        return res.status(404).json({
            msg:"Movie NOt FOund !"
        });
    }
    res.json(updateMovie);
});

router.patch("/id/:id", validate.validatePatch, async(req, res) => {

    const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!updatedMovie) {
        return res.status(404).json({
            msg: "Movie Not Found"
        });
    }

    res.json(updatedMovie);
});

module.exports = router;