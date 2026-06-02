import axios from "axios";

const API = axios.create({
  baseURL: "https://personal-finance-tracker-62ua.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;