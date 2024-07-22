import React from "react";

const NoteList = ({ notes, onEditNote, onDeleteNote }) => {
  return (
    <div>
      <h2>Note List</h2>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <strong> {note.title} </strong>
            <p> {note.content} </p>
            <button 
              className="editButton"
              onClick={() => 
                    onEditNote(
                      note._id,
                      prompt(note.title),
                      prompt(note.content)
                    )} >
                Edit
              </button>
            <button 
              className="deleteButton"
              onClick={() => onDeleteNote(note._id)} >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
