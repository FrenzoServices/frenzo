import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Frenzo
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/services" className="nav-link">Services</Link>
        <Link to="/how-it-works" className="nav-link">Process</Link>
        <Link to="/vision" className="nav-link">Vision</Link>
        <Link to="/contact" className="btn-primary">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
