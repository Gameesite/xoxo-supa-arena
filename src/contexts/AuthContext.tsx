
import React, { createContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';
import { authService } from '@/services/authService';
import { useAuthState } from '@/hooks/useAuthState';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signInAnonymously: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, session, isLoading, setIsLoading } = useAuthState();
  const navigate = useNavigate();
  const { toast } = useToast();

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await authService.signUp(email, password);

      if (error) throw error;

      // Initialize user data in database
      if (data.user) {
        const { error: profileError } = await authService.createUserProfile(
          data.user.id,
          email.split('@')[0]
        );

        if (profileError) {
          console.error('Error creating profile:', profileError);
          toast({
            title: 'Error creating profile',
            description: profileError.message,
            variant: 'destructive',
          });
        }
      }

      toast({
        title: 'Account created!',
        description: 'You have successfully signed up.',
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Sign up failed',
        description: error.message,
        variant: 'destructive',
      });
      console.error('Error signing up:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await authService.signIn(email, password);

      if (error) throw error;
      
      toast({
        title: 'Logged in!',
        description: 'You have successfully logged in.',
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive',
      });
      console.error('Error signing in:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const { error } = await authService.signInWithOAuth('google');

      if (error) throw error;
      
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive',
      });
      console.error('Error signing in with Google:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    try {
      setIsLoading(true);
      const { error } = await authService.signInWithOAuth('facebook');

      if (error) throw error;
      
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive',
      });
      console.error('Error signing in with Facebook:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGitHub = async () => {
    try {
      setIsLoading(true);
      const { error } = await authService.signInWithOAuth('github');

      if (error) throw error;
      
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive',
      });
      console.error('Error signing in with GitHub:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signInAnonymously = async () => {
    try {
      setIsLoading(true);
      
      // Create a random email and password for anonymous auth
      const randomString = Math.random().toString(36).substring(2, 15);
      const email = `anonymous_${randomString}@example.com`;
      const password = randomString + Math.random().toString(36).substring(2, 15);
      
      const { data, error } = await authService.signUp(email, password);

      if (error) throw error;
      
      // Initialize user profile for anonymous user
      if (data.user) {
        const { error: profileError } = await authService.createUserProfile(
          data.user.id,
          `Guest_${Math.floor(Math.random() * 10000)}`
        );

        if (profileError) {
          console.error('Error creating profile for anonymous user:', profileError);
        }
      }
      
      toast({
        title: 'Welcome!',
        description: 'You are now signed in as a guest.',
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Anonymous login failed',
        description: error.message,
        variant: 'destructive',
      });
      console.error('Error signing in anonymously:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await authService.signOut();
      if (error) throw error;
      
      toast({
        title: 'Logged out',
        description: 'You have been logged out successfully.',
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        title: 'Sign out failed',
        description: error.message,
        variant: 'destructive',
      });
      console.error('Error signing out:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signUp,
        signIn,
        signInWithGoogle,
        signInWithFacebook,
        signInWithGitHub,
        signInAnonymously,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
