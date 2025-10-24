import { supabase, isSupabaseConfigured } from './supabase.config';
import type { User } from '../types';

// Mock users for fallback when Supabase is not configured
const mockUsers: User[] = [
  {
    id: 'mock-admin',
    username: 'admin',
    email: 'admin@elminyawe.dev',
    avatarUrl: 'https://ui-avatars.com/api/?name=Admin&background=ff0000&color=fff',
    bio: 'Site administrator',
    role: 'admin'
  }
];

let currentMockUser: User | null = null;

// Auth Functions
export const signIn = async (email: string, password: string): Promise<User> => {
  if (!isSupabaseConfigured()) {
    // Mock sign in
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      currentMockUser = user;
      return user;
    }
    throw new Error('Invalid credentials');
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Fetch user profile from database
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw profileError;

    return profile;
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw new Error(error.message || 'Failed to sign in');
  }
};

export const signUp = async (username: string, email: string, password: string): Promise<User> => {
  if (!isSupabaseConfigured()) {
    // Mock sign up
    const newUser: User = {
      id: `mock-${Date.now()}`,
      username,
      email,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=ff0000&color=fff`,
      bio: 'New user in the neon city.',
      role: 'user'
    };
    mockUsers.push(newUser);
    currentMockUser = newUser;
    return newUser;
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) throw error;

    // Create user profile
    const newUser: User = {
      id: data.user!.id,
      username,
      email,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=ff0000&color=fff`,
      bio: 'New user in the neon city.',
      role: 'user'
    };

    const { error: profileError } = await supabase
      .from('users')
      .insert([newUser]);

    if (profileError) throw profileError;

    return newUser;
  } catch (error: any) {
    console.error('Sign up error:', error);
    throw new Error(error.message || 'Failed to sign up');
  }
};

export const logout = async (): Promise<void> => {
  if (!isSupabaseConfigured()) {
    currentMockUser = null;
    return;
  }

  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error: any) {
    console.error('Logout error:', error);
    throw new Error(error.message || 'Failed to logout');
  }
};

export const getUser = async (userId: string): Promise<User | null> => {
  if (!isSupabaseConfigured()) {
    return mockUsers.find(u => u.id === userId) || null;
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  if (!isSupabaseConfigured()) {
    return currentMockUser;
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

export const updateUser = async (userId: string, updates: Partial<User>): Promise<User> => {
  if (!isSupabaseConfigured()) {
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) throw new Error('User not found');
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
    currentMockUser = mockUsers[userIndex];
    return mockUsers[userIndex];
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Update user error:', error);
    throw new Error(error.message || 'Failed to update user');
  }
};

export const promoteToOwner = async (userId: string, secretCode: string): Promise<User> => {
  try {
    const ownerSecretKey = import.meta.env.VITE_OWNER_SECRET_KEY;
    if (!ownerSecretKey || secretCode !== ownerSecretKey) {
      throw new Error('Invalid owner secret code');
    }
    return await updateUser(userId, { role: 'owner' });
  } catch (error: any) {
    console.error('Promote to owner error:', error);
    throw new Error(error.message || 'Invalid owner secret code');
  }
};

export const promoteToAdmin = async (userId: string, secretCode: string): Promise<User> => {
  try {
    const adminSecretKey = import.meta.env.VITE_ADMIN_SECRET_KEY;
    if (!adminSecretKey || secretCode !== adminSecretKey) {
      throw new Error('Invalid admin secret code');
    }
    return await updateUser(userId, { role: 'admin' });
  } catch (error: any) {
    console.error('Promote to admin error:', error);
    throw new Error(error.message || 'Invalid admin secret code');
  }
};

export const listAdmins = async (): Promise<User[]> => {
  if (!isSupabaseConfigured()) {
    return [];
  }
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .in('role', ['admin']);
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('List admins error:', error);
    return [];
  }
};

export const setUserRole = async (userId: string, role: User['role']): Promise<User> => {
  return await updateUser(userId, { role });
};

// Compatibility layer - keep these for backward compatibility
export const getApprovedSnippets = async () => {
  return [];
};

export const getSnippetsByAuthor = async (authorId: string) => {
  return [];
};

export const signInWithGoogle = async (): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured: Google OAuth would start');
    return;
  }
  await supabase.auth.signInWithOAuth({ provider: 'google' });
};

export const signInWithGithub = async (): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.log('Supabase not configured: GitHub OAuth would start');
    return;
  }
  await supabase.auth.signInWithOAuth({ provider: 'github' });
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.log('Mock password reset request for', email);
    return;
  }
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/#/reset-password`
  });
  if (error) throw error;
};

export const updatePassword = async (newPassword: string): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.log('Mock password updated');
    return;
  }
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
};
