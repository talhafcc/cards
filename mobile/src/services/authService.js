import axios from "axios";
import { API_BASE_URL } from "../config/network";

export async function authenticate(username, password) {
  const payload = {
    username: username.trim().toLowerCase(),
    password: password.trim().toLowerCase(),
  };

  const url = `${API_BASE_URL}/api/authenticate`;
  console.log("Auth request to:", url);

  try {
    const response = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
    });
    console.log("Auth response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Auth error:", error.message, error.response?.status, error.response?.data);
    throw error;
  }
}
