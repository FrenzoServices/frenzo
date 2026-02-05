import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { analyticsService } from '../../features/analytics/analyticsService';

const AnalyticsTracker = () => {
    const location = useLocation();
    const { currentUser } = useAuth();

    useEffect(() => {
        // Log page view whenever location changes
        analyticsService.logPageView(location.pathname, currentUser?.uid);
    }, [location, currentUser]);

    return null; // This component renders nothing
};

export default AnalyticsTracker;
