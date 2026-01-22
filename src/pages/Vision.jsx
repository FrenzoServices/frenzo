import React from 'react';
import Section from '../components/ui/Section';

const Vision = () => {
  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      <Section>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Our Vision</h1>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '4rem' }}>
            To become the world’s leading platform for independent digital growth and intelligent business automation.
          </p>
          
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>The Roadmap</h3>
            <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', fontSize: '1.1rem', space: '1rem' }}>
              <li style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '2px solid var(--accent-primary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Stage 1:</strong> Service-Led Growth
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '2px solid var(--text-tertiary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Stage 2:</strong> Platform Ecosystem
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '2px solid var(--text-tertiary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Stage 3:</strong> Creator Tools
              </li>
              <li style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '2px solid var(--text-tertiary)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Stage 4:</strong> AI Intelligence
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Vision;
