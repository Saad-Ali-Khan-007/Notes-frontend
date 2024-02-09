import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const NotePage = () => {
  let { id } = useParams();
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    let response = await fetch(`http://localhost:8000/api/notes/${id}/`);
    let data = await response.json();
    setNote(data);
  };
  return <div>{note?.body}</div>;
};

export default NotePage;
