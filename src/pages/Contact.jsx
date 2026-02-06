import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { COMPANY_INFO } from '../constants';

const Contact = () => {
  const { state } = useLocation();
  const { currentUser } = useAuth();
  
  const getInitialDetails = () => {
    if (state?.details) return state.details;
    if (state?.plan) {
      return `I'm interested in: ${state.plan}\n\n${state.features ? 'Features: ' + state.features + '\n' : ''}${state.estimatedPrice ? 'Estimated Budget: ' + state.estimatedPrice + '\n' : ''}`;
    }
    return '';
  };

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    details: getInitialDetails()
  });

  const navigate = useNavigate();

  // Smart Fill Logic
  useEffect(() => {
    if (currentUser) {
        // 1. Basic Auth Info
        setFormData(prev => ({
            ...prev,
            name: currentUser.displayName || prev.name,
            email: currentUser.email || prev.email,
            phone: currentUser.phoneNumber || prev.phone
        }));

        // 2. Fetch extended profile from Firestore (for phone/company)
        const fetchProfile = async () => {
            try {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData(prev => ({
                        ...prev,
                        phone: data.phoneNumber || prev.phone, // Firestore phone overrides if present
                        // details: data.requirements ? `${prev.details}\n\n[Business Context]: ${data.requirements}` : prev.details 
                        // Optional: Append business context to details? Maybe too intrusive.
                    }));
                }
            } catch (err) {
                console.error("Error auto-filling contact form:", err);
            }
        };
        fetchProfile();
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Project Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\n\nProject Details:\n${formData.details}`;
    
    // 1. Google Ads Conversion Event
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        'event_category': 'form',
        'event_label': 'contact_submit'
      });
    }

    // 2. Open Email Client
    window.location.href = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // 3. Redirect to Thank You Page (Visual Confirmation)
    setTimeout(() => {
       navigate('/thank-you');
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      <Section>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Start a Project</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
            Ready to build your growth system? Let's talk.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
             <div style={{ background: '#111', padding: '1rem 1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
                <div style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Email</div>
                <div style={{ fontWeight: '600' }}>{COMPANY_INFO.email}</div>
             </div>
             <a 
               href={`tel:${COMPANY_INFO.phone}`} 
               onClick={(e) => {
                 if (window.gtag_report_conversion) {
                   e.preventDefault();
                   window.gtag_report_conversion('tel:+918904045305');
                 }
               }}
               style={{ background: '#111', padding: '1rem 1.5rem', borderRadius: '8px', border: '1px solid #333', textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'pointer' }}
             >
                <div style={{ color: '#888', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Phone</div>
                <div style={{ fontWeight: '600' }}>{COMPANY_INFO.phoneDisplay}</div>
             </a>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Name</label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text" 
                required
                disabled={!!currentUser?.displayName}
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-light)', 
                  color: 'var(--text-primary)',
                  borderRadius: '0.5rem',
                  opacity: currentUser?.displayName ? 0.7 : 1,
                  cursor: currentUser?.displayName ? 'not-allowed' : 'text'
                }} 
                placeholder="Enter your name" 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email</label>
              <input 
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email" 
                required
                disabled={!!currentUser?.email}
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-light)', 
                  color: 'var(--text-primary)',
                  borderRadius: '0.5rem',
                  opacity: currentUser?.email ? 0.7 : 1,
                  cursor: currentUser?.email ? 'not-allowed' : 'text'
                }} 
                placeholder="Enter your email" 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Phone (Optional)</label>
              <input 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel" 
                disabled={!!currentUser} /* Disable phone edit here if logged in, encourage profile update */
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-light)', 
                  color: 'var(--text-primary)',
                  borderRadius: '0.5rem',
                  opacity: currentUser ? 0.7 : 1,
                  cursor: currentUser ? 'not-allowed' : 'text'
                }} 
                placeholder="+91 99999 99999" 
              />
              {currentUser && <small style={{color: 'var(--text-tertiary)'}}>Update phone in your Dashboard</small>}
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Project Details</label>
              <textarea 
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-light)', 
                  color: 'var(--text-primary)',
                  borderRadius: '0.5rem',
                  minHeight: '150px'
                }} 
                placeholder="Tell us about your project" 
              />
            </div>
            <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1rem', padding: '1.2rem', fontSize: '1.1rem' }}>
              Send Message (Open Email)
            </Button>
          </form>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
