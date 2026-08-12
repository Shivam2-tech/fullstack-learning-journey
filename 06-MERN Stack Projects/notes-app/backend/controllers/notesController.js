const Note = require("../model/notesModel")

async function getNotes(req, res) {
    try {
        const notes = await Note.find();
        res.json(notes)
    } catch (error) {
        console.log(error);
        res.json("Error");
    }
}

async function postNotes(req, res) {
    const newNote=await Note.create(req.body);
    res.json(newNote)
    console.log(req.body)
}

async function deleteNotes(req, res) {

    const deleteNotes = await Note.findByIdAndDelete(req.params.id);

    if (!deleteNotes) {
        return res.status(404).json({
            msg: "Movie Not Found"
        });
    }
    res.json({
        deleteNotes,
        msg: "Deleted"
    });
}

async function putNotes(req, res) {
    const updateNotes = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    if (!updateNotes) {
        return res.status(404).json({
            msg: "Notes Not Found"
        });
    }
    res.json({
        updateNotes,
        msg: "Movie Updated"
    });
}
module.exports = {
    getNotes,
    postNotes,
    deleteNotes,
    putNotes
}