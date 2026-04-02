import axios from "axios";
import { API_BASE_URL } from "../config/network";

export async function authenticate(username, password) {
  const payload = {
    username: username.trim().toLowerCase(),
    password: password.trim().toLowerCase(),
  };

  const response = await axios.post(`${API_BASE_URL}/api/authenticate`, payload, {
    headers: { "Content-Type": "application/json" },
    timeout: 10000,
  });

  return response.data;
}
