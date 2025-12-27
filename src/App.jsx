import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./auth/useAuth";
import axiosClient from "./api/axiosClient";
import JobsPage from "./pages/JobsPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";




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
              <JobsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/new"
          element={
            <ProtectedRoute>
              <AddJobPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id/edit"
          element={
            <ProtectedRoute>
              <EditJobPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;