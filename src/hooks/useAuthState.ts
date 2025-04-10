
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { authService } from '@/services/authService';

/**
 * Hook for managing auth state
 */
export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active session
    const getSession = async () => {
      const { data, error } = await authService.getSession();
      
      if (error) {
        console.error('Error getting session:', error.message);
      }
      
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setIsLoading(false);
    };
    
    getSession();

    // Listen for auth changes
    const subscription = authService.onAuthStateChange((session, user) => {
      setSession(session);
      setUser(user);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, session, isLoading, setIsLoading };
};
