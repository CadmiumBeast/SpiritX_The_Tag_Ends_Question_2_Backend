import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { players } from '../../data/mockData';
import { calculatePlayerPoints } from '../../utils/calculations';
import { Trophy, Medal, Award, Crown, Star, Users, ArrowUp, ArrowDown } from 'lucide-react';

const LeaderboardView = () => {
  const { currentUser, users } = useUser();

  const calculateTeamPoints = (selectedTeam: string[]) => {
    return selectedTeam.reduce((total, playerId) => {
      const player = players.find(p => p.id === playerId);
      return total + (player ? calculatePlayerPoints(player) : 0);
    }, 0);
  };

  const rankedUsers = [...users]
    .filter(user => user.selectedTeam.length === 11)
    .map(user => ({
      ...user,
      totalPoints: calculateTeamPoints(user.selectedTeam),
      rank: 0, // Will be set below
      trend: Math.random() < 0.5 ? 'up' : 'down' // Simulated trend
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((user, index) => ({ ...user, rank: index + 1 }));

  const currentUserRank = rankedUsers.findIndex(
    user => user.username === currentUser?.username
  ) + 1;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <Star className="w-6 h-6 text-primary/60" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <div className="flex items-center text-green-400">
        <ArrowUp className="w-4 h-4" />
        <span className="text-xs ml-1">2↑</span>
      </div>
    ) : (
      <div className="flex items-center text-red-400">
        <ArrowDown className="w-4 h-4" />
        <span className="text-xs ml-1">1↓</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Leaderboard Header */}
      <div className="card">
        <div className="card__border"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
              <p className="text-white/70">
                {rankedUsers.length} teams competing
              </p>
            </div>
          </div>
          {currentUserRank > 0 && (
            <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <p className="text-sm text-white/70">Your Rank</p>
              <p className="text-2xl font-bold text-white">#{currentUserRank}</p>
            </div>
          )}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="card overflow-hidden">
        <div className="card__border"></div>
        
        {rankedUsers.length > 0 ? (
          <div className="divide-y divide-white/10">
            {rankedUsers.map((user, index) => {
              const isCurrentUser = user.username === currentUser?.username;
              
              return (
                <motion.div
                  key={user.username}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center p-4 ${
                    isCurrentUser ? 'bg-primary/10' : 'hover:bg-white/5'
                  } transition-colors`}
                >
                  {/* Rank */}
                  <div className="w-16 flex items-center justify-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      user.rank <= 3 ? 'bg-white/10' : ''
                    }`}>
                      {getRankIcon(user.rank)}
                    </div>
                  </div>

                  {/* Team Info */}
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-white">
                        {user.teamName || `Team ${user.username}`}
                      </h3>
                      {isCurrentUser && (
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-white/70">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{user.selectedTeam.length} players</span>
                      </div>
                      {getTrendIcon(user.trend)}
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">
                      {user.totalPoints.toFixed(2)}
                    </p>
                    <p className="text-sm text-white/70">points</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-primary/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Teams Ranked Yet</h3>
            <p className="text-white/70">
              Teams need exactly 11 players to be ranked on the leaderboard
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardView;