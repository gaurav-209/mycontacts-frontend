import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5001/api", // your backend base URL
});

// Add JWT token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});
