
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { RefreshCw, Trophy } from 'lucide-react';

interface GameProps {
  onGameEnd?: (result: 'win' | 'loss' | 'draw') => void;
}

const TicTacToe = ({ onGameEnd }: GameProps) => {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
    setGameOver(false);
  };

  const checkWinner = (squares: Array<string | null>): { winner: string | null; line: number[] | null } => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];
    
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    
    return { winner: null, line: null };
  };

  const handleClick = async (index: number) => {
    if (board[index] || winner || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    
    const { winner: newWinner, line } = checkWinner(newBoard);
    const isBoardFull = newBoard.every(square => square !== null);
    
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
    if (newWinner) {
      setWinner(newWinner);
      setWinningLine(line);
      setGameOver(true);
      
      toast({
        title: `Player ${newWinner} wins!`,
        description: "Congratulations on your victory!",
      });

      if (user) {
        try {
          // Record the game result
          const { error } = await supabase
            .from('game_results')
            .insert({
              user_id: user.id,
              result: newWinner === 'X' ? 'win' : 'loss',
              game_type: 'tic-tac-toe',
            });

          if (error) throw error;

          // Update user stats
          const { data: profile, error: fetchError } = await supabase
            .from('profiles')
            .select('games_played, games_won, points')
            .eq('id', user.id)
            .single();

          if (fetchError) throw fetchError;

          if (profile) {
            const points = (profile.points || 0) + (newWinner === 'X' ? 5 : 0);
            const gamesPlayed = (profile.games_played || 0) + 1;
            const gamesWon = (profile.games_won || 0) + (newWinner === 'X' ? 1 : 0);
            let rank = 'Bronze';
            
            if (points >= 100) rank = 'Silver';
            if (points >= 300) rank = 'Gold';
            if (points >= 600) rank = 'Platinum';
            if (points >= 1000) rank = 'Diamond';

            const { error: updateError } = await supabase
              .from('profiles')
              .update({
                games_played: gamesPlayed,
                games_won: gamesWon,
                points: points,
                rank: rank,
              })
              .eq('id', user.id);

            if (updateError) throw updateError;
          }

          if (onGameEnd) onGameEnd(newWinner === 'X' ? 'win' : 'loss');
        } catch (error) {
          console.error('Error updating game statistics:', error);
        }
      }
    } else if (isBoardFull) {
      setGameOver(true);
      toast({
        title: "It's a draw!",
        description: "The game ended in a tie.",
      });

      if (user) {
        try {
          // Record the game result
          const { error } = await supabase
            .from('game_results')
            .insert({
              user_id: user.id,
              result: 'draw',
              game_type: 'tic-tac-toe',
            });

          if (error) throw error;

          // Update user stats
          const { data: profile, error: fetchError } = await supabase
            .from('profiles')
            .select('games_played, points')
            .eq('id', user.id)
            .single();

          if (fetchError) throw fetchError;

          if (profile) {
            const { error: updateError } = await supabase
              .from('profiles')
              .update({
                games_played: (profile.games_played || 0) + 1,
                points: (profile.points || 0) + 2, // 2 points for a draw
              })
              .eq('id', user.id);

            if (updateError) throw updateError;
          }
          
          if (onGameEnd) onGameEnd('draw');
        } catch (error) {
          console.error('Error updating game statistics:', error);
        }
      }
    }
  };

  const renderSquare = (index: number) => {
    const isWinningSquare = winningLine && winningLine.includes(index);
    
    return (
      <button
        key={index}
        className={`game-cell ${
          isWinningSquare ? 'cell-win ' : ''
        }${board[index] === 'X' ? 'x-marker' : board[index] === 'O' ? 'o-marker' : ''}`}
        onClick={() => handleClick(index)}
        disabled={!!board[index] || !!winner || gameOver}
      >
        {board[index]}
      </button>
    );
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every(square => square !== null)) {
      return "Draw!";
    } else {
      return `Next player: ${isXNext ? 'X' : 'O'}`;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center">
          <Trophy className="mr-2 h-5 w-5 text-primary" />
          Tic Tac Toe
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="game-board">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => renderSquare(i))}
        </div>
        <div className="mt-4 text-center text-lg font-medium">{getStatus()}</div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={resetGame} className="flex items-center">
          <RefreshCw className="mr-2 h-4 w-4" />
          New Game
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TicTacToe;
