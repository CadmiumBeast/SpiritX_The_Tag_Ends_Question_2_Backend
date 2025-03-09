import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { players } from '../../data/mockData';
import { 
  Search,
  Filter,
  Check,
  X,
  Activity,
  Target,
  Award
} from 'lucide-react';
import {
  calculateBattingStrikeRate,
  calculateBattingAverage,
  calculateBowlingStrikeRate,
  calculateEconomyRate
} from '../../utils/calculations';

interface PlayerModalProps {
  player: typeof players[0];
  onClose: () => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ player, onClose }) => {
  const stats = {
    battingStrikeRate: calculateBattingStrikeRate(player.runs, player.balls_faced),
    battingAverage: calculateBattingAverage(player.runs, player.innings_played),
    bowlingStrikeRate: calculateBowlingStrikeRate(player.balls_bowled, player.wickets_taken),
    economyRate: calculateEconomyRate(player.runs_conceded, player.balls_bowled),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="card max-w-lg w-full relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="card_title__container mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">{player.name}</h3>
          <p className="text-lg text-white/90">{player.university}</p>
          <div className="mt-2 inline-block px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
            {player.category}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="text-primary" />
              <h4 className="text-lg font-medium text-white">Batting Stats</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Total Runs</span>
                <span className="text-white font-medium">{player.runs}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Balls Faced</span>
                <span className="text-white font-medium">{player.balls_faced}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Strike Rate</span>
                <span className="text-white font-medium">{stats.battingStrikeRate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Average</span>
                <span className="text-white font-medium">{stats.battingAverage}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="text-primary" />
              <h4 className="text-lg font-medium text-white">Bowling Stats</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Wickets</span>
                <span className="text-white font-medium">{player.wickets_taken}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Balls Bowled</span>
                <span className="text-white font-medium">{player.balls_bowled}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Strike Rate</span>
                <span className="text-white font-medium">{stats.bowlingStrikeRate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Economy</span>
                <span className="text-white font-medium">{stats.economyRate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="text-primary" />
            <h4 className="text-lg font-medium text-white">Performance Overview</h4>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70">Batting Efficiency</span>
                <span className="text-white font-medium">{Number(stats.battingStrikeRate) > 100 ? 'Excellent' : Number(stats.battingStrikeRate) > 80 ? 'Good' : 'Average'}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary"
                  style={{ width: `${Math.min(Number(stats.battingStrikeRate), 150)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70">Bowling Efficiency</span>
                <span className="text-white font-medium">{Number(stats.economyRate) < 6 ? 'Excellent' : Number(stats.economyRate) < 8 ? 'Good' : 'Average'}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary"
                  style={{ width: `${Math.max(0, 100 - (Number(stats.economyRate) * 8))}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PlayersView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlayer, setSelectedPlayer] = useState<typeof players[0] | null>(null);

  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
      const matchesSearch = 
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.university.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || player.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search players..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                selectedCategory === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => setSelectedCategory('all')}
            >
              <Filter size={18} />
              <span>All</span>
            </button>
            {['Batsman', 'Bowler', 'All-Rounder'].map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === category 
                    ? 'bg-primary text-white' 
                    : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-400'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}s
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => (
            <motion.div
              key={player.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card"
            >
              <div className="card__border"></div>
              
              <div className="card_title__container">
                <h3 className="text-lg font-bold text-white mb-1">{player.name}</h3>
                <p className="text-sm text-white/90 font-medium">{player.university}</p>
              </div>

              <hr className="line" />

              <ul className="card__list">
                <li className="card__list_item">
                  <span className="check">
                    <Check className="check_svg" />
                  </span>
                  <span className="list_text">Category: {player.category}</span>
                </li>
                <li className="card__list_item">
                  <span className="check">
                    <Check className="check_svg" />
                  </span>
                  <span className="list_text">Total Runs: {player.runs}</span>
                </li>
                <li className="card__list_item">
                  <span className="check">
                    <Check className="check_svg" />
                  </span>
                  <span className="list_text">
                    Strike Rate: {calculateBattingStrikeRate(player.runs, player.balls_faced)}
                  </span>
                </li>
                <li className="card__list_item">
                  <span className="check">
                    <Check className="check_svg" />
                  </span>
                  <span className="list_text">Wickets: {player.wickets_taken}</span>
                </li>
                <li className="card__list_item">
                  <span className="check">
                    <Check className="check_svg" />
                  </span>
                  <span className="list_text">
                    Economy: {calculateEconomyRate(player.runs_conceded, player.balls_bowled)}
                  </span>
                </li>
              </ul>

              <button 
                className="button"
                onClick={() => setSelectedPlayer(player)}
              >
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPlayer && (
          <PlayerModal 
            player={selectedPlayer} 
            onClose={() => setSelectedPlayer(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PlayersView;