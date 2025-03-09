import { create } from 'zustand';
import { players as initialPlayers } from '../data/mockData';
import type { Player } from '../data/mockData';

interface AdminState {
  isAuthenticated: boolean;
  players: Player[];
  setAuthenticated: (value: boolean) => void;
  updatePlayer: (playerId: string, updates: Partial<Player>) => void;
  addPlayer: (player: Player) => void;
  deletePlayer: (playerId: string) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isAuthenticated: false,
  players: initialPlayers,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  updatePlayer: (playerId, updates) =>
    set((state) => ({
      players: state.players.map((player) =>
        player.id === playerId ? { ...player, ...updates } : player
      ),
    })),
  addPlayer: (player) =>
    set((state) => ({
      players: [...state.players, player],
    })),
  deletePlayer: (playerId) =>
    set((state) => ({
      players: state.players.filter((player) => player.id !== playerId),
    })),
}));