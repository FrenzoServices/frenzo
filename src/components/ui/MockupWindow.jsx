import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, Minimize2, ExternalLink } from 'lucide-react';
import CourseDemo from '../demos/CourseDemo';
import CommerceDemo from '../demos/CommerceDemo';
import DashboardDemo from '../demos/DashboardDemo';
import CreatorDemo from '../demos/CreatorDemo';
import MemberDemo from '../demos/MemberDemo';
import NewsletterDemo from '../demos/NewsletterDemo';
import CoachingDemo from '../demos/CoachingDemo';
import SocialDemo from '../demos/SocialDemo';
import SaasDemo from '../demos/SaasDemo';
import AiDemo from '../demos/AiDemo';
import MigrationDemo from '../demos/MigrationDemo';

const MockupWindow = ({ type, title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isExpanded]);

  const getDemoComponent = () => {
    switch(type) {
      case 'course': return <CourseDemo />;
      case 'commerce': return <CommerceDemo />;
      case 'creator': return <CreatorDemo />;
      case 'community': return <MemberDemo />; 
      case 'newsletter': return <NewsletterDemo />;
      case 'coaching': return <CoachingDemo />;
      case 'social': return <SocialDemo />;
      case 'saas': return <SaasDemo />;
      case 'ai': return <AiDemo />;
      case 'migration': return <MigrationDemo />;
      default: return <DashboardDemo />;
    }
  };

  const FullscreenView = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 99999, // Super high z-index
      background: '#1a1a1a',
      display: 'flex',
      flexDirection: 'column',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {renderHeader(true)}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', background: '#09090b', display: 'flex', flexDirection: 'column' }}>
        {getDemoComponent()}
      </div>
    </div>
  );

  const renderHeader = (isExtendedMode) => (
       <div style={{
          background: '#222',
          borderBottom: '1px solid #333',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 50,
          flexShrink: 0
        }}>
          {/* Window Controls (Fake) */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
          </div>

          {/* URL Bar */}
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
            textOverflow: 'ellipsis',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
             <span>https://{title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.frenzo.app</span>
          </div>

          {/* Expand Toggle */}
          <button 
            onClick={() => setIsExpanded(!isExtendedMode)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#888',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0.2rem',
              borderRadius: '4px',
              zIndex: 60
            }}
            title={isExtendedMode ? "Close Fullscreen" : "Expand Fullscreen"}
          >
            {isExtendedMode ? <Minimize2 size={18} color="#fff" /> : <Maximize2 size={18} />}
          </button>
        </div>
  );

  return (
    <>
      <div style={{
        background: '#1a1a1a',
        borderRadius: '12px',
        border: '1px solid #333',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        width: '100%',
        aspectRatio: '16/9',
        minHeight: '500px', // Mobile responsive min-height
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
      className="mockup-window-container"
      >
        {renderHeader(false)}

        {/* Inline Demo Content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative', background: '#09090b', display: 'flex', flexDirection: 'column' }}>
          {getDemoComponent()}
        </div>
      </div>

      {/* Fullscreen Portal */}
      {isExpanded && createPortal(<FullscreenView />, document.body)}
      
      {/* Global Style for Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default MockupWindow;
