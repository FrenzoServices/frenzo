import React from 'react';
import { useAuth } from '../context/AuthContext';
import { isAdmin } from '../config/admins';
import '../features/dashboard/styles/Dashboard.css';
import AdminAnalyticsView from '../features/dashboard/components/AdminAnalyticsView';
import UserProfile from '../features/dashboard/components/UserProfile';

import AdminProjectManager from '../features/dashboard/components/AdminProjectManager';
import UserProjectList from '../features/projects/components/UserProjectList';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const isUserAdmin = isAdmin(currentUser?.email);
  const [adminView, setAdminView] = React.useState('projects'); // Default to projects for now to test feature

  // If Admin, show special view
  if (isUserAdmin) {
      return (
        <div className="dashboard-container">
            <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div className="user-welcome">
                    <h1>Admin Dashboard</h1>
                    <p className="user-email">Analytics & Insights</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                   <button 
                     onClick={() => setAdminView('projects')}
                     style={{ 
                       padding: '8px 16px', borderRadius: '8px', 
                       background: adminView === 'projects' ? '#fff' : 'transparent', color: adminView === 'projects' ? '#000' : '#888',
                       border: '1px solid #333', cursor: 'pointer', fontWeight: 'bold'
                     }}
                   >
                     Projects
                   </button>
                   <button 
                     onClick={() => setAdminView('analytics')}
                     style={{ 
                       padding: '8px 16px', borderRadius: '8px', 
                       background: adminView === 'analytics' ? '#fff' : 'transparent', color: adminView === 'analytics' ? '#000' : '#888',
                       border: '1px solid #333', cursor: 'pointer', fontWeight: 'bold'
                     }}
                   >
                     Analytics
                   </button>
                </div>
            </div>
            {adminView === 'analytics' ? <AdminAnalyticsView /> : <AdminProjectManager />}
        </div>
      );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="user-welcome">
            <h1>Welcome, {currentUser?.displayName || 'User'}</h1>
            <p className="user-email">Complete your profile to help us serve you better.</p>
        </div>
      </div>



      <div className="dashboard-grid single-column">
        {/* Active Projects (Moved here for better visibility) */}
        <UserProjectList userId={currentUser?.uid} />

        {/* Business Profile Form */}
        <UserProfile targetUserId={currentUser?.uid} readOnly={false} />
      </div>
    </div>
  );
};

export default Dashboard;
