import { useState, useEffect } from "react";
import NoteCard from "../component/NoteCard";
import NoteForm from "../component/NoteForm";

function Home() {

    const [editingNote, setEditingNote] = useState(null);
    const [notes, setNotes] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("http://localhost:3000/notes");
            const data = await res.json();
            setNotes(data)
        }
        fetchData();
    }, [])

    function handleEdit(note) {
        setEditingNote(note);
        setShowModal(true);
    }
    async function deleteNotes(id) {
        const res = await fetch("http://localhost:3000/notes/" + id, {
            method: "DELETE"
        })
        const data = await res.json();
        setNotes(prev => prev.filter(x => x._id !== id))
    }

    return (
        <>


            <div className="container">
                {
                    notes.map(note => (
                        <NoteCard
                            note={note}
                            setNotes={setNotes}
                            deleteNotes={() => deleteNotes(note._id)}
                            setEditingNote={handleEdit}
                        />
                    ))
                }
            </div>

            <img className="img" src="../public/ADDBTN.png" onClick={() => setShowModal(!showModal)}></img>
            {showModal &&
                <NoteForm
                    setNotes={setNotes}
                    editingNote={editingNote}
                    setEditingNote={setEditingNote}
                    setShowModal={setShowModal} />
            }
        </>

    )
}

export default Home;