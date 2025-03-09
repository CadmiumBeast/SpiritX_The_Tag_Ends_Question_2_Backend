import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, X, Mail, Lock, UserPlus, SquareUserRound } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();

  const apiUrl = 'http://127.0.0.1:8000/api/auth';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          isLogin
            ? { email, password }
            : { name, email, password, password_confirmation: confirmPassword }
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      localStorage.setItem('token', data.access_token);

      try {
        const userResponse = await fetch(`${apiUrl}/me`, {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });

        const userData = await userResponse.json();

        if (!userResponse.ok) {
          throw new Error(userData.message || 'Failed to fetch user data');
        }

        setCurrentUser(userData);

      } catch (err) {
        setError(err.message);
      }

      navigate('/'); // Navigate to dashboard

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white bg-[linear-gradient(rgba(147,51,234,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.05)_1px,transparent_1px)] bg-[length:50px_50px]">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 w-[420px] relative z-10 shadow-xl border-2 border-primary/20"
      >
        <button className="absolute top-4 right-4 text-primary/60 hover:text-primary transition-colors">
          <X size={24} />
        </button>

        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-4
            border-2 border-primary/20 shadow-[0_0_20px_rgba(147,51,234,0.2)]">
            <Cpu className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary cyber-text">Access Terminal</h1>
          <p className="text-primary/60 mt-2 cyber-text text-sm">
            Initialize authentication sequence
          </p>
        </div>

        <div className="flex mb-8 p-1 bg-primary/5 rounded-lg">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 cyber-text
              ${isLogin ? 'bg-primary text-white shadow-lg' : 'text-primary/60 hover:text-primary'}`}
          >
            LOGIN
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 cyber-text
              ${!isLogin ? 'bg-primary text-white shadow-lg' : 'text-primary/60 hover:text-primary'}`}
          >
            SIGN UP
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center cyber-text"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2 cyber-text">
                Name
              </label>
              <div className="relative">
                <SquareUserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-primary/5 border-2 border-primary/20 text-primary px-10 py-3 rounded-lg 
                    focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 
                    placeholder-primary/40 transition-all duration-300"
                  placeholder="Enter your name"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-primary/80 mb-2 cyber-text">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-primary/5 border-2 border-primary/20 text-primary px-10 py-3 rounded-lg 
                  focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 
                  placeholder-primary/40 transition-all duration-300"
                placeholder="EMAIL@EXAMPLE.COM"
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
                className="w-full bg-primary/5 border-2 border-primary/20 text-primary px-10 py-3 rounded-lg 
                  focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/40 
                  placeholder-primary/40 transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <AnimatePresence>
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
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
                      required={!isLogin}
                      className="w-full bg-primary/5 border-2 border-primary/20 text-primary px-10 py-3 rounded-lg"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button type="submit" className="w-full bg-primary/20 text-primary py-3 rounded-lg">
            {isLogin ? 'LOGIN' : 'SIGN UP'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AuthPage;
