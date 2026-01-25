import React from 'react';
import Section from '../components/ui/Section';

const Terms = () => {
  return (
    <div style={{ paddingTop: '80px' }}>
      <Section>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
           <h1 style={{ marginBottom: '2rem' }}>Terms of Service</h1>
           <p style={{ color: '#666', marginBottom: '1rem' }}>Last updated: January 2026</p>
           
           <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>1. Agreement</h2>
           <p style={{ color: '#ccc', lineHeight: '1.6' }}>By accessing Frenzo services, you agree to be bound by these Terms of Service. If you do not agree to agree, you may not access our services.</p>

           <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>2. Intellectual Property</h2>
           <p style={{ color: '#ccc', lineHeight: '1.6' }}>Unlike traditional agencies, **Frenzo grants you full ownership** of the code we build for you upon full payment. We retain no rights to your customer data or platform revenue.</p>

           <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>3. Payments</h2>
           <p style={{ color: '#ccc', lineHeight: '1.6' }}>Projects are billed in milestones: 50% upfront, 50% upon delivery. All payments are non-refundable once work has commenced.</p>
        </div>
      </Section>
    </div>
  );
};

export default Terms;
