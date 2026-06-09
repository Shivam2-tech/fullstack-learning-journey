const express=require("express");
const router=express.Router();
const movies=require("../data/movies");

router.get("/", (req, res) => {

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

router.get("/id/:id", (req, res) => {
    const id = req.params.id;

    const newId = movies.find(n => n.id === Number(id));

    res.json(newId || {text:"Movie not Found"});
});

router.get("/movie/:title",(req,res)=>{
    const title= req.params.title;

    const find=movies.find(x=>x.title.toLowerCase()===title.toLowerCase());
    res.json(find || {text:"Movie nost Found"});
    
});


module.exports=router;