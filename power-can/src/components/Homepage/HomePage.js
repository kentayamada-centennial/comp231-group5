// src/components/Homepage/HomePage.js
import React from 'react';
import './HomePage.css';

function HomePage() {
  const handleImageClick = () => {
    window.location.href = 'https://www.google.com/search?q=how+solar+power+works';
  };

  return (
    <div className="homepage">
      <div className="content">
        <div className="block" onClick={handleImageClick}>
          <img src="/images/solar1.jpg" alt="Solar 1" className="solar-image" />
          <div className="quote">"Harnessing the Power of the Sun for a Brighter Future"</div>
        </div>
        <div className="block" onClick={handleImageClick}>
          <img src="/images/solar2.png" alt="Solar 2" className="solar-image" />
          <div className="quote">"Sustainable Energy Solutions for a Cleaner Planet"</div>
        </div>
        <div className="block" onClick={handleImageClick}>
          <img src="/images/solar3.png" alt="Solar 3" className="solar-image" />
          <div className="quote">"Empowering Communities with Renewable Energy"</div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Power Canada Group. All rights reserved.</p>
          <p>Contact us: <a href="mailto:amonani@my.centennialcollege.ca">amonani@my.centennialcollege.ca</a></p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
