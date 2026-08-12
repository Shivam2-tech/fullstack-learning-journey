import { useEffect } from "react";
import { useForm } from "react-hook-form";

function NoteForm({
    setNotes,
    editingNote,
    setEditingNote,
    setShowModal
}) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (editingNote) {
            reset({
                title: editingNote.title,
                content: editingNote.content
            });
        }
    }, [editingNote, reset]);


    async function submitNote(data) {

        if (editingNote) {

            const res = await fetch(
                "http://localhost:3000/notes/" + editingNote._id,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: data.title,
                        content: data.content,
                        category: "General"
                    })
                }
            );

            const result = await res.json();

            setNotes(prev =>
                prev.map(note =>
                    note._id === result.updateNotes._id
                        ? result.updateNotes
                        : note
                )
            );

            setEditingNote(null);

        } else {

            const res = await fetch(
                "http://localhost:3000/notes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: data.title,
                        content: data.content,
                        category: "General"
                    })
                }
            );

            const newNote = await res.json();

            setNotes(prev => [...prev, newNote]);
        }

        reset();
        setShowModal(false);
    }


    return (
        <div className="modalOverlay">

            <div className="inpStyle">

                <button
                    className="closeBtn"
                    onClick={() => {
                        setShowModal(false);
                        setEditingNote(null);
                    }}
                >
                    ×
                </button>

                <h2>{editingNote ? "Edit Note" : "Create Note"}</h2>

                <form onSubmit={handleSubmit(submitNote)}>

                    <input
                        className="titleInp"
                        {...register("title", { required: "Title is Required" })}
                        placeholder="Enter Title..."
                    />

                    {errors.title && (
                        <p className="error">
                            {errors.title.message}
                        </p>
                    )}

                    <input
                        className="contentInp"
                        {...register("content", { required: "Content Required" })}
                        placeholder="Enter Content..."
                    />  
                    {errors.content && (
                        <p className="error">
                            {errors.content.message}
                        </p>
                    )}

                    <button
                        className="submit"
                        type="submit"
                    >
                        {editingNote ? "UPDATE" : "SUBMIT"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default NoteForm;