import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div style={{padding:"30px"}}>

      <h1>Admin Dashboard</h1>

      <Link to="/admin/create-quiz">
        <button>Create Quiz</button>
      </Link>

      <br/><br/>

      <Link to="/admin/add-question">
        <button>Add Question</button>
      </Link>

      <br/><br/>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}

export default AdminDashboard;