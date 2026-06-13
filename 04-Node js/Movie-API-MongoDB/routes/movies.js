const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const validate = require("../middleware/validate");

router.get("/", async (req, res) => {

    const { rating, year, sort, limit } = req.query;

    const query = {};

    if (rating) {
        query.rating = Number(rating);
    }

    if (year) {
        query.year = Number(year);
    }

    let moviesQuery = Movie.find(query);

    if (sort === "year") {
        moviesQuery = moviesQuery.sort({ year: 1 });
    }

    if (sort === "-year") {
        moviesQuery = moviesQuery.sort({ year: -1 });
    }

    if (limit) {
        moviesQuery = moviesQuery.limit(Number(limit));
    }

    const movies = await moviesQuery;

    res.json(movies);
});

router.get("/id/:id", async (req, res) => {
    const id = req.params.id;

    const newId = await Movie.findById(id);

    if (!newId) {
        return res.status(404).json({
            text: "Movie not Found"
        });
    }

    res.status(200).json(newId);
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

router.put("/id/:id", validate.validate, async (req, res) => {
    const updateMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true
        }
    );

    if (!updateMovie) {
        return res.status(404).json({
            msg: "Movie NOt FOund !"
        });
    }
    res.json(updateMovie);
});

router.patch("/id/:id", validate.validatePatch, async (req, res) => {

    const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true
        }
    );

    if (!updatedMovie) {
        return res.status(404).json({
            msg: "Movie Not Found"
        });
    }

    res.json(updatedMovie);
});

router.get("/test", async (req, res, next) => {

    try {

        throw new Error("Testing Error");

    } catch (err) {

        next(err);

    }

});

module.exports = router;