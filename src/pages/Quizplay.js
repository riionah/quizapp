import React, { useEffect, useState } from "react";
import axios from "axios";

function QuizPlay({ id }) {

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {

    axios.get(`http://localhost:5000/api/quiz/${id}`)
      .then(res => setQuestions(res.data.questions));

  }, [id]);

  const selectOption = (questionId, optionId) => {

    setAnswers([
      ...answers.filter(a => a.question_id !== questionId),
      { question_id: questionId, option_id: optionId }
    ]);

  };

  const submitQuiz = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.post(
      `https://quizapp-tjj0.onrender.com/api/quiz/submit/${id}`,
      { answers },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    alert("Score: " + res.data.score);
  };

  return (
    <div>

      <h2>Quiz</h2>

      {questions.map(q => (

        <div key={q.id}>

          <h3>{q.text}</h3>

          {q.options.map(o => (

            <div key={o.id}>

              <input
                type="radio"
                name={q.id}
                onChange={() => selectOption(q.id, o.id)}
              />

              {o.text}

            </div>

          ))}

        </div>

      ))}

      <button onClick={submitQuiz}>
        Submit Quiz
      </button>

    </div>
  );
}

export default QuizPlay;