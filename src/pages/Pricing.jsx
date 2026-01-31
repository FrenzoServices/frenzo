import React, { useState } from 'react';
import Section from '../components/ui/Section';
import { Check, ArrowRight, FileText, Monitor, Globe, Smartphone, Layers, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  // Calculator State
  const [projectType, setProjectType] = useState('standard'); 
  const [intelligence, setIntelligence] = useState('none'); 
  const [design, setDesign] = useState('template'); 
  const [pages, setPages] = useState(1);
  const [features, setFeatures] = useState([]);

  // Base Rates in INR
  const inrRates = {
    type: { 
      standard: 3000,       // Dynamic Web (React Base)
      saas: 25000,          // Functional Software
      platform: 30000,      // Commerce/Marketplace
      mobile: 50000,        // Native App
      ecosystem: 80000      // Full Suite
    },
    intelligence: { none: 0, chatbot: 5000, agent: 15000 },
    design: { template: 0, custom: 5000, motion: 10000 },
    pageRate: 1000, // Per additional page
    features: {
      cms: 3000,
      auth: 3000,
      payments: 4000,
      analytics: 2000,
      seo: 2500,
      copywriting: 1500,
      logo: 1000
    }
  };

  const calculateTotal = () => {
    let total = inrRates.type[projectType] || 0;
    total += inrRates.intelligence[intelligence];
    total += inrRates.design[design];
    
    // Page cost only for web standard
    if (projectType === 'standard') {
       total += (Math.max(1, pages) - 1) * inrRates.pageRate;
    }
    
    features.forEach(f => {
      total += inrRates.features[f];
    });

    return total;
  };

  const formatPrice = (amount) => {
    return `₹${amount.toLocaleString()}`;
  };

  const toggleFeature = (f) => {
    if (features.includes(f)) {
      setFeatures(features.filter(i => i !== f));
    } else {
      setFeatures([...features, f]);
    }
  };

  // Tooltip helper
  // Tooltip helper
  const Tooltip = ({ text }) => {
    const [show, setShow] = useState(false);
    return (
      <div 
        className="tooltip-container" 
        style={{ marginLeft: '6px', position: 'relative', display: 'inline-block' }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <Info size={14} color="var(--accent-primary)" style={{ cursor: 'help' }} />
        {show && (
          <div style={{
            position: 'absolute', bottom: '25px', left: '50%', transform: 'translateX(-50%)',
            width: '200px', padding: '10px', background: '#222', border: '1px solid #444', 
            borderRadius: '8px', fontSize: '0.75rem', color: '#ccc', zIndex: 50, textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}>
            {text}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* ... Hero Section Remains ... */}
      <Section dark>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Build Your Platform
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}>
            From simple landing pages to complex ecosystems. Pricing that scales with your ambition.
          </p>
          <Link to="/services" style={{ color: 'var(--accent-primary)', fontWeight: '600', textDecoration: 'none', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
             Explore Services <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* THE ANCHOR: Starter Site */}
          <div style={{ 
            background: '#050505', 
            border: '1px solid #222', borderRadius: '24px', padding: '2.5rem', 
            display: 'flex', flexDirection: 'column', height: 'fit-content' 
          }}>
            <div style={{ background: '#222', width: 'fit-content', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>
              THE STARTER
            </div>
            <h3 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', fontWeight: '800', lineHeight: 1 }}>₹2,000</h3>
            <p style={{ color: '#666', marginBottom: '2rem' }}>One-time payment.</p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', flex: 1 }}>
               {['Professional Portfolio', 'Hosted on GitHub Pages', '100% Static HTML/CSS', 'No Backend / No Updates'].map((item, i) => (
                 <li key={i} style={{ display: 'flex', gap: '10px', color: '#888', fontSize: '0.95rem' }}><Check size={18} color="#444" /> {item}</li>
               ))}
            </ul>
            <Link to="/contact" state={{ plan: 'Starter Plan (₹2,000)', details: 'I want to claim the Launch Offer.' }} style={{ width: '100%', padding: '1rem', background: '#fff', color: '#000', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Claim Starter Spot</Link>
          </div>

          {/* THE CALCULATOR: Scale Builder */}
          <div style={{ background: '#111', border: '1px solid #333', borderRadius: '24px', padding: '2.5rem', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            <div style={{ background: 'var(--accent-primary)', position: 'absolute', top: '-15px', right: '2rem', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', color: '#fff' }}>
              CUSTOM BUILDER
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Configure Project</h2>

            {/* 1. Project Type */}
            <div style={{ marginBottom: '2rem' }}>
               <label style={{ display: 'block', color: '#888', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>1. Foundation Type</label>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '0.8rem' }}>
                  <button onClick={() => setProjectType('standard')} style={getTypeStyle('standard', projectType)}>
                     <div style={{display:'flex', alignItems:'center'}}>
                        <FileText size={18} /> <span style={{fontSize:'0.9rem', marginLeft:'6px'}}>Dynamic Web</span>
                        <Tooltip text="Interactive, scalable site using modern tech (React/Vue/etc). Best for businesses needing a future-proof presence." />
                     </div>
                  </button>
                  <button onClick={() => setProjectType('saas')} style={getTypeStyle('saas', projectType)}>
                     <div style={{display:'flex', alignItems:'center'}}>
                        <Monitor size={18} /> <span style={{fontSize:'0.9rem', marginLeft:'6px'}}>Software / SaaS</span>
                        <Tooltip text="Complex logic, dashboards, and tools. Includes state management." />
                     </div>
                  </button>
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem' }}>
                   <button onClick={() => setProjectType('platform')} style={getTypeStyle('platform', projectType)}>
                     <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                       <Globe size={18} /> <span style={{fontSize:'0.9rem', marginLeft:'6px'}}>Platform</span>
                       <Tooltip text="Marketplaces, social networks, or multi-vendor stores. Heavy on user interactions." />
                     </div>
                  </button>
                  <button onClick={() => setProjectType('mobile')} style={getTypeStyle('mobile', projectType)}>
                     <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                       <Smartphone size={18} /> <span style={{fontSize:'0.9rem', marginLeft:'6px'}}>Mobile App</span>
                       <Tooltip text="Native iOS and Android apps (React Native). Published to App Stores." />
                     </div>
                  </button>
                  <button onClick={() => setProjectType('ecosystem')} style={getTypeStyle('ecosystem', projectType)}>
                     <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                       <Layers size={18} /> <span style={{fontSize:'0.9rem', marginLeft:'6px'}}>Ecosystem</span>
                       <Tooltip text="Full suite: Web App + Mobile App + Admin Dashboard + Landing Page." />
                     </div>
                  </button>
               </div>
               
               {/* CLARIFICATION NOTE */}
               {projectType === 'standard' && (
                 <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(37,99,235,0.1)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--accent-primary)', display: 'flex', gap: '10px' }}>
                    <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>
                      <strong>Why ₹3,000 vs ₹2,000?</strong> <br/>
                      The standard foundation uses modern tech (React/Vue/etc) making it scalable. Starter is purely static HTML.
                    </span>
                 </div>
               )}
            </div>

            {/* 2. Scale (Pages) - Only for Web Types */}
            {projectType === 'standard' && (
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <label style={{ color: '#888', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>2. Scale / Pages</label>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>{pages} Pages</span>
                </div>
                <input 
                  type="range" min="1" max="20" value={pages} onChange={(e) => setPages(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: '#555' }}>
                    <span>1 Page</span>
                    <span>20+ Pages</span>
                 </div>
              </div>
            )}

            {/* 3. Design Level */}
            <div style={{ marginBottom: '2rem' }}>
               <label style={{ display: 'block', color: '#888', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>3. Design Fidelity</label>
               <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '4px' }}>
                  {['template', 'custom', 'motion'].map(d => (
                    <button 
                      key={d}
                      onClick={() => setDesign(d)}
                      style={{ 
                        flex: 1, padding: '0.8rem', borderRadius: '8px', 
                        border: design === d ? '1px solid #fff' : '1px solid #333',
                        background: design === d ? '#222' : 'transparent',
                        color: design === d ? '#fff' : '#666',
                        textTransform: 'capitalize', fontWeight: '500',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                      }}
                    >
                      {d}
                      {d === 'template' && <Tooltip text="Clean, professional UI using standard components." />}
                      {d === 'custom' && <Tooltip text="Unique branding, custom layouts, and tailored visual identity." />}
                      {d === 'motion' && <Tooltip text="High-end animations, scroll effects, and immersive interactions." />}
                    </button>
                  ))}
               </div>
            </div>
            
             {/* 4. Intelligence Layer */}
            <div style={{ marginBottom: '2rem' }}>
               <label style={{ display: 'block', color: '#888', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>4. Intelligence (AI)</label>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem' }}>
                  {['none', 'chatbot', 'agent'].map(ai => (
                    <button 
                      key={ai}
                      onClick={() => setIntelligence(ai)}
                      style={{ 
                        padding: '0.8rem', borderRadius: '8px', 
                        border: intelligence === ai ? '1px solid var(--accent-primary)' : '1px solid #333',
                        background: intelligence === ai ? 'rgba(37, 99, 235, 0.15)' : 'transparent', 
                        color: intelligence === ai ? '#fff' : '#888',
                        textTransform: 'capitalize', fontWeight: '500', fontSize: '0.9rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                      }}
                    >
                      {ai === 'none' ? 'None' : ai === 'chatbot' ? 'Smart Chatbot' : 'AI Agent'}
                      {ai === 'chatbot' && <Tooltip text="Automated Q&A bot trained on your data." />}
                      {ai === 'agent' && <Tooltip text="Autonomous agent that can perform tasks (booking, emailing, searching)." />}
                    </button>
                  ))}
               </div>
            </div>

            {/* 5. Add-ons */}
            <div style={{ marginBottom: '3rem' }}>
               <label style={{ display: 'block', color: '#888', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>5. Modules & Add-ons</label>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                  {[
                    { id: 'auth', label: 'User Auth + DB', tip: 'Secure login, signups, and user profiles.' },
                    { id: 'cms', label: 'CMS (Easy Edits)', tip: 'Admin panel to edit text/images without coding.' },
                    { id: 'payments', label: 'Payment Integration', tip: 'Stripe/Razorpay setup for accepting money.' },
                    { id: 'analytics', label: 'Advanced Analytics', tip: 'Deep insights into user behavior and conversion.' },
                    { id: 'seo', label: 'SEO Optimization', tip: 'Meta tags, sitemap, and performance tuning for Google.' },
                    { id: 'copywriting', label: 'Pro Copywriting', tip: 'Professional sales copy to convert visitors.' },
                    { id: 'logo', label: 'Logo Design', tip: 'Custom vector logo for your brand.' }
                  ].map((feat) => (
                    <div 
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      style={{ 
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', cursor: 'pointer',
                        border: features.includes(feat.id) ? '1px solid var(--accent-primary)' : '1px solid #222',
                        background: features.includes(feat.id) ? 'rgba(37, 99, 235, 0.05)' : 'transparent',
                        fontSize: '0.85rem'
                      }}
                    >
                       <div style={{ 
                         width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #555', 
                         background: features.includes(feat.id) ? 'var(--accent-primary)' : 'transparent',
                         display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                       }}>
                         {features.includes(feat.id) && <Check size={12} color="#fff" />}
                       </div>
                       <span style={{ color: features.includes(feat.id) ? '#fff' : '#888' }}>{feat.label}</span>
                       <Tooltip text={feat.tip} />
                    </div>
                  ))}
               </div>
            </div>

            {/* TOTAL */}
            <div style={{ borderTop: '1px solid #333', paddingTop: '2rem', marginTop: '2rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                  <span style={{ color: '#888' }}>Estimated Investment</span>
                  <span style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: 1, color: 'var(--accent-primary)' }}>
                    {formatPrice(calculateTotal())}
                  </span>
               </div>
               
               <Link to="/contact" state={{ 
                 plan: 'Custom Build', 
                 features: `Type: ${projectType}, Pages: ${pages}, AI: ${intelligence}, Design: ${design}, Extras: ${features.join(', ')}`,
                 estimatedPrice: formatPrice(calculateTotal())
               }} style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '1.2rem', 
                  background: 'var(--accent-primary)', color: '#fff', borderRadius: '12px', 
                  textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem',
                  boxShadow: '0 4px 20px rgba(37, 99, 235, 0.3)'
                }}>
                  Book Build Strategy <ArrowRight size={20} style={{ marginLeft: '10px' }} />
               </Link>
               <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#555', marginTop: '1rem' }}>
                 *Rough estimate. Final quote provided after discovery call.
               </p>
            </div>

          </div>

        </div>
      </Section>
    </div>
  );
};

const getTypeStyle = (id, current) => ({
  padding: '0.8rem', borderRadius: '12px', 
  border: current === id ? '2px solid var(--accent-primary)' : '1px solid #333',
  background: current === id ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
  textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
  color: current === id ? '#fff' : '#888'
});

export default Pricing;
