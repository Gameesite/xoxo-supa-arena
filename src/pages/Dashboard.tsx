
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import TicTacToe from '@/components/TicTacToe';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Gamepad2, Star, TrendingUp, Trophy } from 'lucide-react';

interface UserStats {
  username: string;
  points: number;
  games_played: number;
  games_won: number;
  rank: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('username, points, games_played, games_won, rank')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setStats(data);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();

    // Subscribe to realtime changes for this user's profile
    const profileSubscription = supabase
      .channel('profiles')
      .on(
        'postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'profiles', 
          filter: `id=eq.${user?.id}` 
        }, 
        payload => {
          setStats(payload.new as UserStats);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(profileSubscription);
    };
  }, [user]);

  const handleGameEnd = async (result: 'win' | 'loss' | 'draw') => {
    // Stats are updated in the TicTacToe component directly
    console.log(`Game ended with result: ${result}`);
  };

  const getRankColor = (rank: string): string => {
    switch (rank) {
      case 'Bronze': return 'text-amber-600';
      case 'Silver': return 'text-gray-400';
      case 'Gold': return 'text-yellow-400';
      case 'Platinum': return 'text-cyan-400';
      case 'Diamond': return 'text-blue-400';
      default: return 'text-foreground';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-r-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Player Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Username</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.username}</div>
            <p className="text-xs text-muted-foreground">
              Welcome back, {stats?.username}!
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.points}</div>
            <p className="text-xs text-muted-foreground">
              Keep playing to earn more points!
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rank</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats?.rank ? getRankColor(stats.rank) : ''}`}>
              {stats?.rank || 'Unranked'}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.rank === 'Diamond' ? 'You reached the highest rank!' : 'Win more games to rank up!'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Gamepad2 className="mr-2 h-6 w-6 text-primary" />
            Play Game
          </h2>
          <TicTacToe onGameEnd={handleGameEnd} />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <TrendingUp className="mr-2 h-6 w-6 text-primary" />
            Statistics
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Game Stats</CardTitle>
              <CardDescription>Your performance summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Games Played:</span>
                  <span className="font-bold">{stats?.games_played || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Games Won:</span>
                  <span className="font-bold">{stats?.games_won || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Win Rate:</span>
                  <span className="font-bold">
                    {stats?.games_played 
                      ? Math.round((stats.games_won / stats.games_played) * 100) 
                      : 0}%
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Win Rate</h3>
                  <div className="h-3 bg-muted rounded-full">
                    <div 
                      className="h-3 bg-primary rounded-full" 
                      style={{ 
                        width: `${stats?.games_played 
                          ? Math.round((stats.games_won / stats.games_played) * 100) 
                          : 0}%` 
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
