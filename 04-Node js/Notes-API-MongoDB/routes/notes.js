const express=require("express");
const router=express.Router();
const notes=require("../models/NotesModel");
const validate=require("../middleware/validate");
const auth=require("../middleware/auth");

router.get("/",async(req,res)=>{
    const {title,createdBy, sort, limit}=req.query;

    const query={};

    if(title){
        query.title=title;
    }
    if(createdBy){
        query.createdBy=createdBy;
    }

    let queryNotes=notes.find(query);

    if(sort==="year"){
        queryNotes = queryNotes.sort({ title: 1 });
    }

    if(sort==="-year"){
        queryNotes = queryNotes.sort({ title: -1 });
    }

    if(limit){
        queryNotes=queryNotes.limit(Number(limit));
    }

    const notesList=await queryNotes;

    res.json(notesList);
});

router.get("/title/:title",async(req,res)=>{
    const title= req.params.title;

    const find=await notes.findOne({
        title: req.params.title
    });

    if(find){
        res.status(200).json(find);
    }else{
        res.status(404).json({msg:"Notes Not Found"});
    }
});

router.post("/",auth ,validate.validate,async (req,res)=>{
    const newNotes=await notes.create(req.body);

    res.json({newNotes,msg:"Notes Recieved"});
});

router.put("/id/:id",auth,validate.validate,async(req,res)=>{
    const updateNotes=await notes.findByIdAndUpdate(req.params.id,req.body,{ new: true });

    if(!updateNotes){
        return res.status(404).json({msg:"Notes Not Found"});
    }
    res.json({updateNotes,msg:"Movie Updated"});
});

router.patch("/id/:id",auth,validate.validatePatch,async(req,res)=>{
    const updateNotes=await notes.findByIdAndUpdate(req.params.id,req.body,{ new: true });

    if(!updateNotes){
        return res.status(404).json({msg:"Movie Not Found"});
    }
    res.json({updateNotes,msg:"Movie Updated"});
});

router.delete("/id/:id",auth,async(req,res)=>{
    const deleteNotes=await notes.findByIdAndDelete(req.params.id);

    if(!deleteNotes){
        return res.status(404).json({msg:"Movie Not Found"});
    }
    res.json({deleteNotes,msg:"Deleted"});
});

module.exports=router;