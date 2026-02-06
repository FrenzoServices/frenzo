import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, ChevronRight, Clock } from 'lucide-react';
import { projectService } from '../api/projectService';
import { PROJECT_STATUS } from '../constants';

const UserProjectList = ({ userId }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchProjects();
    }
  }, [userId]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getProjects(userId, false); 
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ color: '#666', marginTop: '1rem' }}>Loading projects...</div>;
  if (error) return <div style={{ color: '#ef4444', marginTop: '1rem' }}>{error}</div>;

  if (projects.length === 0) return null; // Don't show anything if no projects

  return (
    <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-light)', paddingTop: '2rem' }}>
       <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
         <Briefcase size={20} color="var(--accent-primary)" />
         My Projects
       </h3>
       
       <div style={{ display: 'grid', gap: '1rem' }}>
          {projects.map(project => (
            <div 
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              style={{ 
                background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem',
                cursor: 'pointer', transition: '0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}
            >
               <div>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem' }}>{project.title}</h4>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                     <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                       <Clock size={14} /> Updated: {project.updatedAt?.toDate ? project.updatedAt.toDate().toLocaleDateString() : 'Recently'}
                     </span>
                     <span>•</span>
                     <span style={{ 
                       color: project.status === PROJECT_STATUS.COMPLETED ? '#10b981' : 'var(--accent-primary)',
                       fontWeight: '500'
                     }}>
                       {project.status}
                     </span>
                  </div>
               </div>
               
               <div style={{ color: 'var(--text-tertiary)' }}>
                  <ChevronRight size={24} />
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};

export default UserProjectList;
