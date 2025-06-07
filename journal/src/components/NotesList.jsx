

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css"; 

function NotesList() {
  const [notes, setNotes] = useState([]);
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/entries/", config)
      .then((res) => setNotes(res.data))
      .catch((err) => console.error("Error fetching notes:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/entries/${id}/`, config);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div className="notes-wrapper">
      <h2 className="notes-title">My Notes</h2>
      <div className="notes-container">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <h4>{note.title}</h4>
            <p>{note.content}</p>
            <p><strong>Mood:</strong> {note.mood_name}</p>
            <p><strong>Category:</strong> {note.category_name}</p>
            
            <p>
                <strong>Date:</strong>{" "}
                {new Date(note.created_at).toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>


            <Link to={`/edit/${note.id}`} className="edit-btn">Edit</Link>
            <button onClick={() => handleDelete(note.id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesList;









