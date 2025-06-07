// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// function EditNote() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [mood, setMood] = useState("");
//   const [category, setCategory] = useState("");

//   useEffect(() => {
//     axios.get(`http://127.0.0.1:8000/api/entries/${id}/`)
//       .then(res => {
//         setTitle(res.data.title);
//         setContent(res.data.content);
//         setMood(res.data.mood);
//         setCategory(res.data.category);
//       });
//   }, [id]);

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     axios.put(`http://127.0.0.1:8000/api/entries/${id}/`, {
//       title,
//       content,
//       mood,
//       category,
//       user: 1
//     }).then(() => navigate("/notes"));
//   };

//   return (
//     <div>
//       <h2>Edit Note</h2>
//       <form onSubmit={handleUpdate}>
//         <input value={title} onChange={e => setTitle(e.target.value)} required />
//         <textarea value={content} onChange={e => setContent(e.target.value)} required />
//         <input value={mood} onChange={e => setMood(e.target.value)} required />
//         <input value={category} onChange={e => setCategory(e.target.value)} required />
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// }

// export default EditNote;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// function EditNote() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [note, setNote] = useState({ title: "", content: "" });

//   const token = localStorage.getItem("token");

//   const config = {
//     headers: {
//       Authorization: `Token ${token}`,
//     },
//   };

//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8000/api/entries/${id}/`, config)
//       .then((res) => setNote(res.data))
//       .catch((err) => console.error("Error fetching note:", err));
//   }, [id]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://127.0.0.1:8000/api/entries/${id}/`, note, config);
//       navigate("/notes");
//     } catch (err) {
//       console.error("Error updating note:", err);
//     }
//   };

//   return (
//     <form onSubmit={handleUpdate}>
//       <h2>Edit Note</h2>
//       <input
//         type="text"
//         value={note.title}
//         onChange={(e) => setNote({ ...note, title: e.target.value })}
//         required
//       /><br />
//       <textarea
//         value={note.content}
//         onChange={(e) => setNote({ ...note, content: e.target.value })}
//         required
//       /><br />
//       <button type="submit">Update Note</button>
//     </form>
//   );
// }

// export default EditNote;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", content: "", mood: "", category: "" });

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Token ${token}` },
  };

  useEffect(() => {
    // تحميل الملاحظة
    axios.get(`http://127.0.0.1:8000/api/entries/${id}/`, config)
      .then((res) => {
        setNote({
          title: res.data.title,
          content: res.data.content,
          mood: res.data.mood,           // هنا نجيب الـ id
          category: res.data.category,   // هنا نجيب الـ id
        });

        // نجيب اسم mood
        if (res.data.mood) {
          axios.get(`http://127.0.0.1:8000/api/moods/${res.data.mood}/`, config)
            .then((moodRes) => setNote((prev) => ({ ...prev, mood: moodRes.data.name })));
        }

        // نجيب اسم category
        if (res.data.category) {
          axios.get(`http://127.0.0.1:8000/api/categories/${res.data.category}/`, config)
            .then((catRes) => setNote((prev) => ({ ...prev, category: catRes.data.name })));
        }
      })
      .catch((err) => console.error("Error fetching note:", err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // إنشاء mood إذا ما كان موجود
      const moodRes = await axios.post("http://127.0.0.1:8000/api/moods/", { name: note.mood }, config);

      // إنشاء category إذا ما كان موجود
      const catRes = await axios.post("http://127.0.0.1:8000/api/categories/", { name: note.category }, config);

      // تحديث الملاحظة
      await axios.put(`http://127.0.0.1:8000/api/entries/${id}/`, {
        title: note.title,
        content: note.content,
        mood: moodRes.data.id,
        category: catRes.data.id,
      }, config);

      navigate("/notes");
    } catch (err) {
      console.error("Error updating note:", err);
      alert("حدث خطأ أثناء التحديث.");
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Note</h2>

      <input
        type="text"
        placeholder="Title"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        required
      /><br />

      <textarea
        placeholder="Content"
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        required
      /><br />

      <input
        type="text"
        placeholder="Mood"
        value={note.mood}
        onChange={(e) => setNote({ ...note, mood: e.target.value })}
        required
      /><br />

      <input
        type="text"
        placeholder="Category"
        value={note.category}
        onChange={(e) => setNote({ ...note, category: e.target.value })}
        required
      /><br />

      <button type="submit">Update Note</button>
    </form>
  );
}

export default EditNote;

