import React from 'react';
import Section from '../components/ui/Section';

const HowItWorks = () => {
  const steps = [
    { title: 'Discovery', desc: 'We dive deep into your business model, audience, and revenue goals to identify growth bottlenecks.' },
    { title: 'Strategy', desc: 'We architect a custom digital ecosystem tailored to your specific needs, focusing on scalability and ownership.' },
    { title: 'Build', desc: 'Our engineering team develops your custom platforms, automations, and apps using high-performance technology.' },
    { title: 'Launch', desc: 'We deploy your systems, ensuring everything is optimized for conversions, speed, and user experience.' },
    { title: 'Optimize', desc: 'We use data and AI to continuously refine your systems, maximizing growth and efficiency over time.' }
  ];

  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      <Section>
        <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '4rem' }}>How Frenzo Works</h1>
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical Line */}
          <div style={{ 
            position: 'absolute', 
            left: '2rem', 
            top: '0', 
            bottom: '0', 
            width: '2px', 
            background: 'var(--border-light)',
            zIndex: 0
          }} />

          {steps.map((step, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              gap: '3rem', 
              marginBottom: '3rem', 
              position: 'relative', 
              zIndex: 1 
            }}>
              <div style={{ 
                width: '4rem', 
                height: '4rem', 
                background: 'var(--bg-secondary)', 
                border: '1px solid var(--accent-primary)',
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: 'var(--brand-primary)',
                flexShrink: 0
              }}>
                {i + 1}
              </div>
              <div style={{ paddingTop: '0.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default HowItWorks;
