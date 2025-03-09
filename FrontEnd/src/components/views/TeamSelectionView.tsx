import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { players } from '../../data/mockData';
import { useUser } from '../../context/UserContext';
import { calculatePlayerPoints, calculatePlayerValue, formatCurrency } from '../../utils/calculations';
import { Users, DollarSign, Check, Filter, PlusCircle } from 'lucide-react';

const TeamSelectionView = () => {
  const { currentUser, users, updateUsers, setCurrentUser } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [teamName, setTeamName] = useState('');
  const [isCreatingTeam, setIsCreatingTeam] = useState(true);
  const [error, setError] = useState('');

  if (!currentUser) return null;

  const remainingBudget = currentUser.budget;
  const selectedPlayers = currentUser.selectedTeam;

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) {
      setError('Please enter a team name');
      return;
    }
    setIsCreatingTeam(false);
    setError('');
  };

  const addPlayerToTeam = (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    const playerValue = calculatePlayerValue(calculatePlayerPoints(player));
    if (playerValue > remainingBudget) return;

    const updatedUser = {
      ...currentUser,
      selectedTeam: [...currentUser.selectedTeam, playerId],
      budget: currentUser.budget - playerValue,
      teamName
    };

    const updatedUsers = users.map(user => 
      user.username === currentUser.username ? updatedUser : user
    );

    updateUsers(updatedUsers);
    setCurrentUser(updatedUser);
  };

  const filteredPlayers = useMemo(() => {
    return players.filter(player => 
      selectedCategory === 'all' || player.category === selectedCategory
    );
  }, [selectedCategory]);

  const categories = ['all', 'Batsman', 'Bowler', 'All-Rounder'];

  if (isCreatingTeam) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card max-w-md w-full"
        >
          <div className="card__border"></div>
          <div className="flex flex-col items-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
              <PlusCircle className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Create Your Team</h2>
              <p className="text-white/70">Give your team a unique name to get started</p>
            </div>

            <form onSubmit={handleCreateTeam} className="w-full space-y-4">
              {error && (
                <div className="text-red-500 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-2">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="teamName" className="block text-sm font-medium text-white/70 mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white 
                    placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                  placeholder="Enter your team name"
                />
              </div>

              <button
                type="submit"
                className="w-full button bg-primary/20 hover:bg-primary/30 border-primary/40"
              >
                Create Team & Select Players
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Team Summary Card */}
      <div className="card">
        <div className="card__border"></div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{teamName}</h2>
              <p className="text-white/70">
                {selectedPlayers.length}/11 Players Selected
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="text-lg font-medium text-white">
              {formatCurrency(remainingBudget)}
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-6 py-3 rounded-lg font-medium whitespace-nowrap
              ${selectedCategory === category 
                ? 'bg-primary text-white shadow-glow' 
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'}
              transition-all duration-200
            `}
          >
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>{category === 'all' ? 'All Players' : `${category}s`}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => {
          const isSelected = selectedPlayers.includes(player.id);
          const points = calculatePlayerPoints(player);
          const playerValue = calculatePlayerValue(points);
          const canAfford = playerValue <= remainingBudget;

          return (
            <motion.div
              key={player.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card"
            >
              <div className="card__border"></div>
              
              <div className="card_title__container">
                <h3 className="text-lg font-bold text-white mb-1">{player.name}</h3>
                <p className="text-sm text-white/90">{player.university}</p>
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
                  <span className="list_text">Points: {points.toFixed(2)}</span>
                </li>
                <li className="card__list_item">
                  <span className="check">
                    <Check className="check_svg" />
                  </span>
                  <span className="list_text">Value: {formatCurrency(playerValue)}</span>
                </li>
              </ul>

              <button
                onClick={() => !isSelected && canAfford && addPlayerToTeam(player.id)}
                disabled={isSelected || !canAfford}
                className={`button ${
                  isSelected
                    ? 'bg-green-500/20 border-green-500/40 cursor-not-allowed'
                    : !canAfford
                    ? 'bg-red-500/20 border-red-500/40 cursor-not-allowed'
                    : 'bg-primary/20 hover:bg-primary/30 border-primary/40'
                }`}
              >
                {isSelected 
                  ? 'Already Selected'
                  : !canAfford
                  ? 'Insufficient Budget'
                  : 'Select Player'}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamSelectionView;