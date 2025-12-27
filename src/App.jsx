import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./auth/useAuth";
import axiosClient from "./api/axiosClient";


function Home() {
  const { logout } = useAuth();
  const testApiCall = async () => {
    try {
      const res = await axiosClient.get("/jobs");
      console.log("API SUCCESS:", res);
    } catch (err) {
      console.error("API ERROR:", err);
    }
  };

  return (
    <div>
      <h2>Home (Protected)</h2>

      <button onClick={testApiCall}>Test Secured API</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;