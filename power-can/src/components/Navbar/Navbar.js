// src/components/Navbar/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import './Navbar.css';

function Navbar({ setIsAdmin }) {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setSignupModalOpen(false); // Close signup modal if open
  };

  const closeLoginModal = () => setLoginModalOpen(false);

  const openSignupModal = () => {
    setSignupModalOpen(true);
    setLoginModalOpen(false); // Close login modal if open
  };

  const closeSignupModal = () => setSignupModalOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/images/Logo.png" alt="Logo" className="logo-img" />
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><button className="login-button" onClick={openLoginModal}>Login</button></li>
        <li><button className="signup-button" onClick={openSignupModal}>Sign Up</button></li>
      </ul>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} setIsAdmin={setIsAdmin} />
      <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} openLoginModal={openLoginModal} />
    </nav>
  );
}

export default Navbar;
