import React from 'react';
import { useLocation } from 'react-router-dom';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';

const Contact = () => {
  const { state } = useLocation();
  
  const getInitialDetails = () => {
    if (state?.details) return state.details;
    if (state?.plan) {
      return `I'm interested in: ${state.plan}\n\n${state.features ? 'Features: ' + state.features + '\n' : ''}${state.estimatedPrice ? 'Estimated Budget: ' + state.estimatedPrice + '\n' : ''}`;
    }
    return '';
  };

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    details: getInitialDetails()
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Project Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nProject Details:\n${formData.details}`;
    window.location.href = `mailto:contact@frenzo.services?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Name</label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text" 
                required
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-light)', 
                  color: 'var(--text-primary)',
                  borderRadius: '0.5rem'
                }} 
                placeholder="Enter your name" 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email</label>
              <input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email" 
                required
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-light)', 
                  color: 'var(--text-primary)',
                  borderRadius: '0.5rem'
                }} 
                placeholder="Enter your email" 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Project Details</label>
              <textarea 
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-light)', 
                  color: 'var(--text-primary)',
                  borderRadius: '0.5rem',
                  minHeight: '150px'
                }} 
                placeholder="Tell us about your project" 
              />
            </div>
            <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1rem', padding: '1.2rem', fontSize: '1.1rem' }}>
              Send Message (Open Email)
            </Button>
          </form>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
