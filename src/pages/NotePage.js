import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const NotePage = () => {
  let { id } = useParams();
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if (id === "new") return;
    let response = await fetch(`http://localhost:8000/api/notes/${id}/`);
    let data = await response.json();
    setNote(data);
  };

  let createNote = async () => {
    fetch(`http://localhost:8000/api/notes/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };
  let updateNote = async () => {
    fetch(`http://localhost:8000/api/notes/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };
  let deleteNote = async () => {
    fetch(`http://localhost:8000/api/notes/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  let handleSubmit = () => {
    if (id !== "new" && note.body == "") {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
    } else if (id === "new" && note.body !== null) {
      createNote();
    }
  };
  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {id != "new" ? (
          <Link to="/">
            <button onClick={deleteNote}>Delete</button>
          </Link>
        ) : (
          <Link to="/">
            <button onClick={handleSubmit}>Done</button>
          </Link>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        defaultValue={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
