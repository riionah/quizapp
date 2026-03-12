import React, { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {

  const [leaders, setLeaders] = useState([]);

  useEffect(() => {

    axios.get("https://quizapp-tjj0.onrender.com/api/quiz/leaderboard")
      .then(res => setLeaders(res.data));

  }, []);

  return (
    <div>

      <h1>Leaderboard</h1>

      {leaders.map((l, i) => (

        <div key={i}>

          User {l.user_id} - Score {l.score}

        </div>

      ))}

    </div>
  );
}

export default Leaderboard;