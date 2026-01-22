import React from 'react';
import CourseDemo from '../demos/CourseDemo';
import CommerceDemo from '../demos/CommerceDemo';
import DashboardDemo from '../demos/DashboardDemo';
import CreatorDemo from '../demos/CreatorDemo';

const MockupWindow = ({ type, title }) => {
  const getDemoComponent = () => {
    switch(type) {
      case 'course': return <CourseDemo />;
      case 'commerce': return <CommerceDemo />;
      case 'dashboard': return <DashboardDemo />;
      case 'creator': return <CreatorDemo />;
      case 'community': return <CreatorDemo />; // Reusing creator demo for community temporarily
      default: return <DashboardDemo />;
    }
  };

  return (
    <div style={{
      background: '#1a1a1a',
      borderRadius: '12px',
      border: '1px solid #333',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      overflow: 'hidden',
      width: '100%',
      // Responsive Aspect Ratio: 16/9 on desktop, auto height on mobile
      aspectRatio: '16/9',
      minHeight: '400px', // Ensure height on mobile
      display: 'flex',
      flexDirection: 'column'
    }}
    className="mockup-window-container"
    >
      {/* Header Bar */}
      <div style={{
        background: '#222',
        borderBottom: '1px solid #333',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        zIndex: 50 // Keep header on top
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
        </div>
        <div style={{
          background: '#000',
          borderRadius: '4px',
          padding: '4px 10px',
          fontSize: '0.75rem',
          color: '#555',
          marginLeft: '1rem',
          flex: 1,
          textAlign: 'center',
          fontFamily: 'monospace',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          https://{title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.frenzo.app
        </div>
      </div>

      {/* Demo Container */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', background: '#09090b' }}>
        {getDemoComponent()}
      </div>
    </div>
  );
};

export default MockupWindow;
