import axios from "axios";

const api = axios.create({
  baseURL: "https://crude-server.vercel.app/api", 
  withCredentials: true, 
});

export default api;
