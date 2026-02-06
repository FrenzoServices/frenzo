import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../../constants';

const Footer = () => {
  return (
    <footer style={{ background: '#111', borderTop: '1px solid #222', padding: '4rem 0', marginTop: 'auto' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
        
        {/* Brand */}
        <div>
           <div style={{ fontWeight: '900', fontSize: '1.5rem', marginBottom: '1rem', letterSpacing: '-1px' }}>FRENZO.</div>
           <p style={{ color: '#888', maxWidth: '250px' }}>
             The technical co-founder for creators and businesses claiming their independence.
           </p>
        </div>

        {/* Links */}
        <div>
           <h4 style={{ color: '#fff', marginBottom: '1.5rem', fontWeight: 'bold' }}>Company</h4>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <Link to="/about" style={{ color: '#888', textDecoration: 'none' }}>About Us</Link>
              <Link to="/services" style={{ color: '#888', textDecoration: 'none' }}>Services</Link>
              <Link to="/pricing" style={{ color: '#888', textDecoration: 'none' }}>Pricing</Link>
              <Link to="/vision" style={{ color: '#888', textDecoration: 'none' }}>Vision</Link>
           </div>
        </div>

        <div>
           <h4 style={{ color: '#fff', marginBottom: '1.5rem', fontWeight: 'bold' }}>Legal</h4>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <Link to="/privacy" style={{ color: '#888', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link to="/terms" style={{ color: '#888', textDecoration: 'none' }}>Terms of Service</Link>
           </div>
        </div>

         {/* Social */}
         <div>
           <h4 style={{ color: '#fff', marginBottom: '1.5rem', fontWeight: 'bold' }}>Connect</h4>
           <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: '#888' }}><Twitter size={20} /></a>
              <a href="#" style={{ color: '#888' }}><Linkedin size={20} /></a>
              <a href="#" style={{ color: '#888' }}><Instagram size={20} /></a>
              <a href="#" style={{ color: '#888' }}><Instagram size={20} /></a>
              <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: '#888' }}><Mail size={20} /></a>
           </div>
           <div style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
              <div>{COMPANY_INFO.phoneDisplay}</div>
              <div>{COMPANY_INFO.email}</div>
           </div>
        </div>

      </div>
      
      <div className="container" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #222', textAlign: 'center', color: '#444', fontSize: '0.9rem' }}>
         &copy; {new Date().getFullYear()} Frenzo Services. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
