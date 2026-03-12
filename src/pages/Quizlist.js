import React, { useEffect, useState } from "react";
import { getQuizzes } from "../services/api";
import { Link } from "react-router-dom";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    getQuizzes().then((res) => {
      setQuizzes(res.data.quizzes);
    });
  }, []);

  return (
    <div>
      <h2>Quiz List</h2>

      {quizzes.map((q) => (
        <div key={q.id}>
          <Link to={`/quiz/${q.id}`}>{q.title}</Link>
        </div>
      ))}
    </div>
  );
}

export default QuizList;