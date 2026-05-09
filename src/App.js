import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";

import Navbar from "./UI/Top";
import Hero from "./UI/Hero";
import AboutMe from "./UI/About";
import ProjectSection from "./UI/Projects";
import Contact from "./UI/Contact";
import Footer from "./UI/Footer";

import AdminLogin from "./Admin/Adminlogin";
import AddProject from "./Admin/addProject";
import Top1 from "./Admin/adminTop";
import AdminContact from "./Admin/adminContact";


function App() {
  // const [projects, setProjects] = useState([]);
  const isLoggedIn = !!localStorage.getItem("token"); // Check token in localStorage

  // const handleProjectAdded = (newProject) => {
  //   setProjects((prev) => [...prev, newProject]);
  // };

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    window.location.href = "/admin"; // Redirect after login
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   window.location.href = "/admin"; // Redirect to login page after logout
  // };

  // ✅ Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <AboutMe />
                <ProjectSection projects={projects} />
                <Contact />
                <Footer />
              </>
            }
          />

          {/* Admin Login Route */}
          <Route path="/login" element={<AdminLogin onLoginSuccess={handleLoginSuccess} />} />
          
          {/* Protected Admin Panel Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Top1/>
                <AddProject/>
                <AdminContact/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
