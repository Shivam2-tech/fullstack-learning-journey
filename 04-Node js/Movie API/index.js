const express = require("express");
const movies = require("./data/movies");
const app = express();

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.get("/data/movies", (req, res) => {

    const rating = req.query.rating;
    const yr=req.query.year;
    const title=req.query.title;

    if (rating) {
        const filtered = movies.filter(x => x.rating === Number(rating));
        const len=filtered.length;
        if(len!==0){
            res.json(filtered);
        }
        else{
            res.json({msg:"Movie not found"});
        }
    }
    else if(title){
        const filter=movies.filter(x=>x.title.toLowerCase()===title.toLowerCase());
        
        if(filter.length){
            res.json(filter);
        }
        else{
            res.json({msg:"Movie Not found"});
        }
    }
    else if(yr){
        const filter=movies.filter(x=>x.year===Number(yr));
        const len=filter.length;
        if(len!==0){
            res.json(filter);
        }
        else{
            res.json({msg:"Movie not found"});
        }
    }
     else {
        res.json(movies);
    }

});

app.get("/data/movies/movie/:title",(req,res)=>{
    const title= req.params.title;

    const find=movies.find(x=>x.title.toLowerCase()===title.toLowerCase());
    res.json(find || {text:"Movie not Found"});
    
});

app.get("/data/movies/id/:id", (req, res) => {
    const id = req.params.id;

    const newId = movies.find(n => n.id === Number(id));

    res.json(newId || {text:"Movie not Found"});
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});