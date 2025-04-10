
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

/**
 * Service for handling authentication operations with Supabase
 */
export const authService = {
  /**
   * Get the current session
   */
  getSession: async () => {
    return await supabase.auth.getSession();
  },

  /**
   * Sign up a new user
   */
  signUp: async (email: string, password: string) => {
    return await supabase.auth.signUp({
      email,
      password,
    });
  },

  /**
   * Sign in with email and password
   */
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  /**
   * Sign in with OAuth provider
   */
  signInWithOAuth: async (provider: 'google' | 'facebook' | 'github', redirectTo?: string) => {
    return await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectTo || `${window.location.origin}/dashboard`
      }
    });
  },

  /**
   * Sign out the current user
   */
  signOut: async () => {
    return await supabase.auth.signOut();
  },

  /**
   * Create a user profile in the database
   */
  createUserProfile: async (userId: string, username: string) => {
    return await supabase
      .from('profiles')
      .insert({
        id: userId,
        username,
        points: 0,
        games_won: 0,
        games_played: 0,
        rank: 'Bronze',
      });
  },

  /**
   * Set up auth state change listener
   */
  onAuthStateChange: (callback: (session: Session | null, user: User | null) => void) => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session, session?.user ?? null);
    });
    
    return data.subscription;
  }
};
