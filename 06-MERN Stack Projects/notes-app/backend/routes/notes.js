const express = require("express");
const {
    getNotes,
    postNotes,
    deleteNotes,
    putNotes
} = require("../controllers/notesController")
const router = express.Router();

router.get("/", getNotes);
router.post("/", postNotes)
router.delete("/:id", deleteNotes)
router.put("/:id",putNotes)
module.exports = router;