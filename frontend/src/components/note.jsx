import React from "react";

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

    return (
        <div className="Note_container">
            <h3 className="note-title">{note.title}</h3>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            <button
                className="note-delete-btn"
                onClick={() => onDelete(note.id)}
            >
                Delete
            </button>
        </div>
    );
}

export default Note;
