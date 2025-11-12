import axios from "axios";

const url = 'https://mycontacts-backend-lmk6.onrender.com/api'

export const API = axios.create({
  baseURL: url, // your backend base URL
});

// Add JWT token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});
