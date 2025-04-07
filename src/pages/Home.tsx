
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, LogIn, UserPlus, Gamepad2, Trophy, Users } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="container py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          <span className="text-primary">XO</span> <span className="text-secondary">Online</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-8">
          Experience the classic game of Tic-Tac-Toe like never before! Play against friends, 
          earn rewards, and climb the ranks in our online gaming platform.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          {user ? (
            <Button size="lg" asChild className="animate-pulse">
              <Link to="/dashboard" className="flex items-center">
                <Gamepad2 className="mr-2 h-5 w-5" />
                Play Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <>
              <Button size="lg" asChild variant="default">
                <Link to="/login" className="flex items-center">
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </Link>
              </Button>
              <Button size="lg" asChild variant="outline">
                <Link to="/signup" className="flex items-center">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-card rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <Gamepad2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-2">Classic Gameplay</h2>
          <p className="text-muted-foreground">
            Enjoy the timeless game of Tic-Tac-Toe with a modern twist. Simple yet strategic!
          </p>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <div className="bg-secondary/10 p-3 rounded-full mb-4">
            <Trophy className="h-8 w-8 text-secondary" />
          </div>
          <h2 className="text-xl font-bold mb-2">Earn Rewards</h2>
          <p className="text-muted-foreground">
            Win games to earn points and climb the ranks from Bronze to Diamond tier.
          </p>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-2">Online Community</h2>
          <p className="text-muted-foreground">
            Compete against players from around the world and make your way to the top of the leaderboard.
          </p>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-6">How to Play</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <span className="font-bold text-primary">1</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Create an Account</h3>
            <p className="text-muted-foreground">
              Sign up with your email and set a password to begin your journey.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <span className="font-bold text-primary">2</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Start Playing</h3>
            <p className="text-muted-foreground">
              Jump into a game and try to get three of your marks in a row, column, or diagonal.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <span className="font-bold text-primary">3</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Win & Earn</h3>
            <p className="text-muted-foreground">
              Win games to earn points, level up your rank, and unlock new features.
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Play?</h2>
        <p className="text-xl text-muted-foreground mb-6">
          Join thousands of players and start your XO Online adventure today!
        </p>
        
        {user ? (
          <Button size="lg" asChild>
            <Link to="/dashboard" className="flex items-center">
              <Gamepad2 className="mr-2 h-5 w-5" />
              Go to Dashboard
            </Link>
          </Button>
        ) : (
          <Button size="lg" asChild>
            <Link to="/signup" className="flex items-center">
              <UserPlus className="mr-2 h-5 w-5" />
              Sign Up Now
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
