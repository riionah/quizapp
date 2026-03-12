import React, { useState } from "react";
import axios from "axios";

function AdminAddQuestion() {

  const [quizId, setQuizId] = useState("");
  const [text, setText] = useState("");

  const addQuestion = async () => {

    const token = localStorage.getItem("token");

    const data = {
      quiz_id: quizId,
      text: text,
      options: [
        { text: "Option 1", is_correct: false },
        { text: "Option 2", is_correct: true },
        { text: "Option 3", is_correct: false },
        { text: "Option 4", is_correct: false }
      ]
    };

    await axios.post(
      "https://quizapp-tjj0.onrender.com/api/admin/question",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Question added");
  };

  return (
    <div>

      <h2>Add Question</h2>

      <input
        placeholder="Quiz ID"
        onChange={(e) => setQuizId(e.target.value)}
      />

      <input
        placeholder="Question"
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addQuestion}>
        Add Question
      </button>

    </div>
  );
}

export default AdminAddQuestion;