import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { players } from '../../data/mockData';
import { calculatePlayerPoints, calculatePlayerValue, formatCurrency } from '../../utils/calculations';
import { 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  PieChart,
  Users,
  ArrowRight,
  School
} from 'lucide-react';

const BudgetView = () => {
  const { currentUser } = useUser();
  
  if (!currentUser) return null;

  const selectedPlayers = players.filter(player => 
    currentUser.selectedTeam.includes(player.id)
  );

  const initialBudget = 9000000;
  const totalSpent = selectedPlayers.reduce((total, player) => 
    total + calculatePlayerValue(calculatePlayerPoints(player)), 0
  );
  const remainingBudget = currentUser.budget;
  const spentPercentage = (totalSpent / initialBudget) * 100;

  const playersByCategory = selectedPlayers.reduce((acc, player) => {
    if (!acc[player.category]) {
      acc[player.category] = {
        count: 0,
        spent: 0
      };
    }
    acc[player.category].count++;
    acc[player.category].spent += calculatePlayerValue(calculatePlayerPoints(player));
    return acc;
  }, {} as Record<string, { count: number; spent: number }>);

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="card">
        <div className="card__border"></div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Budget Overview</h2>
              <p className="text-white/70">
                {selectedPlayers.length} players in {currentUser.teamName || 'your team'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="card__border"></div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-white">Initial Budget</h3>
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(initialBudget)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="card__border"></div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-red-500/10 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-lg font-medium text-white">Total Spent</h3>
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(totalSpent)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="card__border"></div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-white">Remaining</h3>
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(remainingBudget)}</p>
        </motion.div>
      </div>

      {/* Budget Progress */}
      <div className="card">
        <div className="card__border"></div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-lg">
            <PieChart className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium text-white">Budget Utilization</h3>
        </div>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary/20 text-primary">
                {spentPercentage.toFixed(1)}% Used
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-white/70">
                {formatCurrency(totalSpent)} / {formatCurrency(initialBudget)}
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${spentPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
            />
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="card">
        <div className="card__border"></div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium text-white">Category Breakdown</h3>
        </div>
        <div className="space-y-4">
          {Object.entries(playersByCategory).map(([category, data]) => (
            <div key={category} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">{category}s</h4>
                <span className="text-sm text-white/70">{data.count} players</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Total Spent:</span>
                <span className="text-white font-medium">{formatCurrency(data.spent)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Player Expenditure */}
      <div className="card">
        <div className="card__border"></div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-lg">
            <ArrowRight className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium text-white">Player Expenditure</h3>
        </div>
        <div className="space-y-4">
          {selectedPlayers.map((player) => {
            const value = calculatePlayerValue(calculatePlayerPoints(player));
            const percentage = (value / initialBudget) * 100;

            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <School className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{player.name}</h4>
                      <p className="text-sm text-white/70">{player.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{formatCurrency(value)}</p>
                    <p className="text-sm text-white/70">{percentage.toFixed(1)}% of budget</p>
                  </div>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-1 flex rounded bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.5 }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary/50"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}

          {selectedPlayers.length === 0 && (
            <div className="text-center py-8 text-white/70">
              No players selected yet. Visit the Team Selection page to start building your team.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetView;