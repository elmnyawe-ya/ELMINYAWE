import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../services/supabase.config';
import type { User, AuthContextType } from '../types';
import * as authService from '../services/auth.supabase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          const userData = await authService.getUser(session.user.id);
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
    const foundUser = await authService.signIn(email, pass);
    setUser(foundUser);
  };

  const register = async (username: string, email: string, pass: string): Promise<void> => {
    const newUser = await authService.signUp(username, email, pass);
    setUser(newUser);
  };


  const requestPasswordReset = async (email: string): Promise<void> => {
    await authService.requestPasswordReset(email);
  };

  const updatePassword = async (newPassword: string): Promise<void> => {
    await authService.updatePassword(newPassword);
  };
  
  const logout = async () => {
    await authService.logout();
    setUser(null);
  };
  
  const updateProfile = async (updates: { username?: string; bio?: string; avatarUrl?: string; }): Promise<void> => {
    if (!user) throw new Error('Not authenticated');
    
    const updatedUser = await authService.updateUser(user.id, updates);
    setUser(updatedUser);
  };
  
  const checkForOwner = async (secretCode: string): Promise<boolean> => {
    if (!user) throw new Error('Not authenticated');
    
    try {
      const updatedUser = await authService.promoteToOwner(user.id, secretCode);
      setUser(updatedUser);
      return true;
    } catch (error) {
      return false;
    }
  };
  
  const value = { user, loading, login, register, logout, updateProfile, checkForOwner, requestPasswordReset, updatePassword };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;