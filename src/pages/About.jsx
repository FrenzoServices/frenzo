import React from 'react';
import Section from '../components/ui/Section';

const About = () => {
  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      <Section>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>About Frenzo</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Frenzo is a global digital growth systems company focused on helping creators and businesses build independent, scalable, and revenue-driven digital infrastructure.
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
            We believe that true growth comes from ownership. In a world where platforms control visibility and monetization, we build the systems that give control back to you.
          </p>
        </div>
      </Section>
    </div>
  );
};

export default About;
