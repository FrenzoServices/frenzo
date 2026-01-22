import React from 'react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';

const Services = () => {
  const services = [
    { title: 'Monetization Platforms', desc: 'Custom web platforms to sell courses, products, and memberships without middleman fees.' },
    { title: 'Data & Analytics', desc: 'Advanced tracking to understand your audience and optimize revenue.' },
    { title: 'Automation Systems', desc: 'Workflows that run your business 24/7, from client onboarding to support.' },
    { title: 'Mobile Applications', desc: 'Native iOS and Android apps to engage your community directly.' }
  ];

  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      <Section>
         <h1 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>Our Services</h1>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {services.map((s, i) => (
              <Card key={i}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              </Card>
            ))}
         </div>
      </Section>
    </div>
  );
};

export default Services;
