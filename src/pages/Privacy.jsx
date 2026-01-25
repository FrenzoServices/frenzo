import React from 'react';
import Section from '../components/ui/Section';

const Privacy = () => {
  return (
    <div style={{ paddingTop: '80px' }}>
      <Section>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
           <h1 style={{ marginBottom: '2rem' }}>Privacy Policy</h1>
           <p style={{ color: '#666', marginBottom: '1rem' }}>Last updated: January 2026</p>
           
           <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>1. Data Collection</h2>
           <p style={{ color: '#ccc', lineHeight: '1.6' }}>We collect minimal data necessary to provide our services, such as your name and email address when you contact us. We do not sell your data.</p>

           <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>2. Platform Independence</h2>
           <p style={{ color: '#ccc', lineHeight: '1.6' }}>The platforms we build for you are legally owned by you. We do not have backend access to your user data after the handover process is complete.</p>

           <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>3. Analytics</h2>
           <p style={{ color: '#ccc', lineHeight: '1.6' }}>We use privacy-friendly analytics to improve our website experience. No personal identifiable information (PII) is tracked.</p>
        </div>
      </Section>
    </div>
  );
};

export default Privacy;
