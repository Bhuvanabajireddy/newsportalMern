
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand/Logo Link */}
        <Link className="navbar-brand" to="/">Global News Portal</Link>

        {/* Navigation Links */}
        <ul className="navbar-links">
          <li className="navbar-item">
            <Link className="navbar-link" to="/category/politics">Politics</Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/category/sports">Sports</Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/category/entertainment">Entertainment</Link>
          </li>
          <li className="navbar-item">
            <Link className="navbar-link" to="/category/technology">Technology</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;