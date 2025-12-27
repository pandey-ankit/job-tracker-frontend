import { useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";



export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axiosClient.post("/auth/login", {
      username,
      password,
    });

    const accessToken = response.data.accessToken;

    login(response.data.accessToken, response.data.refreshToken);


    console.log("Logged in with backend access token:", accessToken);
    console.log("User:", response.data.username);
    console.log("Roles:", response.data.roles);

    navigate("/");
  } catch (error) {
    console.error("Login failed:", error);
    alert("Invalid username or password");
  }
};



  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
