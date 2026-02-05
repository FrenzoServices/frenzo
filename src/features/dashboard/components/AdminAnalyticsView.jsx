import React, { useState, useEffect } from 'react';
import { analyticsService } from '../../analytics/analyticsService';

const AdminAnalyticsView = () => {
    const [stats, setStats] = useState({
        totalVisitors: 0,
        pageViews: [],
        authStats: { email: 0, phone: 0, google: 0 }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const data = await analyticsService.getAggregatedStats();
            setStats(data);
        } catch (error) {
            console.error("Error loading analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="profile-msg">Loading analytics...</div>;

    return (
        <div className="analytics-container">
            {/* KPI Cards */}
            <div className="analytics-grid">
                <div className="stat-card">
                    <h4 className="stat-label">Total Unique Visitors</h4>
                    <p className="stat-value">{stats.totalVisitors}</p>
                </div>
                <div className="stat-card">
                    <h4 className="stat-label">Total Page Views</h4>
                    <p className="stat-value">{stats.totalPageViews || 0}</p>
                </div>
                <div className="stat-card">
                    <h4 className="stat-label">Signups (Email)</h4>
                    <p className="stat-value">{stats.authStats.email}</p>
                </div>
            </div>

            {/* Page View Breakdown */}
            <div className="analytics-list-container">
                <h3>Most Visited Pages</h3>
                <table className="analytics-table">
                    <thead>
                        <tr>
                            <th>Page Path</th>
                            <th>Views</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.pageViews.map((page, index) => (
                            <tr key={index}>
                                <td>{page.id}</td> {/* page.id is the path like /pricing */}
                                <td>{page.count}</td>
                            </tr>
                        ))}
                        {stats.pageViews.length === 0 && (
                            <tr><td colSpan="2">No page views recorded yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAnalyticsView;
