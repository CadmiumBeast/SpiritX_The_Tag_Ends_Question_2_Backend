import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy,
  Target,
  TrendingUp,
  Users,
  School,
  BarChart2
} from 'lucide-react';

const AdminTournamentSummaryView = () => {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const response = await fetch('http://127.0.0.1:8000/api/admin/summary', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tournament summary');
        }

        const data = await response.json();
        setSummary(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tournament Summary</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overall tournament statistics and analysis
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800/50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Total Players</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {summary.total_players}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800/50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Total Runs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {summary.total_runs}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800/50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Total Wickets</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {summary.total_wickets}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800/50">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Total Universities</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {summary.total_universities}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Players by Category */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800/50">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Batsmen</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.batsman}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800/50">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Bowlers</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.bowler}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800/50">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">All-Rounders</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.all_rounder}</p>
        </motion.div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800/50">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Highest Run Scorer
          </h3>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{summary.highest_run_scorer.name}</p>
          <p className="text-gray-600 dark:text-gray-400">{summary.highest_run_scorer.total_runs} runs</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{summary.highest_run_scorer.university}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800/50">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Highest Wicket Taker
          </h3>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{summary.highest_wicket_taker.name}</p>
          <p className="text-gray-600 dark:text-gray-400">{summary.highest_wicket_taker.wickets} wickets</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{summary.highest_wicket_taker.university}</p>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800/50">
        <div className="flex items-center space-x-2 mb-6">
          <School className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Players by University
          </h3>
        </div>
        <div className="space-y-4">
          {Object.entries(summary.universities).map(([university, count]) => (
            <div key={university} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{university}</span>
                <span className="font-medium text-gray-900 dark:text-white">{count}</span>
              </div>
              <div className="relative h-2 bg-gray-100 dark:bg-dark-lighter rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(count / summary.total_players) * 100}%` }}
                  className="absolute h-full bg-primary rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminTournamentSummaryView;
