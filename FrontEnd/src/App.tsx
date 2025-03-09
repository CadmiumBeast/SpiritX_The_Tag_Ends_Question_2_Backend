import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import DashboardLayout from './components/DashboardLayout';
import AuthPage from './components/auth/AuthPage';
import AdminAuthPage from './components/admin/AdminAuthPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardView from './components/views/DashboardView';
import PlayersView from './components/views/PlayersView';
import TeamSelectionView from './components/views/TeamSelectionView';
import TeamView from './components/views/TeamView';
import BudgetView from './components/views/BudgetView';
import LeaderboardView from './components/views/LeaderboardView';
import ChatView from './components/views/ChatView';
import SettingsView from './components/views/SettingsView';

// Admin Views
import AdminPlayersView from './components/admin/views/AdminPlayersView';
import AdminPlayerStatsView from './components/admin/views/AdminPlayerStatsView';
import AdminTournamentSummaryView from './components/admin/views/AdminTournamentSummaryView';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin/auth" element={<AdminAuthPage />} />
            
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route index element={<AdminTournamentSummaryView />} />
              <Route path="players" element={<AdminPlayersView />} />
              <Route path="player-stats" element={<AdminPlayerStatsView />} />
              <Route path="tournament" element={<AdminTournamentSummaryView />} />
            </Route>

            {/* User Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardView />} />
              <Route path="players" element={<PlayersView />} />
              <Route path="team-selection" element={<TeamSelectionView />} />
              <Route path="team" element={<TeamView />} />
              <Route path="budget" element={<BudgetView />} />
              <Route path="leaderboard" element={<LeaderboardView />} />
              <Route path="chat" element={<ChatView />} />
              <Route path="settings" element={<SettingsView />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;