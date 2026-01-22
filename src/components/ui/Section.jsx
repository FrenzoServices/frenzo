import React from 'react';

const Section = ({ children, id, className = '', dark = false, style = {} }) => {
  return (
    <section id={id} className={className} style={{
      padding: '6rem 0',
      background: dark ? 'var(--bg-tertiary)' : 'transparent',
      position: 'relative',
      ...style
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </section>
  );
};

export default Section;
