import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await axios.post(`${BASE_URL}/auth/refresh`, {
    refreshToken,
  });

  return response.data.accessToken;
};