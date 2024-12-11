// src/components/SignupModal.js
import axios from 'axios';
import React, { useState } from 'react';
import './SignupModal.css';

function SignupModal({ isOpen, onClose, openLoginModal }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://power-canada-group-backend-ei7l.onrender.com/api/register", { name, email, password })
      .then(() => {
        onClose();
        openLoginModal(); // Open the login modal for immediate login
      })
      .catch(error => alert("Signup failed: " + error.message));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
          <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <button className="link-button" onClick={openLoginModal}>Log in</button></p>
      </div>
    </div>
  );
}

export default SignupModal;
