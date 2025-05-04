import { useState, useEffect } from 'react';
import { fetchAnalytics } from '../api/analyticsService';

const useEmailStats = () => {
  const [stats, setStats] = useState({
    sent: 0,
    opened: 0,
    responses: 0,
    rsvps: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const analytics = await fetchAnalytics();
      setStats(analytics);
    };

    loadStats();
  }, []);

  return stats;
};

export default useEmailStats;