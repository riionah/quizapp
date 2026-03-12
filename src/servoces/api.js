import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const registerUser = (data) => API.post("/auth/register", data);

export const loginUser = (data) => API.post("/auth/login", data);

export const getQuizzes = () => API.get("/quiz");

export const getQuiz = (id) => API.get(`/quiz/${id}`);

export const submitQuiz = (id, answers, token) =>
  API.post(
    `/quiz/submit/${id}`,
    { answers },
    { headers: { Authorization: `Bearer ${token}` } }
  );
export const getLeaderboard = () => API.get("/quiz/leaderboard");