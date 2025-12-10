import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./pages/login";
import Persons from "./pages/Persons";
import Home from "./pages/Home";

const App: React.FC = () => {

  return (

        <main className="">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <ProtectedRoute requireAuth={false}>
                  <LoginForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/persons"
              element={
                <ProtectedRoute>
                  <Persons />
                </ProtectedRoute>
              }
            />

            {/* 404 Route */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </main>
  );
};

export default App;
