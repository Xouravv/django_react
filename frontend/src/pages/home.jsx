import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/note";
import "../styles/home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const res = await api.get("/api/notes/");
            setNotes(res.data);
        } catch (err) {
            console.error(err);
            // Consider showing the error in the UI
        }
    };

    const deleteNote = async (id) => {
        try {
            const res = await api.delete(`/notes/delete/${id}/`);
            if (res.status === 204) {
                alert("Note is deleted");
                getNotes(); // Refresh notes after deletion
            } else {
                alert("Failed to delete the note");
            }
        } catch (error) {
            console.error(error);
            // Consider showing the error in the UI
        }
    };

    const createNote = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/notes/", { content, title });
            if (res.status === 201) {
                alert("Note is created");
                getNotes(); // Refresh notes after creation
            } else {
                alert("Failed to create the note");
            }
        } catch (error) {
            console.error(error);
            // Consider showing the error in the UI
        }
    };

    return (
        <div>
            <h2>Notes</h2>
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
            ))}
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <br />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    name="content"
                    id="content"
                    required
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Home;
