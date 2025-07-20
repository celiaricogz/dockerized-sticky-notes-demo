import React, { useEffect, useState } from 'react';
import './App.css';

function NotesBoard() {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    fetch('/notes')
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  const addNote = async () => {
    const newNote = { title: 'Nueva nota', content: 'Escribe aquí...' };
    const res = await fetch('/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote),
    });
    const saved = await res.json();
    setNotes([saved, ...notes]);
    startEditing(saved);
  };

  const startEditing = (note) => {
    setEditingNoteId(note.id);
    setEditingTitle(note.title);
    setEditingContent(note.content);
  };

  const saveEdit = async () => {
    const updated = { title: editingTitle, content: editingContent };
    const res = await fetch(`/notes/${editingNoteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    const saved = await res.json();
    setNotes(notes.map((n) => (n.id === saved.id ? saved : n)));
    cancelEdit();
  };

  const deleteNote = async (id) => {
    await fetch(`/notes/${id}`, { method: 'DELETE' });
    setNotes(notes.filter((n) => n.id !== id));
  };

  const cancelEdit = () => {
    setEditingNoteId(null);
    setEditingTitle('');
    setEditingContent('');
  };

  return (
    <div className="board">
      {notes.map((note) =>
        editingNoteId === note.id ? (
          <div className="note editing" key={note.id}>
            <input
              type="text"
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
            />
            <textarea
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
            />
            <div className="actions">
              <button onClick={saveEdit}>Guardar</button>
              <button onClick={() => deleteNote(note.id)}>Eliminar</button>
              <button onClick={cancelEdit}>Cancelar</button>
            </div>
          </div>
        ) : (
          <div className="note" key={note.id} onClick={() => startEditing(note)}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        )
      )}
      <button className="add-btn" onClick={addNote}>+</button>
    </div>
  );
}

export default NotesBoard;
