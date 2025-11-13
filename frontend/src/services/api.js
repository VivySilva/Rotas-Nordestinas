import axios from "axios";

// Cria uma instância global do axios
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});
