import React, { useState } from 'react';
import { X, Search, Check, AlertCircle } from 'lucide-react';
import { projectService } from '../api/projectService';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

const CreateProjectModal = ({ onClose, onProjectCreated }) => {
  const [step, setStep] = useState(1); // 1: Select Client, 2: Project Details
  const [emailQuery, setEmailQuery] = useState('');
  const [foundUser, setFoundUser] = useState(null);
  const [searchStatus, setSearchStatus] = useState('idle'); // idle, searching, found, not-found
  
  const [formData, setFormData] = useState({
    title: '',
    requirements: '',
    estimatedCost: '',
    adminNotes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search User by Email
  const handleUserSearch = async (e) => {
    e.preventDefault();
    if (!emailQuery) return;
    
    setSearchStatus('searching');
    setFoundUser(null);
    
    try {
      // NOTE: Queries 'users' collection. Ensure index exists or this is simple enough.
      const q = query(collection(db, 'users'), where('email', '==', emailQuery));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const userDoc = snapshot.docs[0];
        setFoundUser({ id: userDoc.id, ...userDoc.data() });
        setSearchStatus('found');
      } else {
        setSearchStatus('not-found');
      }
    } catch (err) {
      console.error("Search error:", err);
      // Fallback manual entry if search fails (allows creating project even if user db isn't perfect)
      setSearchStatus('not-found');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foundUser) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const projectData = {
        title: formData.title,
        requirements: formData.requirements,
        estimatedCost: Number(formData.estimatedCost),
        adminNotes: formData.adminNotes,
        clientId: foundUser.id,
        clientEmail: foundUser.email,
        clientName: foundUser.displayName || 'Client',
        isPublic: false
      };
      
      await projectService.createProject(projectData);
      onProjectCreated();
      onClose();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: '#111', border: '1px solid #333', borderRadius: '16px',
        width: '90%', maxWidth: '600px', padding: '2rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {step === 1 ? '1. Select Client' : '2. Project Details'}
          </h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {step === 1 && (
          <div>
            <form onSubmit={handleUserSearch} style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
              <input 
                type="email" 
                placeholder="Search Client Email..." 
                value={emailQuery}
                onChange={(e) => setEmailQuery(e.target.value)}
                style={{
                  flex: 1, padding: '12px', borderRadius: '8px', 
                  background: '#222', border: '1px solid #444', color: '#fff'
                }}
              />
              <button type="submit" style={{
                padding: '0 20px', borderRadius: '8px', background: 'var(--accent-primary)',
                border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center'
              }}>
                <Search size={18} />
              </button>
            </form>

            {searchStatus === 'searching' && <p style={{color:'#888'}}>Searching...</p>}
            
            {searchStatus === 'not-found' && (
              <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', display: 'flex', gap: '10px' }}>
                <AlertCircle size={20} />
                <span>User not found in 'users' collection. Ask them to sign up first.</span>
              </div>
            )}

            {searchStatus === 'found' && foundUser && (
              <div style={{ 
                padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', 
                borderRadius: '8px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div>
                   <h4 style={{ color: '#fff', marginBottom: '4px' }}>{foundUser.displayName || 'Unknown Name'}</h4>
                   <p style={{ color: '#22c55e', fontSize: '0.9rem' }}>{foundUser.email}</p>
                </div>
                <div style={{ background: '#22c55e', padding: '4px', borderRadius: '50%' }}>
                  <Check size={16} color="#000" />
                </div>
              </div>
            )}
            
            {foundUser && (
               <button 
                 onClick={() => setStep(2)}
                 style={{ 
                   width: '100%', padding: '14px', borderRadius: '8px', 
                   background: '#fff', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer'
                 }}
               >
                 Continue &rarr;
               </button>
            )}
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             
             <div>
                <label style={{ display: 'block', color:'#888', fontSize:'0.9rem', marginBottom:'6px' }}>Project Title</label>
                <input 
                  required
                  value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. E-commerce Platform Redesign"
                  style={{ width:'100%', padding: '12px', borderRadius: '8px', background: '#222', border: '1px solid #444', color: '#fff' }}
                />
             </div>

             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color:'#888', fontSize:'0.9rem', marginBottom:'6px' }}>Client (Locked)</label>
                  <input 
                    disabled
                    value={foundUser?.email}
                    style={{ width:'100%', padding: '12px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #333', color: '#666' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color:'#888', fontSize:'0.9rem', marginBottom:'6px' }}>Est. Cost (INR)</label>
                  <input 
                    type="number" required
                    value={formData.estimatedCost} onChange={e => setFormData({...formData, estimatedCost: e.target.value})}
                    placeholder="50000"
                    style={{ width:'100%', padding: '12px', borderRadius: '8px', background: '#222', border: '1px solid #444', color: '#fff' }}
                  />
                </div>
             </div>

             <div>
                <label style={{ display: 'block', color:'#888', fontSize:'0.9rem', marginBottom:'6px' }}>Initial Requirements (Public to Client)</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})}
                  placeholder="Describe the scope, deliverables, and goals..."
                  style={{ width:'100%', padding: '12px', borderRadius: '8px', background: '#222', border: '1px solid #444', color: '#fff', fontSize: '1rem', fontFamily: 'inherit' }}
                />
             </div>
             
             <div>
                <label style={{ display: 'block', color:'#888', fontSize:'0.9rem', marginBottom:'6px' }}>Admin Notes (Private)</label>
                <textarea 
                  rows={2}
                  value={formData.adminNotes} onChange={e => setFormData({...formData, adminNotes: e.target.value})}
                  placeholder="Internal notes about budget flexibility, risks, etc."
                  style={{ width:'100%', padding: '12px', borderRadius: '8px', background: '#222', border: '1px solid #444', color: '#fff', fontFamily: 'inherit' }}
                />
             </div>
             
             {error && <p style={{ color: '#ef4444', fontSize:'0.9rem' }}>Error: {error}</p>}

             <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button 
                  type="button" onClick={() => setStep(1)}
                  style={{ flex: 1, padding: '14px', borderRadius: '8px', background: 'transparent', border: '1px solid #333', color: '#fff', cursor: 'pointer' }}
                >
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  style={{ 
                    flex: 2, padding: '14px', borderRadius: '8px', 
                    background: loading ? '#555' : 'var(--accent-primary)', 
                    color: '#fff', border: 'none', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' 
                  }}
                >
                  {loading ? 'Creating...' : 'Start Project'}
                </button>
             </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateProjectModal;
