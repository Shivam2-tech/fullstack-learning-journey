const express = require("express");
const router = express.Router();
let movies = require("../data/movies");
const validate = require("../middleware/validate");

router.get("/", (req, res) => {

    const rating = req.query.rating;
    const yr = req.query.year;
    const title = req.query.title;

    if (rating) {
        const filtered = movies.filter(x => x.rating === Number(rating));
        const len = filtered.length;
        if (len !== 0) {
            res.json(filtered);
        } else {
            res.status(404).json({
                msg: "Movie not found"
            });
        }
    } else if (title) {
        const filter = movies.filter(x => x.title.toLowerCase() === title.toLowerCase());

        if (filter.length) {
            res.json(filter);
        } else {
            res.status(404).json({
                msg: "Movie Not found"
            });
        }
    } else if (yr) {
        const filter = movies.filter(x => x.year === Number(yr));
        const len = filter.length;
        if (len !== 0) {
            res.json(filter);
        } else {
            res.status(404).json({
                msg: "Movie not found"
            });
        }
    } else {
        res.json(movies);
    }

});

router.get("/id/:id", (req, res) => {
    const id = req.params.id;

    const newId = movies.find(n => n.id === Number(id));

    res.status(404).json(newId || {
        text: "Movie not Found"
    });
});

router.get("/movie/:title", (req, res) => {
    const title = req.params.title;

    const find = movies.find(x => x.title.toLowerCase() === title.toLowerCase());
    res.status(404).json(find || {
        text: "Movie not Found"
    });

});

router.post("/", validate.validate, (req, res) => {

    const newMovie = {
        id: movies.length + 1,
        ...req.body
    };

    movies.push(newMovie);

    res.status(201).json({
        msg: "Movie received",
        movie: newMovie
    });
});

router.delete("/id/:id", (req, res) => {
    const id = Number(req.params.id);
    const find = movies.find(x => x.id === id);
    if (find) {
        const filtered = movies.filter(x => x.id !== id);
        movies = filtered;
        res.json(movies);
    } else {
        res.status(404).json({
            msg: "Movie not found"
        });
    }
});

router.put("/id/:id", validate.validate, (req, res) => {
    const id = Number(req.params.id);
    const found = movies.find(f => f.id === id);
    const body = req.body;

    if (found) {
        found.title = body.title;
        found.year = body.year;
        found.rating = body.rating;
        console.log("Done");
        res.json(found);
    } else {
        res.status(404).json({
            msg: "Not found"
        });
    }


});

router.patch("/id/:id",validate.validatePatch, (req, res) => {
    const id = Number(req.params.id);
    const found = movies.find(x => x.id === Number(id));
    const body = req.body;
    if (found) {
        if (body.title) {
            found.title = body.title;
        }
        if (body.rating) {
            found.rating = body.rating;
        }
        if (body.year) {
            found.year = body.year;
        }
        console.log("Updated Successfully");
        res.json(found);
    } else {
        res.status(404).json("Movie Not Found");
    }

});

router.get("/test",(req,res)=>{
    try{
        const x=y;
    }
    catch(err){
        next(err);
    }
});
module.exports = router;