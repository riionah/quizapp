import React, { useEffect, useState } from "react";
import { getQuizzes, getLeaderboard } from "../services/api";
import { Link } from "react-router-dom";

function UserDashboard() {

  const [quizzes, setQuizzes] = useState([]);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {

    getQuizzes().then((res) => {
      setQuizzes(res.data.quizzes);
    });

    getLeaderboard().then((res) => {
      setLeaders(res.data);
    });

  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div style={{padding:"30px"}}>

      <h1>Quiz Dashboard</h1>

      <button onClick={logout}>Logout</button>

      <hr />

      <h2>Available Quizzes</h2>

      {quizzes.map((q) => (
        <div key={q.id}>
          <Link to={`/quiz/${q.id}`}>{q.title}</Link>
        </div>
      ))}

      <hr />

      <h2>Leaderboard</h2>

      {leaders.map((l, index) => (
        <div key={index}>
          User {l.user_id} - Score {l.score}
        </div>
      ))}

    </div>
  );
}

export default UserDashboard;