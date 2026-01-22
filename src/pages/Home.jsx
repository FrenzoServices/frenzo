import React from 'react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ArrowRight, Globe, Cpu, DollarSign, Layers } from 'lucide-react';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: 'radial-gradient(circle at 50% 50%, #111 0%, #050505 60%)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'var(--header-height)'
      }}>
        {/* Background elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '400px',
          height: '400px',
          background: 'var(--accent-primary)',
          filter: 'blur(180px)',
          opacity: 0.1,
          borderRadius: '50%',
          zIndex: 0
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            fontWeight: '800', 
            marginBottom: '1.5rem',
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}>
            Build Beyond Platforms. <br />
            <span style={{ 
              background: 'linear-gradient(to right, #fff, #94a3b8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Own Your Growth.</span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-secondary)',
            maxWidth: '650px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            Frenzo empowers creators and businesses to build independent digital systems, control their revenue, and scale without limits.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button to="/contact" variant="primary">Start a Project <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} /></Button>
            <Button to="/vision" variant="outline">Our Vision</Button>
          </div>
        </div>
      </section>

      {/* Value Prop */}
      <Section>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>The Freedom to Scale</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Stop renting your audience. Start owning your business.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <Card>
            <Globe size={40} color="var(--accent-primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Platform Independence</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Reduce dependency on algorithms and third-party rules. Build systems you control.</p>
          </Card>
          <Card>
            <DollarSign size={40} color="var(--accent-primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Direct Monetization</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Keep more of what you earn. Custom payment flows and zero platform fees.</p>
          </Card>
          <Card>
            <Cpu size={40} color="var(--accent-primary)" style={{ marginBottom: '1.5rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Intelligent Automation</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Leverage AI to automate operations, content workflows, and growth.</p>
          </Card>
        </div>
      </Section>

      {/* Services Snippet */}
      <Section dark>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Growth Infrastructure</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', width: '100%' }}>
            {[
              { icon: <Layers size={24} />, title: 'Monetization Platforms', desc: 'Custom storefronts and membership systems.' },
              { icon: <Globe size={24} />, title: 'Custom Web Apps', desc: 'Scalable tailored applications for your business.' },
              { icon: <Cpu size={24} />, title: 'AI Automation', desc: 'Workflows that save time and optimize revenue.' }
            ].map((item, i) => (
              <div key={i} style={{ 
                padding: '2rem', 
                border: '1px solid var(--border-light)',
                borderRadius: '1rem',
                textAlign: 'left',
                background: 'var(--bg-secondary)'
              }}>
                <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>{item.icon}</div>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '3rem' }}>
            <Button to="/services" variant="outline">View All Solutions</Button>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div style={{ 
          background: 'linear-gradient(135deg, #111 0%, #000 100%)', 
          borderRadius: '2rem', 
          padding: '4rem 2rem', 
          textAlign: 'center',
          border: '1px solid var(--border-light)',
          position: 'relative',
          overflow: 'hidden'
        }}>
           <div style={{
            position: 'absolute',
            top: '-50%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '600px',
            background: 'var(--accent-primary)',
            filter: 'blur(200px)',
            opacity: 0.1,
            zIndex: 0
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to Scale?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
              Join the next generation of independent digital businesses.
            </p>
            <Button to="/contact" variant="primary">Book a Strategy Call</Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Home;
