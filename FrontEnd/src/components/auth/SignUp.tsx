import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { Cpu, X, Mail, Lock, UserPlus } from 'lucide-react';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { users, updateUsers, setCurrentUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (users.some(user => user.username === username)) {
      setError('Username already exists');
      return;
    }

    const newUser = {
      username,
      password,
      budget: 9000000,
      selectedTeam: []
    };

    updateUsers([...users, newUser]);
    setCurrentUser(newUser);
    navigate('/players');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white bg-[linear-gradient(rgba(147,51,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.05)_1px,transparent_1px)] bg-[length:50px_50px]">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 w-[420px] relative z-10 shadow-xl border-2 border-primary/10"
      >
        <Link to="/login" className="absolute top-4 right-4 text-primary/60 hover:text-primary transition-colors">
          <X size={24} />
        </Link>

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-4
            border-2 border-primary/10 shadow-[0_0_20px_rgba(147,51,234,0.1)]">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary cyber-text">Create Account</h1>
          <p className="text-primary/60 mt-2 cyber-text text-sm">
            Initialize new user registration
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 text-red-500 text-sm text-center cyber-text"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-primary/80 mb-2 cyber-text">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-primary/5 border-2 border-primary/10 text-primary px-10 py-3 rounded-lg 
                  focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 
                  placeholder-primary/40 transition-all duration-300"
                placeholder="NAME@EXAMPLE.COM"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary/80 mb-2 cyber-text">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-primary/5 border-2 border-primary/10 text-primary px-10 py-3 rounded-lg 
                  focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 
                  placeholder-primary/40 transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary/80 mb-2 cyber-text">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-primary/5 border-2 border-primary/10 text-primary px-10 py-3 rounded-lg 
                  focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/30 
                  placeholder-primary/40 transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full bg-primary/10 hover:bg-primary/15 border-2 border-primary/30 
              text-primary font-medium px-6 py-3 rounded-lg transition-all duration-300
              hover:shadow-[0_0_20px_rgba(147,51,234,0.2)] focus:shadow-[0_0_20px_rgba(147,51,234,0.3)]
              cyber-text mt-6"
          >
            INITIALIZE REGISTRATION →
          </motion.button>

          <div className="text-center">
            <Link 
              to="/login"
              className="text-sm text-primary/60 hover:text-primary cyber-text transition-colors"
            >
              Already have an account? Login here
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;