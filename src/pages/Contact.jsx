import React from 'react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';

const Contact = () => {
  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      <Section>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Start a Project</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
            Ready to build your growth system? Let's talk.
          </p>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Name</label>
              <input type="text" style={{ 
                width: '100%', 
                padding: '1rem', 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border-light)', 
                color: 'var(--text-primary)',
                borderRadius: '0.5rem'
              }} placeholder="Enter your name" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email</label>
              <input type="email" style={{ 
                width: '100%', 
                padding: '1rem', 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border-light)', 
                color: 'var(--text-primary)',
                borderRadius: '0.5rem'
              }} placeholder="Enter your email" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Project Details</label>
              <textarea style={{ 
                width: '100%', 
                padding: '1rem', 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--border-light)', 
                color: 'var(--text-primary)',
                borderRadius: '0.5rem',
                minHeight: '150px'
              }} placeholder="Tell us about your project" />
            </div>
            <Button variant="primary" style={{ width: '100%' }}>Send Message</Button>
          </form>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
