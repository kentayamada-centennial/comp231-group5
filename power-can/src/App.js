// src/App.js
import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AdminPanel from './components/AdminPanel';
import Dashboard from './components/Dashboard';
import HomePage from './components/Homepage/HomePage';
import Navbar from './components/Navbar/Navbar';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Users from './components/Users';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <div>
        <Navbar setIsAdmin={setIsAdmin} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:name" element={<UserDashboard />} />
          <Route path="/admin/*" element={isAdmin ? <AdminPanel /> : <Navigate to="/" />}>
            <Route path="users" element={<Users />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
