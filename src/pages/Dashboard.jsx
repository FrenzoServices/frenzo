import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { activityService } from '../features/dashboard/api/activityService';
import { updateProfile } from 'firebase/auth'; // Direct import or use wrapper if created
import '../features/dashboard/styles/Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  
  // Profile State
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || '');
  const [profileMsg, setProfileMsg] = useState('');

  // Activity State
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState('');
  const [loading, setLoading] = useState(false);
  const [logging, setLogging] = useState(false);

  useEffect(() => {
    if (currentUser) {
        setDisplayName(currentUser.displayName || '');
        setPhotoURL(currentUser.photoURL || '');
        fetchActivities();
    }
  }, [currentUser]);

  const fetchActivities = async () => {
    try {
      if (currentUser?.uid) {
        const data = await activityService.getUserActivities(currentUser.uid);
        setActivities(data);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProfileMsg('');
    try {
        await updateProfile(currentUser, {
            displayName: displayName,
            photoURL: photoURL
        });
        setProfileMsg('Profile updated successfully!');
        // Ideally reload user context or force refresh, but Firebase typically updates auto
    } catch (error) {
        setProfileMsg(`Error: ${error.message}`);
    } finally {
        setLoading(false);
    }
  };

  const handleLogActivity = async (e) => {
    e.preventDefault();
    if (!newActivity.trim()) return;

    setLogging(true);
    try {
      await activityService.logActivity(currentUser.uid, {
        name: newActivity,
        type: 'custom' 
      });
      setNewActivity('');
      fetchActivities(); // Refresh list
    } catch (error) {
      console.error("Error logging activity:", error);
    } finally {
      setLogging(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="user-welcome">
          <h1>My Dashboard</h1>
          <p className="user-email">Manage your profile and track activities</p>
        </div>
        {/* Logout is now in UserMenu, removed from here to reduce clutter as requested */}
      </div>

      <div className="dashboard-grid">
        {/* LEFT COLUMN: Profile */}
        <div className="card profile-card">
            <h3>Profile Details</h3>
            
            <div className="profile-preview">
                <img 
                    src={photoURL || 'https://via.placeholder.com/150'} 
                    alt="Profile" 
                    className="profile-avatar-large"
                    onError={(e) => {e.target.src = 'https://via.placeholder.com/150'}}
                />
            </div>

            <form onSubmit={handleUpdateProfile} className="activity-form">
                <div className="form-group">
                    <label>Display Name</label>
                    <input 
                        type="text" 
                        className="activity-input"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="John Doe"
                    />
                </div>
                <div className="form-group">
                    <label>Photo URL</label>
                    <input 
                        type="url" 
                        className="activity-input"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        placeholder="https://example.com/avatar.jpg"
                    />
                </div>
                <button type="submit" className="log-btn" disabled={loading}>
                    {loading ? 'Updating...' : 'Save Changes'}
                </button>
                {profileMsg && <p className={`profile-msg ${profileMsg.includes('Error') ? 'error' : 'success'}`}>{profileMsg}</p>}
            </form>
        </div>

        {/* RIGHT COLUMN: Activities */}
        <div className="right-column">
            {/* Logger */}
            <div className="card mb-2">
                <h3>Log New Activity</h3>
                <form onSubmit={handleLogActivity} className="activity-form">
                    <input
                    type="text"
                    className="activity-input"
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    placeholder="What did you do today?"
                    />
                    <button type="submit" className="log-btn" disabled={logging}>
                    {logging ? 'Logging...' : 'Log Activity'}
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="card">
                <h3>Recent History</h3>
                <div className="activity-list">
                    {activities.length === 0 ? (
                    <div className="empty-state">No activities logged yet.</div>
                    ) : (
                    activities.map((activity) => (
                        <div key={activity.id} className="activity-item">
                        <span className="activity-name">{activity.name}</span>
                        <span className="activity-time">
                            {activity.timestamp?.toDate().toLocaleDateString()}
                        </span>
                        </div>
                    ))
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
