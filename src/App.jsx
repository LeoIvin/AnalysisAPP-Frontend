import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import UploadSales from "./components/UploadSales";
import Loader from "./components/Loader";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/upload-sales" element={<UploadSales />} />
          <Route path="/settings/*" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
