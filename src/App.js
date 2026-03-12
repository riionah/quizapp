import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import QuizList from "./pages/Quizlist";
import QuizPlay from "./pages/Quizplay";
import Leaderboard from "./pages/Leaderboard";
import AdminAddQuestion from "./pages/Adminquestion";
import AdminCreateQuiz from "./pages/Admin";
import UserDashboard from "./pages/User";
import AdminDashboard from "./pages/Admindashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quiz/:id" element={<QuizPlay />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/admin/create-quiz" element={<AdminCreateQuiz/>} />
        <Route path="/admin/add-question" element={<AdminCreateQuiz />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;