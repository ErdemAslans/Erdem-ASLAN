import { useState, useEffect } from 'react';

const GITHUB_USERNAME = 'ErdemAslans';
const CACHE_KEY = 'github_stats_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

const useGitHubStats = () => {
  const [stats, setStats] = useState({
    repos: 35,
    stars: 0,
    forks: 0,
    followers: 0,
    contributions: 500,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Check cache first
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setStats({ ...data, loading: false, error: null });
          return;
        }
      }

      try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();

        // Fetch repos to count stars
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposResponse.json();

        const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const totalForks = reposData.reduce((acc, repo) => acc + repo.forks_count, 0);

        const newStats = {
          repos: userData.public_repos,
          stars: totalStars,
          forks: totalForks,
          followers: userData.followers,
          contributions: 500, // This would require GraphQL API or scraping
        };

        // Cache the results
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: newStats,
          timestamp: Date.now(),
        }));

        setStats({ ...newStats, loading: false, error: null });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setStats(prev => ({ ...prev, loading: false, error: error.message }));
      }
    };

    fetchStats();
  }, []);

  return stats;
};

export default useGitHubStats;