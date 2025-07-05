import axios from "axios";

const api = axios.create({
  baseURL: "https://meeting-backend1-production.up.railway.app/api", 
  withCredentials: true, 
});

export default api;
