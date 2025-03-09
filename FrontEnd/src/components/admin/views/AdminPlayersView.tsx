import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Plus, Search, Edit2, Trash2, X, Save, School, Ticket as Cricket 
} from 'lucide-react';

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

const AdminPlayersView = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch players from Laravel backend
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const response = await fetch('http://127.0.0.1:8000/api/admin/players', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tournament summary');
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Players</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage tournament players and their statistics
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Player</span>
        </button>
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

      {/* Player List */}
      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map(player => (
            <motion.div
              key={player.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Cricket className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{player.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <School className="w-4 h-4 mr-1" /> {player.university}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedPlayer(player);
                      setShowModal(true);
                    }}
                    className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete ${player.name}?`)) {
                        setPlayers(players.filter(p => p.id !== player.id));
                      }
                    }}
                    className="p-2 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Category</span>
                  <span className="font-medium text-gray-900 dark:text-white">{player.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Runs</span>
                  <span className="font-medium text-gray-900 dark:text-white">{player.total_runs}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Wickets</span>
                  <span className="font-medium text-gray-900 dark:text-white">{player.wickets}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {filteredPlayers.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No players found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or add a new player
          </p>
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <PlayerModal 
            player={selectedPlayer}
            onClose={() => {
              setShowModal(false);
              setSelectedPlayer(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Player Modal Component
const PlayerModal = ({ player, onClose }: { player?: Player; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white dark:bg-dark-card rounded-xl p-6 w-full max-w-2xl shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {player ? 'Player Details' : 'Add New Player'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-700 dark:text-gray-300">Coming soon: Edit & Add functionality!</p>
      </motion.div>
    </motion.div>
  );
};

export default AdminPlayersView;
