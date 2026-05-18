import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/Home";
import NoteDetailPage from "./pages/NoteDetail";
import CreateNoteModal from "./components/createModalNote";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/signup";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard setTheme={setTheme} theme={theme} />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Layout>
                <HomePage setTheme={setTheme} theme={theme} />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateNoteModal setTheme={setTheme} theme={theme} />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/note/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <NoteDetailPage setTheme={setTheme} theme={theme} />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;