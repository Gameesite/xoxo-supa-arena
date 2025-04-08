
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Gift, Check, X, Loader } from 'lucide-react';

interface RedeemRecord {
  id: string;
  code: string;
  type: string;
  status: 'Redeemed' | 'Error' | 'Processing';
  timestamp: string;
}

const RedeemCode = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redeemHistory, setRedeemHistory] = useState<RedeemRecord[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a redeem code',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      if (!user) {
        throw new Error('You must be logged in to redeem codes');
      }

      // Check if code exists and hasn't been redeemed by this user
      const { data: codeData, error: codeError } = await supabase
        .from('redeem_codes')
        .select('*')
        .eq('code', code)
        .single();

      if (codeError || !codeData) {
        throw new Error('Invalid code or code does not exist');
      }

      // Check if user has already redeemed this code
      const { data: redeemData, error: redeemError } = await supabase
        .from('code_redemptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('code_id', codeData.id);

      if (redeemError) {
        throw new Error('Error checking code status');
      }

      if (redeemData && redeemData.length > 0) {
        throw new Error('You have already redeemed this code');
      }

      // Record the redemption
      const { error: insertError } = await supabase
        .from('code_redemptions')
        .insert({
          user_id: user.id,
          code_id: codeData.id,
          redeemed_at: new Date().toISOString()
        });

      if (insertError) {
        throw new Error('Error recording redemption');
      }

      // Get user's current profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('points, gems, vip, vip_type')
        .eq('id', user.id)
        .single();

      if (profileError) {
        throw new Error('Error fetching user profile');
      }

      // Apply the rewards based on code type
      const updates: Record<string, any> = {};
      let rewardDescription = '';

      if (codeData && profileData) {
        switch (codeData.type) {
          case 'gold':
            updates.points = (profileData.points || 0) + (codeData.reward_amount || 0);
            rewardDescription = `${codeData.reward_amount} X Gold`;
            break;
          case 'jewels':
            updates.gems = (profileData.gems || 0) + (codeData.reward_amount || 0);
            rewardDescription = `${codeData.reward_amount} Red Gems`;
            break;
          case 'vipPass':
            updates.vip = true;
            updates.vip_type = codeData.vip_type;
            rewardDescription = `VIP Pass (${codeData.vip_type})`;
            break;
          case 'allRewards':
            updates.points = (profileData.points || 0) + (codeData.reward_amount || 0);
            updates.gems = (profileData.gems || 0) + 200;
            updates.vip = true;
            updates.vip_type = 'gold';
            rewardDescription = 'All Rewards (Gold, Gems & VIP Pass)';
            break;
        }
      }

      // Update user profile with rewards
      const { error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (updateError) {
        throw new Error('Error applying rewards to your account');
      }

      // Add to local redeem history
      setRedeemHistory([
        {
          id: Date.now().toString(),
          code: code,
          type: codeData.type,
          status: 'Redeemed',
          timestamp: new Date().toISOString(),
        },
        ...redeemHistory,
      ]);

      toast({
        title: 'Code Redeemed!',
        description: `You have successfully redeemed ${rewardDescription}!`,
      });

      setCode('');
    } catch (error: any) {
      console.error('Error redeeming code:', error);
      
      // Add failed attempt to history
      setRedeemHistory([
        {
          id: Date.now().toString(),
          code: code,
          type: 'Unknown',
          status: 'Error',
          timestamp: new Date().toISOString(),
        },
        ...redeemHistory,
      ]);
      
      toast({
        title: 'Redemption Failed',
        description: error.message || 'An error occurred while redeeming the code',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getRewardTypeLabel = (type: string) => {
    switch (type) {
      case 'gold': return 'X Gold';
      case 'jewels': return 'Red Gems';
      case 'vipPass': return 'VIP Pass';
      case 'allRewards': return 'All Rewards';
      default: return type;
    }
  };

  return (
    <div className="container py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Redeem Code</h1>
          <p className="text-xl text-muted-foreground">
            Enter your redeem code to claim special rewards
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="mr-2 h-5 w-5 text-primary" />
              Enter Redeem Code
            </CardTitle>
            <CardDescription>
              Enter a valid code to receive in-game rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter your code here"
                  className="uppercase"
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Redeeming...
                    </>
                  ) : (
                    'Confirm'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Redemption History</CardTitle>
            <CardDescription>
              View your recent code redemption attempts
            </CardDescription>
          </CardHeader>
          <CardContent>
            {redeemHistory.length > 0 ? (
              <div className="space-y-4">
                {redeemHistory.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">{record.code}</div>
                      <div className="text-sm text-muted-foreground">
                        {getRewardTypeLabel(record.type)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatTimestamp(record.timestamp)}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {record.status === 'Redeemed' ? (
                        <span className="flex items-center text-green-500">
                          <Check className="mr-1 h-4 w-4" />
                          Redeemed
                        </span>
                      ) : record.status === 'Processing' ? (
                        <span className="flex items-center text-amber-500">
                          <Loader className="mr-1 h-4 w-4 animate-spin" />
                          Processing
                        </span>
                      ) : (
                        <span className="flex items-center text-red-500">
                          <X className="mr-1 h-4 w-4" />
                          Error
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No redemption history to display
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RedeemCode;
