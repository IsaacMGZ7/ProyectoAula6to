import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:9998/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
