import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { players } from '../../data/mockData';
import { calculatePlayerPoints, calculatePlayerValue, formatCurrency } from '../../utils/calculations';
import { 
  Users, 
  Wallet, 
  Trophy,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  School
} from 'lucide-react';

const DashboardView = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
      fetch('http://your-backend-url.com/api/dashboard', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
          }
      })
      .then(response => response.json())
      .then(data => setDashboardData(data))
      .catch(error => console.error('Error fetching dashboard data:', error));
  }, []);

  if (!dashboardData) return <p>Loading...</p>;


  return (
    <div className="grid gap-6">
      {/* Welcome Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="card__border"></div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome to {currentUser.teamName || 'Your Team'}
            </h1>
            <p className="text-white/70">
              Here's your team's performance overview
            </p>
          </div>
          {currentUserRank > 0 && (
            <div className="bg-primary/10 px-6 py-3 rounded-xl border border-primary/20">
              <p className="text-sm text-white/70">Global Rank</p>
              <p className="text-3xl font-bold text-white">#{currentUserRank}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="card__border"></div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-white/70">Team Size</p>
              <p className="text-2xl font-bold text-white">
                {selectedPlayers.length}/11
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="card__border"></div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-white/70">Total Points</p>
              <p className="text-2xl font-bold text-white">
                {totalTeamPoints.toFixed(2)}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="card__border"></div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-white/70">Team Value</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(totalTeamValue)}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="card__border"></div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-white/70">Avg. Points</p>
              <p className="text-2xl font-bold text-white">
                {selectedPlayers.length ? (totalTeamPoints / selectedPlayers.length).toFixed(2) : '0.00'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Team Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="card__border"></div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-white">Team Composition</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(playersByCategory).map(([category, count]) => (
              <div key={category} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{category}s</h4>
                  <span className="text-sm text-white/70">{count} players</span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 flex rounded bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / selectedPlayers.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary/50"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="card__border"></div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <School className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-white">University Distribution</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(playersByUniversity).map(([university, count]) => (
              <div key={university} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{university}</h4>
                  <span className="text-sm text-white/70">{count} players</span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 flex rounded bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / selectedPlayers.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary/50"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="card__border"></div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-white">Top Performance</h3>
          </div>
          {selectedPlayers.length > 0 ? (
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-medium text-white mb-2">
                {selectedPlayers.reduce((top, player) => {
                  const points = calculatePlayerPoints(player);
                  return points > calculatePlayerPoints(top) ? player : top;
                }, selectedPlayers[0]).name}
              </h4>
              <p className="text-sm text-white/70">
                {calculatePlayerPoints(selectedPlayers.reduce((top, player) => {
                  const points = calculatePlayerPoints(player);
                  return points > calculatePlayerPoints(top) ? player : top;
                }, selectedPlayers[0])).toFixed(2)} points
              </p>
            </div>
          ) : (
            <p className="text-white/70">No players selected</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="card__border"></div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <School className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-white">Top University</h3>
          </div>
          {topUniversity ? (
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-medium text-white mb-2">{topUniversity[0]}</h4>
              <p className="text-sm text-white/70">{topUniversity[1]} players</p>
            </div>
          ) : (
            <p className="text-white/70">No players selected</p>
          )}
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
              <TrendingDown className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-white">Areas to Improve</h3>
          </div>
          {selectedPlayers.length > 0 ? (
            <div className="space-y-2">
              {selectedPlayers.length < 11 && (
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/70">Need {11 - selectedPlayers.length} more players</p>
                </div>
              )}
              {Object.entries(playersByCategory).some(([,count]) => count < 3) && (
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/70">Balance team composition</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-white/70">Start by selecting players</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardView;