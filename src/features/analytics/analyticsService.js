import { db } from '../../lib/firebase';
import { collection, addDoc, query, where, getDocs, getCountFromServer, Timestamp } from 'firebase/firestore';

const COLLECTION_NAME = 'analytics_events';

// Helper to get or create a persistent Device ID
const getDeviceId = () => {
    let deviceId = localStorage.getItem('frenzo_device_unique_id');
    if (!deviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem('frenzo_device_unique_id', deviceId);
    }
    return deviceId;
};

export const analyticsService = {
  // 1. Log a Page View
  logPageView: async (path, userId = null) => {
    try {
        const deviceId = getDeviceId();
        await addDoc(collection(db, COLLECTION_NAME), {
            type: 'page_view',
            path: path,
            deviceId: deviceId,
            userId: userId, // Optional, links device to user
            timestamp: Timestamp.now(),
            userAgent: navigator.userAgent
        });
    } catch (error) {
        // Fail silently so we don't block the UI
        console.warn("Analytics Error:", error);
    }
  },

  // 2. Log Login Event
  logLogin: async (method, userId) => {
    try {
        const deviceId = getDeviceId();
        await addDoc(collection(db, COLLECTION_NAME), {
            type: 'login',
            method: method, // 'email', 'phone', 'google'
            deviceId: deviceId,
            userId: userId,
            timestamp: Timestamp.now()
        });
    } catch (error) {
        console.warn("Analytics Error:", error);
    }
  },

  // 3. Get Stats for Admin
  getAggregatedStats: async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME));
        const snapshot = await getDocs(q);
        
        const uniqueDevices = new Set();
        const pageCounts = {};
        const authCounts = { email: 0, phone: 0, google: 0 };
        
        let totalPageViews = 0;

        snapshot.forEach(doc => {
            const data = doc.data();
            
            // Count Unique Visitors
            if (data.deviceId) uniqueDevices.add(data.deviceId);

            // Count Page Views
            if (data.type === 'page_view') {
                totalPageViews++;
                const p = data.path || '/unknown';
                pageCounts[p] = (pageCounts[p] || 0) + 1;
            }

            // Count Auth Methods
            if (data.type === 'login' && data.method) {
                if (authCounts[data.method] !== undefined) {
                    authCounts[data.method]++;
                }
            }
        });

        // Convert pageCounts to array
        const sortedPages = Object.entries(pageCounts)
            .map(([id, count]) => ({ id, count }))
            .sort((a, b) => b.count - a.count);

        return {
            totalVisitors: uniqueDevices.size,
            totalPageViews: totalPageViews,
            pageViews: sortedPages,
            authStats: authCounts
        };

    } catch (error) {
        console.error("Error fetching admin stats:", error);
        return {
            totalVisitors: 0,
            pageViews: [],
            authStats: { email: 0, phone: 0, google: 0 }
        };
    }
  }
};
