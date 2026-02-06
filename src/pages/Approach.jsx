import React from 'react';
import Section from '../components/ui/Section';
import { Target, TrendingUp, Layers, Zap, Cpu } from 'lucide-react';

const Approach = () => {
  const steps = [
    { title: 'Discovery', icon: <Target size={24} />, desc: 'We dive deep into your business model, audience, and revenue goals to identify growth bottlenecks.' },
    { title: 'Strategy', icon: <TrendingUp size={24} />, desc: 'We architect a custom digital ecosystem tailored to your specific needs, focusing on scalability and ownership.' },
    { title: 'Build', icon: <Layers size={24} />, desc: 'Our engineering team develops your custom platforms, automations, and apps using high-performance technology.' },
    { title: 'Launch', icon: <Zap size={24} />, desc: 'We deploy your systems, ensuring everything is optimized for conversions, speed, and user experience.' },
    { title: 'Optimize', icon: <Cpu size={24} />, desc: 'We use data and AI to continuously refine your systems, maximizing growth and efficiency over time.' }
  ];

  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      {/* Hero / Vision Section */}
      {/* Hero / Vision Section */}
      <Section style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
          Our Approach
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 4rem', lineHeight: '1.6' }}>
          We combine strategic foresight with rigorous execution. Our vision is to become the world’s leading platform for independent digital growth and business automation.
        </p>
      </Section>

      {/* Process Section */}
      <Section style={{ background: '#0a0a0a' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem' }}>How We Build</h2>
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', boxSizing: 'border-box', paddingLeft: '1rem' }}>
          {/* Vertical Line */}
          <div style={{ 
            position: 'absolute', 
            left: '3rem', // Center (1rem padding + 2rem half-icon)
            transform: 'translateX(-50%)', 
            top: '2rem', 
            bottom: '0', 
            width: '2px', 
            background: 'linear-gradient(to bottom, var(--accent-primary), transparent)',
            zIndex: 0
          }} />

          {steps.map((step, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              gap: '2.5rem', 
              marginBottom: '4rem', 
              position: 'relative', 
              zIndex: 1,
              alignItems: 'flex-start' 
            }}>
              <div style={{ 
                width: '4rem', 
                height: '4rem', 
                background: '#111', 
                border: '2px solid var(--accent-primary)',
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--accent-primary)',
                flexShrink: 0,
                boxShadow: '0 0 15px rgba(251, 191, 36, 0.2)',
                boxSizing: 'border-box',
                position: 'relative',
                zIndex: 2
              }}>
                {step.icon}
              </div>
              <div style={{ paddingTop: '0.25rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff', lineHeight: '1.2' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.05rem', margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Roadmap Section */}
      <Section>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Future Roadmap</h2>
          <div style={{ 
              background: 'var(--bg-secondary)', 
              padding: '2rem', 
              borderRadius: '16px', 
              border: '1px solid var(--border-light)' 
          }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <div style={{ width: '4px', background: 'var(--accent-primary)', borderRadius: '2px' }} />
                <div>
                   <strong style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '4px' }}>Stage 1: Service-Led Growth</strong>
                   <span style={{ color: 'var(--text-secondary)' }}>Establishing manual, high-touch partnerships to define the perfect system.</span>
                </div>
              </li>
              <li style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                 <div style={{ width: '4px', background: 'var(--text-tertiary)', borderRadius: '2px' }} />
                 <div>
                   <strong style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '4px' }}>Stage 2: Platform Ecosystem</strong>
                   <span style={{ color: 'var(--text-secondary)' }}>Standardizing modules and launching the beta infrastructure.</span>
                 </div>
              </li>
              <li style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                 <div style={{ width: '4px', background: 'var(--text-tertiary)', borderRadius: '2px' }} />
                 <div>
                    <strong style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '4px' }}>Stage 3: Creator Tools</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>Empowering users to build and modify their own growth engines.</span>
                 </div>
              </li>
              <li style={{ display: 'flex', gap: '1rem' }}>
                 <div style={{ width: '4px', background: 'var(--text-tertiary)', borderRadius: '2px' }} />
                 <div>
                    <strong style={{ color: '#fff', fontSize: '1.2rem', display: 'block', marginBottom: '4px' }}>Stage 4: AI Intelligence</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>Fully autonomous business optimization and decision making.</span>
                 </div>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Approach;
