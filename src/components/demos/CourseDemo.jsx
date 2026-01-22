import React, { useState } from 'react';
import { Play, CheckCircle, Lock, Menu } from 'lucide-react';

const CourseDemo = () => {
  const [activeLesson, setActiveLesson] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default open on desktop

  const lessons = [
    { title: 'Welcome to the Course', duration: '2:15', completed: true },
    { title: 'Chapter 1: The Foundations', duration: '14:20', completed: true },
    { title: 'Chapter 2: Building Your System', duration: '22:45', completed: false },
    { title: 'Chapter 3: Advanced Automation', duration: '18:10', completed: false, locked: true },
    { title: 'Chapter 4: Scaling Up', duration: '15:00', completed: false, locked: true },
  ];

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'row', position: 'relative', overflow: 'hidden' }}>
      
      {/* Mobile Toggle */}
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 20, display: 'none' }} className="mobile-toggle">
         <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: '#222', border: 'none', color: '#fff', padding: '5px', borderRadius: '4px' }}>
            <Menu size={20} />
         </button>
      </div>

      {/* Sidebar - Lessons */}
      <div style={{ 
        width: sidebarOpen ? '300px' : '0', 
        background: '#1a1a1a', 
        borderRight: '1px solid #333', 
        transition: 'width 0.3s ease',
        overflowY: 'auto',
        flexShrink: 0,
        position: 'relative' // For mobile overlay if needed, but keeping it simple flex for now
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #333' }}>
          <h4 style={{ color: '#fff', margin: 0 }}>Masterclass 2026</h4>
          <p style={{ color: '#666', fontSize: '0.8rem', marginTop: '0.5rem' }}>45% Completed</p>
          <div style={{ width: '100%', height: '4px', background: '#333', marginTop: '0.5rem', borderRadius: '2px' }}>
             <div style={{ width: '45%', height: '100%', background: '#4ade80', borderRadius: '2px' }}></div>
          </div>
        </div>
        <div>
          {lessons.map((lesson, i) => (
             <div 
               key={i}
               onClick={() => !lesson.locked && setActiveLesson(i)}
               style={{ 
                 padding: '1rem 1.5rem', 
                 borderBottom: '1px solid #252525', 
                 cursor: lesson.locked ? 'not-allowed' : 'pointer',
                 background: activeLesson === i ? '#252525' : 'transparent',
                 opacity: lesson.locked ? 0.5 : 1,
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'space-between'
               }}
             >
               <div>
                 <p style={{ color: activeLesson === i ? '#fff' : '#aaa', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{lesson.title}</p>
                 <span style={{ fontSize: '0.75rem', color: '#555' }}>{lesson.duration}</span>
               </div>
               {lesson.completed ? <CheckCircle size={16} color="#4ade80" /> : lesson.locked ? <Lock size={14} color="#555" /> : <Play size={14} color="#888" />}
             </div>
          ))}
        </div>
      </div>

      {/* Main Content - Video */}
      <div style={{ flex: 1,  background: '#111', display: 'flex', flexDirection: 'column' }}>
        <div style={{ 
           flex: 1, 
           background: '#000', 
           display: 'flex', 
           alignItems: 'center', 
           justifyContent: 'center',
           position: 'relative'
        }}>
           <div style={{ 
             width: '60px', 
             height: '60px', 
             borderRadius: '50%', 
             background: 'rgba(255,255,255,0.1)', 
             display: 'flex', 
             alignItems: 'center', 
             justifyContent: 'center',
             cursor: 'pointer',
             backdropFilter: 'blur(10px)'
           }}>
              <Play size={24} color="#fff" fill="#fff" />
           </div>
           
           {/* Video UI Overlay */}
           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
             <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.2)', marginBottom: '1rem', cursor: 'pointer' }}>
               <div style={{ width: '30%', height: '100%', background: '#3b82f6' }}></div>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '0.8rem' }}>
               <span>04:20 / 14:20</span>
               <span>HD</span>
             </div>
           </div>
        </div>
        
        <div style={{ padding: '1.5rem', background: '#111' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ color: '#fff', fontSize: '1.2rem', margin: 0 }}>{lessons[activeLesson].title}</h2>
            <button style={{ 
              background: '#3b82f6', 
              color: '#fff', 
              border: 'none', 
              padding: '0.5rem 1.2rem', 
              borderRadius: '2rem',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}>Mark as Complete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDemo;
