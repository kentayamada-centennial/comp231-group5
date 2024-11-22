// src/components/LoginModal.js
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginModal.css';

function LoginModal({ isOpen, onClose, setIsAdmin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://power-canada-group-backend.onrender.com/api/login", { email, password })
      .then((response) => {
        const user = response.data;
        if (user.isAdmin) {
          setIsAdmin(true);
          navigate("/admin/users");
        } else {
          setIsAdmin(false);
          navigate(`/user/${user.name}`);
        }
        onClose();
      })
      .catch(error => alert("Login failed: " + error.message));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
