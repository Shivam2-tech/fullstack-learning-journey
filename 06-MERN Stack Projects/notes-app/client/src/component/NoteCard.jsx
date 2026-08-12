function NoteCard({ note, setNotes, deleteNotes, setEditingNote}) {

    return (
  
            <div className="card">
                <div>
                    <h2 className="head">{note.title}</h2>
                    <h2 className="secondary">{note.category}</h2>
                    <h2 className="secondary">{note.content}</h2>
                </div>
                <div className="buttons">
                    <button className="dltBtn" onClick={() => deleteNotes(note._id)}>Delete</button>
                    <button className="editBtn" onClick={() => setEditingNote(note)}>EDIT</button>
                </div>
            </div>

    )
}
export default NoteCard;
