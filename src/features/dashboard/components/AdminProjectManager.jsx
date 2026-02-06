import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Folder, Clock, CheckCircle, AlertCircle, Search } from 'lucide-react';
import { projectService } from '../../projects/api/projectService';
import CreateProjectModal from '../../projects/components/CreateProjectModal';
import { PROJECT_STATUS } from '../../projects/constants';

// Helper to get Status Color
const getStatusColor = (status) => {
  switch (status) {
    case PROJECT_STATUS.REQUESTED: return '#fbbf24'; // Amber
    case PROJECT_STATUS.SCHEDULED: return '#3b82f6'; // Blue
    case PROJECT_STATUS.PAYMENT_PENDING: return '#f59e0b'; // Orange
    case PROJECT_STATUS.IN_PROGRESS: return '#8b5cf6'; // Purple
    case PROJECT_STATUS.COMPLETED: return '#10b981'; // Green
    case PROJECT_STATUS.CANCELLED: return '#ef4444'; // Red
    default: return '#666';
  }
};

const AdminProjectManager = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await projectService.getProjects(null, true); // true for Admin (all projects)
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === 'ALL' 
    ? projects 
    : projects.filter(p => p.status === filter);

  return (
    <div style={{ padding: '20px' }}>
      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
           <h2 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>Project Management</h2>
           <p style={{ color: '#888', fontSize: '0.9rem' }}>Track client deliverables, calls, and payments.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', background: '#fff', color: '#000', 
            border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255,255,255,0.1)'
          }}
        >
          <Plus size={18} /> New Project
        </button>
      </div>

      {/* Filters/Tabs */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', borderBottom: '1px solid #333', marginBottom: '2rem' }}>
        {['ALL', PROJECT_STATUS.REQUESTED, PROJECT_STATUS.IN_PROGRESS, PROJECT_STATUS.COMPLETED].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            style={{ 
              background: 'transparent', border: 'none', 
              color: filter === f ? '#fff' : '#666', 
              borderBottom: filter === f ? '2px solid #fff' : '2px solid transparent',
              padding: '8px 4px', cursor: 'pointer', fontWeight: '500'
            }}
          >
            {f === 'ALL' ? 'All Projects' : f}
          </button>
        ))}
      </div>

      {/* Project List */}
      {loading ? (
        <div style={{ color: '#666' }}>Loading projects...</div>
      ) : filteredProjects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', border: '1px dashed #333', borderRadius: '16px', color: '#666' }}>
           <Folder size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
           <p>No projects found in this view.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
           {filteredProjects.map(project => (
             <div key={project.id} style={{ 
               background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '1.5rem',
               display: 'grid', gridTemplateColumns: '2fr 1.5fr  1fr auto', alignItems: 'center', gap: '1rem',
               transition: 'border-color 0.2s', cursor: 'pointer'
             }}
             onMouseEnter={(e) => e.currentTarget.style.borderColor = '#444'}
             onMouseLeave={(e) => e.currentTarget.style.borderColor = '#222'}
             >
                {/* Title & Client */}
                <div>
                   <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', fontWeight: '600' }}>{project.title}</h3>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888', fontSize: '0.85rem' }}>
                      <span>{project.clientName}</span>
                      <span>•</span>
                      <span>{project.clientEmail}</span>
                   </div>
                </div>

                {/* Status Badge */}
                <div>
                  <span style={{ 
                    padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600',
                    background: `${getStatusColor(project.status)}20`, 
                    color: getStatusColor(project.status),
                    border: `1px solid ${getStatusColor(project.status)}40`
                  }}>
                    {project.status}
                  </span>
                </div>

                {/* Meta */}
                <div style={{ color: '#666', fontSize: '0.9rem', textAlign: 'right' }}>
                   ₹{project.estimatedCost?.toLocaleString()}
                </div>

                {/* Action */}
                <div 
                  onClick={() => navigate(`/projects/${project.id}`)}
                  style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 'bold' }}
                >
                   View &rarr;
                </div>
             </div>
           ))}
        </div>
      )}

      {/* Modals */}
      {showCreateModal && (
        <CreateProjectModal 
          onClose={() => setShowCreateModal(false)} 
          onProjectCreated={() => {
            fetchProjects();
          }}
        />
      )}
    </div>
  );
};

export default AdminProjectManager;
