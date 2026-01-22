import React, { useState } from 'react';
import { Mail, Instagram, Twitter, Youtube, Link as LinkIcon, ArrowRight } from 'lucide-react';

const CreatorDemo = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if(email) setSubscribed(true);
    };

    return (
        <div style={{ 
            height: '100%', 
            background: '#ffffff', 
            color: '#000', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '2rem 1rem',
            overflowY: 'auto'
        }}>
            {/* Avatar */}
            <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'linear-gradient(45deg, #ff00cc, #333399)',
                marginBottom: '1rem',
                border: '4px solid #fff',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}></div>

            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Sarah Creates</h1>
            <p style={{ color: '#666', textAlign: 'center', maxWidth: '400px', marginBottom: '2rem', fontSize: '0.95rem' }}>
                Digital artist & storyteller. Teaching you how to build a creative career.
            </p>

            {/* Links */}
            <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '3rem' }}>
                {['My Design Course', 'Download Free Brushes', 'Book a Consultation', 'Latest YouTube Video'].map((link, i) => (
                    <div key={i} style={{ 
                        padding: '1rem', 
                        background: '#f8f8f8', 
                        borderRadius: '12px', 
                        textAlign: 'center',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        border: '1px solid #eee'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#f0f0f0'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#f8f8f8'; e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                        {link}
                    </div>
                ))}
            </div>

            {/* Newsletter */}
            <div style={{ width: '100%', maxWidth: '400px', background: '#000', padding: '1.5rem', borderRadius: '16px', color: '#fff', textAlign: 'center' }}>
                <div style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Join 15k+ Creators</div>
                {!subscribed ? (
                    <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                        <input 
                            type="email" 
                            placeholder="Your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ 
                                flex: 1, 
                                padding: '0.8rem', 
                                borderRadius: '8px', 
                                border: 'none', 
                                outline: 'none',
                                background: 'rgba(255,255,255,0.15)',
                                color: '#fff'
                            }} 
                        />
                        <button type="submit" style={{ 
                            background: '#fff', 
                            color: '#000', 
                            border: 'none', 
                            borderRadius: '8px', 
                            width: '40px', 
                            cursor: 'pointer',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center'
                        }}>
                            <ArrowRight size={18} />
                        </button>
                    </form>
                ) : (
                    <div style={{ color: '#4ade80', fontWeight: 'bold', padding: '0.5rem' }}>You're in! Check your inbox.</div>
                )}
            </div>
            
            {/* Socials */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', color: '#888' }}>
                <Instagram size={20} />
                <Twitter size={20} />
                <Youtube size={20} />
                <Mail size={20} />
            </div>
        </div>
    );
};

export default CreatorDemo;
