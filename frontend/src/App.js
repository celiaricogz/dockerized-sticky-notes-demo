import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('/notes')
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  const addNote = async () => {
    const newNote = { title: 'New Note', content: 'Write something here...' };
    const res = await fetch('/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote)
    });
    const saved = await res.json();
    setNotes([saved, ...notes]);
  };

  return (
    <div className="board">
      {notes.map(note => (
        <div className="note" key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
      <button className="add-btn" onClick={addNote}>+</button>
    </div>
  );
}

export default App;
