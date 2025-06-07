// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function AddNote() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [mood, setMood] = useState("");
//   const [category, setCategory] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {

//     e.preventDefault();


//     try {
//       // أضيف mood أولاً
//       const moodRes = await axios.post("http://127.0.0.1:8000/api/moods/", {
//         name: mood,
//       });

//       // أضيف category
//       const categoryRes = await axios.post("http://127.0.0.1:8000/api/categories/", {
//         name: category,
//       });

//       // أضيف الملاحظة
//       await axios.post("http://127.0.0.1:8000/api/entries/", {
//         title,
//         content,
//         mood: moodRes.data.id,
//         category: categoryRes.data.id,
//         user: 1, // تأكدي أن ID المستخدم صحيح
//       });

//       navigate("/notes");
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Note</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         /><br />
//         <textarea
//           placeholder="Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//         /><br />
//         <input
//           type="text"
//           placeholder="Enter Mood"
//           value={mood}
//           onChange={(e) => setMood(e.target.value)}
//           required
//         /><br />
//         <input
//           type="text"
//           placeholder="Enter Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         /><br />
//         <button type="submit">Add Note</button>
//       </form>
//     </div>
//   );
// }

// export default AddNote;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // إعداد الهيدر مع التوكن بشكل آمن
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // إنشاء mood
      const moodRes = await axios.post(
        "http://127.0.0.1:8000/api/moods/",
        { name: mood },
        config
      );

      // إنشاء category
      const categoryRes = await axios.post(
        "http://127.0.0.1:8000/api/categories/",
        { name: category },
        config
      );

      // إنشاء note
      await axios.post(
        "http://127.0.0.1:8000/api/entries/",
        {
          title,
          content,
          mood: moodRes.data.id,
          category: categoryRes.data.id,
        },
        config
      );

      // التوجيه إلى صفحة الملاحظات بعد الإضافة
      navigate("/notes");
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ أثناء إضافة الملاحظة. تأكد من تسجيل الدخول والبيانات.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      /><br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      /><br />

      <input
        type="text"
        placeholder="Mood"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        required
      /><br />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      /><br />

      <button type="submit">Add Note</button>
    </form>
  );
}

export default AddNote;
