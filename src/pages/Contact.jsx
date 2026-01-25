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
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
             <div style={{ background: '#111', padding: '1rem 1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
                <div style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Email</div>
                <div style={{ fontWeight: '600' }}>contact@frenzo.services</div>
             </div>
             <div style={{ background: '#111', padding: '1rem 1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
                <div style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Phone</div>
                <div style={{ fontWeight: '600' }}>+91 8904045305</div>
             </div>
          </div>
          
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
