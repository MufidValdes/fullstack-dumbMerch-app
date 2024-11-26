import axios from 'axios';
const port = import.meta.env.PORT || 3000;
const API_URL = import.meta.env.VITE_API || `http://localhost:${port}`;
export const api = axios.create({
  baseURL: `${API_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log('No authorization');
  }
  return config;
});
