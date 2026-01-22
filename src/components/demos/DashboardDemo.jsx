import React, { useState, useEffect } from 'react';
import { Activity, Users, DollarSign, TrendingUp, MoreHorizontal } from 'lucide-react';

const DashboardDemo = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [liveVisitors, setLiveVisitors] = useState(124);

  // Simulate live data
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: '100%', background: '#09090b', color: '#fff', display: 'flex' }}>
      {/* Sidebar - Desktop Only */}
      <div style={{ width: '200px', borderRight: '1px solid #27272a', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }} className="desktop-only">
         <div style={{ marginBottom: '1.5rem', fontWeight: 'bold', paddingLeft: '0.5rem' }}>DASHBOARD</div>
         {['Overview', 'Analytics', 'Customers', 'Settings'].map(tab => (
           <div 
             key={tab} 
             onClick={() => setActiveTab(tab)}
             style={{ 
               padding: '0.5rem 0.8rem', 
               borderRadius: '6px', 
               background: activeTab === tab ? '#27272a' : 'transparent',
               color: activeTab === tab ? '#fff' : '#a1a1aa',
               cursor: 'pointer',
               fontSize: '0.9rem'
             }}
           >
             {tab}
           </div>
         ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{activeTab}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#27272a', padding: '0.3rem 0.6rem', borderRadius: '2rem', fontSize: '0.8rem' }}>
               <div style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e' }}></div>
               <span style={{ fontFamily: 'monospace' }}>{liveVisitors} Live</span>
            </div>
         </div>

         {/* Stats Grid */}
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#18181b', padding: '1rem', borderRadius: '8px', border: '1px solid #27272a' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#a1a1aa', fontSize: '0.8rem' }}>Total Revenue</span>
                  <DollarSign size={16} color="#a1a1aa" />
               </div>
               <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$45,231</div>
               <div style={{ color: '#22c55e', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
                  <TrendingUp size={12} /> +20.1%
               </div>
            </div>
            
            <div style={{ background: '#18181b', padding: '1rem', borderRadius: '8px', border: '1px solid #27272a' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#a1a1aa', fontSize: '0.8rem' }}>Active Users</span>
                  <Users size={16} color="#a1a1aa" />
               </div>
               <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>2,450</div>
               <div style={{ color: '#22c55e', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
                   <TrendingUp size={12} /> +12.5%
               </div>
            </div>
         </div>

         {/* Chart Placeholder */}
         <div style={{ background: '#18181b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #27272a', height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '10px' }}>
             {[30, 45, 35, 60, 55, 75, 50, 65, 80, 70, 85, 90, 60, 75, 50].map((h, i) => (
               <div key={i} style={{ width: '100%', background: '#3b82f6', height: `${h}%`, borderRadius: '4px 4px 0 0', opacity: 0.8 }}></div>
             ))}
         </div>
      </div>
    </div>
  );
};

export default DashboardDemo;
