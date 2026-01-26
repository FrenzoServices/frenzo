import React, { useEffect } from 'react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  useEffect(() => {
    // Optional: Fire a manual event just in case URL tracking fails
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        'event_category': 'form',
        'event_label': 'contact_success'
      });
    }
  }, []);

  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      <Section>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '4rem auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '2rem', borderRadius: '50%' }}>
              <CheckCircle size={64} color="var(--accent-primary)" />
            </div>
          </div>
          
          <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1 }}>
            Message Sent!
          </h1>
          
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
            Your email client should have opened. If you sent the email, we'll get back to you within 24 hours.
          </p>

          <Button to="/" variant="primary">
            Back to Home
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default ThankYou;
