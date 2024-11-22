// src/components/AdminPanel.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AdminPanel.css';

function AdminPanel() {
  return (
    <div className="admin-panel">
      <nav className="admin-nav">
        <ul>
          <li><Link to="users">Users</Link></li>
          <li><Link to="dashboard">Dashboard</Link></li>
        </ul>
      </nav>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPanel;
