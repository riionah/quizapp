import React, { useState } from "react";
import axios from "axios";

function AdminCreateQuiz() {

  const [title, setTitle] = useState("");

  const createQuiz = async () => {

    const token = localStorage.getItem("token");

    await axios.post(
      "https://quizapp-tjj0.onrender.com/api/admin/quiz",
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Quiz created");
  };

  return (
    <div>

      <h2>Create Quiz</h2>

      <input
        placeholder="Quiz title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createQuiz}>
        Create Quiz
      </button>

    </div>
  );
}

export default AdminCreateQuiz;