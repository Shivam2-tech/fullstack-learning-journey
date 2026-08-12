import { useState, useEffect } from "react";
import NoteCard from "../component/NoteCard";
import NoteForm from "../component/NoteForm";

function Home() {

    const [editingNote, setEditingNote] = useState(null);
    const [notes, setNotes] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/notes`);
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
        const res = await fetch(`${import.meta.env.VITE_API_URL}/notes/` + id, {
            method: "DELETE"
        })
        const data = await res.json();
        setNotes(prev => prev.filter(x => x._id !== id))
    }

    return (
        <>


            <div className="container">
                <img className="noteImg" src="/NoteBanner.png" />

                {notes.length === 0 ? (
                    <p className="emptyMessage">No notes yet</p>
                ) : (
                    notes.map(note => (
                        <NoteCard
                            key={note._id}
                            note={note}
                            setNotes={setNotes}
                            deleteNotes={() => deleteNotes(note._id)}
                            setEditingNote={handleEdit}
                        />
                    ))
                )}
            </div>

            <img className="img" src="/ADDBTN.png" onClick={() => setShowModal(!showModal)}></img>
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