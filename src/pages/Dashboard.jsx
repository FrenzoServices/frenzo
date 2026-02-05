import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { activityService } from '../features/dashboard/api/activityService';
import { useNavigate } from 'react-router-dom';
import '../features/dashboard/styles/Dashboard.css';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Format timestamp helper
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  const fetchActivities = async () => {
    if (currentUser) {
      try {
        const data = await activityService.getUserActivities(currentUser.uid);
        setActivities(data);
      } catch (error) {
        console.error("Failed to load activities", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const handleLogActivity = async (e) => {
    e.preventDefault();
    if (!newActivity.trim()) return;

    try {
      await activityService.logActivity(currentUser.uid, newActivity);
      setNewActivity('');
      // Refresh list
      fetchActivities();
    } catch (error) {
      console.error("Failed to log activity", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="user-welcome">
          <h1>Dashboard</h1>
          <p className="user-email">Logged in as: {currentUser?.email}</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Sign Out
        </button>
      </div>

      <div className="dashboard-grid">
        {/* Render Activity Logger */}
        <div className="card">
          <h3>Log New Activity</h3>
          <form onSubmit={handleLogActivity} className="activity-form">
            <input
              type="text"
              className="activity-input"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder="What did you do today?"
              required
            />
            <button type="submit" className="log-btn">
              Save to Firestore
            </button>
          </form>
        </div>

        {/* Render Activity List */}
        <div className="card">
          <h3>Your History</h3>
          {loading ? (
            <p className="text-secondary">Loading...</p>
          ) : activities.length > 0 ? (
            <div className="activity-list">
              {activities.map((item) => (
                <div key={item.id} className="activity-item">
                  <span className="activity-name">{item.activity}</span>
                  <span className="activity-time">{formatDate(item.timestamp)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No activities found. Start logging!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
