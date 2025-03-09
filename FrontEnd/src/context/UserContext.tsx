import React, { createContext, useContext, useState } from 'react';
import { users as initialUsers } from '../data/mockData';

interface User {
  username: string;
  password: string;
  budget: number;
  selectedTeam: string[];
}

interface UserContextType {
  currentUser: User | null;
  users: User[];
  setCurrentUser: (user: User | null) => void;
  updateUsers: (users: User[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const updateUsers = (newUsers: User[]) => {
    setUsers(newUsers);
  };

  return (
    <UserContext.Provider value={{ currentUser, users, setCurrentUser, updateUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};