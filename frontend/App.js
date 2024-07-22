import './App.css';
import axios from 'axios';
import AddNote from './components/AddNote';
import NoteList from './components/NoteList';
import React, { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:4000/api/notes/';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  // Fetch notes from the server
  useEffect(() => {
    axios
      .get(API_BASE)
      .then((res) => setNotes(res.data))
      .catch((error) => console.error('Error fetching notes: ', error));
  }, []);

  
// Add new note to server
const handleAddNote = async () => {
  axios
      .post(API_BASE + "new", {title, content})
      .then((res) => {
        setNotes([...notes, res.data]);
        setTitle('');
        setContent('');
      })
      .catch((error) => {
        console.error('Error adding note:', error);
      });
}; 

// Update note by Id
const handleEditNote = (id, updatedTitle, updatedContent) => {
  axios
    .put(API_BASE +  `${id}`, {
      title: updatedTitle,
      content: updatedContent,
    })
    .then((res) => {
      const updateNotes = notes.map((note) => 
        note._id === id ? res.data : note
      );
      setNotes(updateNotes);
    })
    .catch((error) => console.error('Error updating note : ', error));
};

// Delete note by Id
const handleDeleteNote = (id) => {
  axios
    .delete(API_BASE + `${id}`)
    .then((res) => {
      const updateNotes = notes.filter((note) => note._id !== id);
      setNotes(updateNotes);
    })
    .catch((error) => console.error('Error deleting note : ', error));
};

  return (
    <div className="app-container">
      <h1>Notes App</h1> 
      <hr />
      <AddNote
        title = {title}
        setTitle = {setTitle}
        content = {content}
        setContent = {setContent}
        onAddNote = {handleAddNote}
      /> 
      <hr />
      <NoteList
        notes = {notes}
        onEditNote = {handleEditNote}
        onDeleteNote = {handleDeleteNote}
      />
    </div>
  );
}

export default App;
