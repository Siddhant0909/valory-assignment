import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./components/Dashboard";
import { useAuthStore } from "./store/useAuthStore";
import { Loader2 } from "lucide-react";
import Signup from "./pages/Signup.jsx";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home.jsx";

const App = () => {
  const { isAuthenticated, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth && !isAuthenticated)
    return (
      <div
        className="flex items-center justify-center h-screen"
        data-theme="lofi"
      >
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  return (
    <div data-theme={"lofi"}>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
