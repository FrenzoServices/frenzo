import React, { useState, useEffect } from 'react';
import Section from '../components/ui/Section';
import { Check, ArrowRight, Zap, Shield, Crown, Loader2, Smartphone, Globe, Cpu, Bot, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);

  // Calculator State
  const [platform, setPlatform] = useState('web'); // web, mobile, ecosystem
  const [intelligence, setIntelligence] = useState('none'); // none, chatbot, agent
  const [design, setDesign] = useState('custom'); // template, custom, motion
  const [features, setFeatures] = useState([]);

  // Pricing Matrix
  const rates = {
    USD: {
      platform: { web: 2500, mobile: 5000, ecosystem: 9000 },
      intelligence: { none: 0, chatbot: 1500, agent: 5000 },
      design: { template: 0, custom: 2000, motion: 4000 },
      features: {
        cms: 500,
        auth: 1000,
        payments: 1000,
        analytics: 500,
      }
    },
    INR: {
      platform: { web: 85000, mobile: 180000, ecosystem: 350000 },
      intelligence: { none: 0, chatbot: 50000, agent: 150000 },
      design: { template: 0, custom: 60000, motion: 120000 },
      features: {
        cms: 15000,
        auth: 30000,
        payments: 30000,
        analytics: 15000,
      }
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.country_code === 'IN') {
          setCurrency('INR');
        } else {
          setCurrency('USD');
        }
      } catch (error) {
        console.error('Failed to detect location, defaulting to USD', error);
        setCurrency('USD');
      } finally {
        setLoading(false);
      }
    };
    fetchLocation();
  }, []);

  // Calculation Logic
  const calculateTotal = () => {
    const r = rates[currency];
    let total = r.platform[platform];
    total += r.intelligence[intelligence];
    total += r.design[design];
    
    features.forEach(f => {
      total += r.features[f];
    });

    return total;
  };

  const formatPrice = (amount) => {
    return currency === 'USD' 
      ? `$${amount.toLocaleString()}` 
      : `₹${amount.toLocaleString()}`;
  };

  const toggleFeature = (f) => {
    if (features.includes(f)) {
      setFeatures(features.filter(i => i !== f));
    } else {
      setFeatures([...features, f]);
    }
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      
      {/* Hero Section */}
      <Section dark>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Build Your Empire
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}>
            From simple web apps to AI-powered mobile ecosystems. Define your scale.
          </p>
          <Link to="/services" style={{ color: 'var(--accent-primary)', fontWeight: '600', textDecoration: 'none', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
             Not sure what you need? Explore our Services <ArrowRight size={16} />
          </Link>
          {loading && <div style={{ marginTop: '2rem', color: '#666', display: 'flex', justifyContent: 'center', gap: '8px' }}><Loader2 className="spin" size={20} /> calibration location pricing...</div>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* THE ANCHOR: Loss Leader */}
          <div style={{ 
            background: '#050505', 
            border: '1px solid #222', 
            borderRadius: '24px', 
            padding: '2.5rem', 
            display: 'flex', 
            flexDirection: 'column', 
            height: 'fit-content' 
          }}>
            <div style={{ background: '#222', width: 'fit-content', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>
              THE STARTER
            </div>
            
            <h3 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', fontWeight: '800', lineHeight: 1 }}>
              {currency === 'USD' ? '$50' : '₹2,000'}
            </h3>
            <p style={{ color: '#666', marginBottom: '2rem' }}>One-time payment.</p>

            <div style={{ padding: '1.5rem', background: '#111', borderRadius: '16px', marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#ccc', lineHeight: '1.6' }}>
                <strong style={{ color: '#fff' }}>The "No Excuses" Plan.</strong><br/>
                We deploy a professional HTML5 portfolio/landing page for you.
              </p>
            </div>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', flex: 1 }}>
               {[
                 'Static HTML5/CSS3 Site', 
                 'Hosted on GitHub Pages (Free)', 
                 'You provide Domain + Text', 
                 'Delivery in 48 Hours',
                 'No CMS / No Backend'
                ].map((item, i) => (
                 <li key={i} style={{ display: 'flex', gap: '10px', color: '#888', fontSize: '0.95rem' }}>
                   <Check size={18} color="#444" /> {item}
                 </li>
               ))}
            </ul>

            <Link to="/contact" state={{ plan: `Starter Plan (${currency === 'USD' ? '$50' : '₹2,000'})`, details: 'I want to claim the Launch Offer for a static portfolio site.' }} style={{ 
              width: '100%', 
              padding: '1rem', 
              background: '#fff', 
              color: '#000', 
              borderRadius: '12px', 
              textAlign: 'center', 
              fontWeight: 'bold',
              textDecoration: 'none'
            }}>
              Claim Starter Spot
            </Link>
          </div>


          {/* THE CALCULATOR: Empire Builder */}
          <div style={{ 
            background: '#111', 
            border: '1px solid #333', 
            borderRadius: '24px', 
            padding: '2.5rem',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <div style={{ background: 'var(--accent-primary)', position: 'absolute', top: '-15px', right: '2rem', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', color: '#fff' }}>
              CUSTOM BUILDER
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Configure Your Platform</h2>

            {/* 1. Platform Type */}
            <div style={{ marginBottom: '2rem' }}>
               <label style={{ display: 'block', color: '#888', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>1. Platform Scale</label>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem' }}>
                  {[
                    { id: 'web', label: 'Web Application', icon: Globe },
                    { id: 'mobile', label: 'Mobile App', icon: Smartphone },
                    { id: 'ecosystem', label: 'Ecosystem', icon: Layers }
                  ].map(p => (
                    <button 
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      style={{ 
                        padding: '0.8rem', borderRadius: '12px', border: platform === p.id ? '2px solid var(--accent-primary)' : '1px solid #333',
                        background: platform === p.id ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                        textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
                      }}
                    >
                       <p.icon size={20} color={platform === p.id ? '#fff' : '#666'} />
                       <span style={{ fontSize: '0.8rem', color: platform === p.id ? '#fff' : '#888', fontWeight: '600' }}>{p.label}</span>
                    </button>
                  ))}
               </div>
            </div>

            {/* 2. Intelligence Layer */}
            <div style={{ marginBottom: '2rem' }}>
               <label style={{ display: 'block', color: '#888', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>2. Intelligence Layer</label>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.8rem' }}>
                  <button 
                    onClick={() => setIntelligence('none')}
                     style={{ 
                      padding: '0.8rem 1rem', borderRadius: '8px', 
                      border: intelligence === 'none' ? '1px solid #fff' : '1px solid #333',
                      background: intelligence === 'none' ? '#222' : 'transparent', textAlign: 'left', color: '#fff'
                    }}
                  >
                    No AI (Standard Logic)
                  </button>
                  <button 
                    onClick={() => setIntelligence('chatbot')}
                     style={{ 
                      padding: '0.8rem 1rem', borderRadius: '8px', 
                      border: intelligence === 'chatbot' ? '1px solid var(--accent-primary)' : '1px solid #333',
                      background: intelligence === 'chatbot' ? 'rgba(37, 99, 235, 0.15)' : 'transparent', textAlign: 'left', color: '#fff',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}
                  >
                    <span>Smart Chatbot (RAG/Support)</span> <Bot size={16} color="var(--accent-primary)"/>
                  </button>
                  <button 
                    onClick={() => setIntelligence('agent')}
                     style={{ 
                      padding: '0.8rem 1rem', borderRadius: '8px', 
                      border: intelligence === 'agent' ? '1px solid var(--accent-primary)' : '1px solid #333',
                      background: intelligence === 'agent' ? 'rgba(37, 99, 235, 0.15)' : 'transparent', textAlign: 'left', color: '#fff',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}
                  >
                    <span>Autonomous Agents (Complex Tasks)</span> <Cpu size={16} color="var(--accent-primary)"/>
                  </button>
               </div>
            </div>

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
                        textTransform: 'capitalize', fontWeight: '500'
                      }}
                    >
                      {d}
                    </button>
                  ))}
               </div>
            </div>

            {/* 4. Core Features */}
            <div style={{ marginBottom: '3rem' }}>
               <label style={{ display: 'block', color: '#888', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>4. Core Infrastructure</label>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                  {[
                    { id: 'auth', label: 'User Auth + DB' },
                    { id: 'payments', label: 'Payment Gateway' },
                    { id: 'cms', label: 'CMS Dashboard' },
                    { id: 'analytics', label: 'Adv. Analytics' }
                  ].map((feat) => (
                    <div 
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      style={{ 
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', cursor: 'pointer',
                        border: features.includes(feat.id) ? '1px solid var(--accent-primary)' : '1px solid #222',
                        background: features.includes(feat.id) ? 'rgba(37, 99, 235, 0.05)' : 'transparent',
                        fontSize: '0.9rem'
                      }}
                    >
                       <div style={{ 
                         width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #555', 
                         background: features.includes(feat.id) ? 'var(--accent-primary)' : 'transparent',
                         display: 'flex', alignItems: 'center', justifyContent: 'center'
                       }}>
                         {features.includes(feat.id) && <Check size={12} color="#fff" />}
                       </div>
                       <span style={{ color: features.includes(feat.id) ? '#fff' : '#888' }}>{feat.label}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* TOTAL */}
            <div style={{ borderTop: '1px solid #333', paddingTop: '2rem', marginTop: '2rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
                  <span style={{ color: '#888' }}>Estimated Investment</span>
                  <span style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: 1, color: 'var(--accent-primary)' }}>
                    {loading ? '...' : formatPrice(calculateTotal())}
                  </span>
               </div>
               
               <Link to="/contact" state={{ 
                 plan: 'Custom Empire Build', 
                 features: `Platform: ${platform}, AI: ${intelligence}, Design: ${design}, Infra: ${features.join(', ')}`,
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
                 *Final quote provided after technical discovery call.
               </p>
            </div>

          </div>

        </div>
      </Section>
    </div>
  );
};

export default Pricing;
