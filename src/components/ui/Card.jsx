import React from 'react';

const Card = ({ children, className = '', noHover = false }) => {
  return (
    <div className={`card ${className}`} style={{
      background: 'var(--bg-secondary)',
      padding: '2rem',
      borderRadius: '1rem',
      border: '1px solid var(--border-light)',
      transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
    onMouseEnter={(e) => {
      if (!noHover) {
        e.currentTarget.style.borderColor = 'var(--border-hover)';
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
      }
    }}
    onMouseLeave={(e) => {
      if (!noHover) {
        e.currentTarget.style.borderColor = 'var(--border-light)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }
    }}
    >
      {children}
    </div>
  );
};

export default Card;
