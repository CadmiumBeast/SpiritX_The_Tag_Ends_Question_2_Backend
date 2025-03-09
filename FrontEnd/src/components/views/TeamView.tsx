import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { players } from '../../data/mockData';
import { calculatePlayerPoints, calculatePlayerValue, formatCurrency } from '../../utils/calculations';
import { Users, AlertTriangle, Check, Trash2, Trophy, School, DollarSign } from 'lucide-react';

const TeamView = () => {
  const { currentUser, users, updateUsers, setCurrentUser } = useUser();
  
  if (!currentUser) return null;

  const selectedPlayers = players.filter(player => 
    currentUser.selectedTeam.includes(player.id)
  );

  const removePlayer = (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return;

    const playerValue = calculatePlayerValue(calculatePlayerPoints(player));
    const updatedUser = {
      ...currentUser,
      selectedTeam: currentUser.selectedTeam.filter(id => id !== playerId),
      budget: currentUser.budget + playerValue
    };

    const updatedUsers = users.map(user => 
      user.username === currentUser.username ? updatedUser : user
    );

    updateUsers(updatedUsers);
    setCurrentUser(updatedUser);
  };

  const totalTeamPoints = selectedPlayers.reduce((total, player) => 
    total + calculatePlayerPoints(player), 0
  );

  const totalTeamValue = selectedPlayers.reduce((total, player) => 
    total + calculatePlayerValue(calculatePlayerPoints(player)), 0
  );

  const playersNeeded = 11 - selectedPlayers.length;
  const isTeamComplete = playersNeeded === 0;

  const playersByCategory = selectedPlayers.reduce((acc, player) => {
    if (!acc[player.category]) {
      acc[player.category] = [];
    }
    acc[player.category].push(player);
    return acc;
  }, {} as Record<string, typeof players>);

  return (
    <div className="space-y-6">
      {/* Team Summary */}
      <div className="card">
        <div className="card__border"></div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {currentUser.teamName || 'Your Team'}
                </h2>
                <p className="text-white/70">
                  {selectedPlayers.length}/11 Players Selected
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="text-sm text-white/70">Total Points</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {totalTeamPoints.toFixed(2)}
                </p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-sm text-white/70">Team Value</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(totalTeamValue)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10 h-full">
              <h3 className="text-lg font-medium text-white mb-3">Team Composition</h3>
              <div className="space-y-2">
                {['Batsman', 'Bowler', 'All-Rounder'].map(category => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-white/70">{category}s</span>
                    <span className="text-white font-medium">
                      {playersByCategory[category]?.length || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Status */}
      {!isTeamComplete && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-yellow-500/10 border-yellow-500/20"
        >
          <div className="flex items-center space-x-3 text-yellow-500">
            <AlertTriangle className="w-5 h-5" />
            <p className="font-medium">
              You need {playersNeeded} more player{playersNeeded > 1 ? 's' : ''} to complete your team
            </p>
          </div>
        </motion.div>
      )}

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedPlayers.map((player) => {
          const points = calculatePlayerPoints(player);
          const value = calculatePlayerValue(points);

          return (
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
                <div className="flex items-center space-x-2 text-white/70">
                  <School className="w-4 h-4" />
                  <p className="text-sm">{player.university}</p>
                </div>
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
                  <span className="list_text">Value: {formatCurrency(value)}</span>
                </li>
              </ul>

              <button 
                onClick={() => removePlayer(player.id)}
                className="button bg-red-500/20 hover:bg-red-500/30 border-red-500/40 text-white"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Trash2 className="w-4 h-4" />
                  <span>Remove Player</span>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {selectedPlayers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card text-center py-12"
        >
          <div className="card__border"></div>
          <Users className="w-16 h-16 text-primary/50 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Players Selected</h3>
          <p className="text-white/70">
            Visit the Team Selection page to start building your team
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TeamView;