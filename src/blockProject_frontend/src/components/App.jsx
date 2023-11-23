import { useState, useEffect } from "react";
import * as React from "react";
import { blockProject_backend } from "../../../declarations/blockProject_backend";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  async function addNote(newNote) {
    await blockProject_backend.createNote(newNote.title, newNote.content);
    setNotes((prevNotes) => {
      return [newNote, ...prevNotes];
    });
  }

  useEffect(() => {
    console.log("useEffect running...");
    fetchData();
  }, []);

  const fetchData = async () => {
    const readData = await blockProject_backend.readNotes();
    setNotes(readData);
  };

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;