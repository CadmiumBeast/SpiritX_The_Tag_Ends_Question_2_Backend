import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Activity, TrendingUp, Target 
} from 'lucide-react';
import {
  calculateBattingStrikeRate,
  calculateBattingAverage,
  calculateBowlingStrikeRate,
  calculateEconomyRate,
  calculatePlayerPoints
} from '../../../utils/calculations';

interface Player {
  id: number;
  name: string;
  university: string;
  category: 'Batsman' | 'Bowler' | 'All-Rounder';
  total_runs: number;
  balls_faced: number;
  innings_played: number;
  wickets: number;
  overs_bowled: number;
  runs_conceded: number;
}


const AdminPlayerStatsView = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch players from Laravel backend
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const response = await fetch('http://127.0.0.1:8000/api/admin/players', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch Players Stats');
        }

        const data = await response.json();
        setPlayers(data);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Filter players based on search
  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Player Statistics</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Detailed performance analysis of all players
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800"
        />
      </div>

      {/* Stats Grid */}
      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredPlayers.map((player) => {
            const battingStrikeRate = calculateBattingStrikeRate(player.total_runs, player.balls_faced);
            const battingAverage = calculateBattingAverage(player.total_runs, player.innings_played);
            const bowlingStrikeRate = calculateBowlingStrikeRate(player.overs_bowled * 6, player.wickets);
            const economyRate = calculateEconomyRate(player.runs_conceded, player.overs_bowled * 6);
            const points = calculatePlayerPoints(player);

            return (
              <motion.div
                key={player.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800/50"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Player Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Activity className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {player.name}
                      </h2>
                      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                        <span>{player.university}</span>
                        <span>•</span>
                        <span>{player.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Overall Points */}
                  <div className="bg-primary/10 px-6 py-3 rounded-xl">
                    <p className="text-sm text-primary">Overall Points</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {player.points.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Batting Stats */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Batting Statistics
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <StatCard title="Total Runs" value={player.total_runs} />
                      <StatCard title="Strike Rate" value={battingStrikeRate} />
                      <StatCard title="Balls Faced" value={player.balls_faced} />
                      <StatCard title="Batting Average" value={battingAverage} />
                    </div>
                  </div>

                  {/* Bowling Stats */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Bowling Statistics
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <StatCard title="Wickets" value={player.wickets} />
                      <StatCard title="Economy Rate" value={economyRate} />
                      <StatCard title="Balls Bowled" value={player.overs_bowled * 6} />
                      <StatCard title="Bowling Strike Rate" value={bowlingStrikeRate} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Helper Component for Stats
const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className="bg-gray-50 dark:bg-dark-lighter p-4 rounded-lg">
    <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
    <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
  </div>
);

export default AdminPlayerStatsView;
