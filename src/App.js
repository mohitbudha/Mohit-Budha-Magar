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

  const ProtectedRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem("token");
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  const handleLoginSuccess = () => {
    window.location.href = "/admin";
  };

  return (
    <ThemeProvider>
      <Router>
        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <AboutMe />
                <ProjectSection />
                <Contact />
                <Footer />
              </>
            }
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={<AdminLogin onLoginSuccess={handleLoginSuccess} />}
          />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Top1 />
                <AddProject />
                <AdminContact />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
