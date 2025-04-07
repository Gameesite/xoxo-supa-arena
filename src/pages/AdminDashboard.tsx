
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Ban, Trash2, Gift, Cpu, Medal } from 'lucide-react';

interface User {
  id: string;
  email: string;
  username: string;
  is_banned?: boolean;
  ban_type?: string;
  is_hacker?: boolean;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [temporaryBanDays, setTemporaryBanDays] = useState(1);
  
  const [redeemCodeType, setRedeemCodeType] = useState('gold');
  const [redeemCode, setRedeemCode] = useState('');

  // For gift section
  const [giftUserId, setGiftUserId] = useState('');
  const [giftType, setGiftType] = useState('gold');
  const [giftAmount, setGiftAmount] = useState(100);

  useEffect(() => {
    // Check if admin code is in localStorage
    const adminCode = localStorage.getItem('adminCode');
    if (adminCode !== 'admin2005souhail') {
      navigate('/admin');
      return;
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, is_banned, ban_type, is_hacker')
        .order('username', { ascending: true });
      
      if (error) throw error;

      // Fetch emails from auth.users for each profile
      if (data) {
        const usersWithEmail = await Promise.all(data.map(async (profile) => {
          const { data: userData, error: userError } = await supabase.auth.admin.getUserById(profile.id);
          
          if (userError || !userData) {
            return { ...profile, email: 'Email not available' };
          }
          
          return { ...profile, email: userData.user.email || 'Email not available' };
        }));
        
        setUsers(usersWithEmail);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async (type: 'permanent' | 'temporary') => {
    if (!selectedUserId) {
      toast({
        title: 'Error',
        description: 'Please select a user to ban',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          is_banned: true,
          ban_type: type,
          ban_end_date: type === 'temporary' ? 
            new Date(Date.now() + temporaryBanDays * 24 * 60 * 60 * 1000).toISOString() : 
            null
        })
        .eq('id', selectedUserId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `User has been ${type === 'permanent' ? 'permanently' : 'temporarily'} banned`,
      });
      
      fetchUsers();
    } catch (error) {
      console.error('Error banning user:', error);
      toast({
        title: 'Error',
        description: 'Failed to ban user',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (!selectedUserId) {
      toast({
        title: 'Error',
        description: 'Please select a user to delete',
        variant: 'destructive',
      });
      return;
    }

    if (!window.confirm('Are you sure you want to delete this account? This action cannot be undone.')) {
      return;
    }

    try {
      // Delete user's game results
      const { error: gameResultsError } = await supabase
        .from('game_results')
        .delete()
        .eq('user_id', selectedUserId);

      if (gameResultsError) throw gameResultsError;

      // Delete user's profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', selectedUserId);

      if (profileError) throw profileError;

      // Delete user from auth
      const { error: authError } = await supabase.auth.admin.deleteUser(selectedUserId);
      
      if (authError) throw authError;

      toast({
        title: 'Success',
        description: 'User account has been permanently deleted',
      });
      
      setSelectedUserId('');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete user account',
        variant: 'destructive',
      });
    }
  };

  const handleSendGift = async () => {
    if (!giftUserId) {
      toast({
        title: 'Error',
        description: 'Please select a user to send a gift',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { data: userData, error: fetchError } = await supabase
        .from('profiles')
        .select(giftType === 'gold' ? 'points' : 'gems')
        .eq('id', giftUserId)
        .single();

      if (fetchError) throw fetchError;

      const currentAmount = giftType === 'gold' ? userData.points || 0 : userData.gems || 0;
      const newAmount = currentAmount + giftAmount;

      const updateData = giftType === 'gold' ? { points: newAmount } : { gems: newAmount };
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', giftUserId);

      if (updateError) throw updateError;

      // Record gift in gifts table
      const { error: giftError } = await supabase
        .from('gifts')
        .insert({
          user_id: giftUserId,
          gift_type: giftType,
          amount: giftAmount,
          sent_by: 'admin'
        });

      if (giftError) throw giftError;

      toast({
        title: 'Gift Sent!',
        description: `${giftAmount} ${giftType} has been sent to the user`,
      });
      
      setGiftUserId('');
      setGiftAmount(100);
    } catch (error) {
      console.error('Error sending gift:', error);
      toast({
        title: 'Error',
        description: 'Failed to send gift',
        variant: 'destructive',
      });
    }
  };

  const handleAddRedeemCode = async () => {
    if (!redeemCode) {
      toast({
        title: 'Error',
        description: 'Please enter a redeem code',
        variant: 'destructive',
      });
      return;
    }

    try {
      let rewardAmount = 0;
      let isVip = false;
      let vipType = '';

      switch (redeemCodeType) {
        case 'gold':
          rewardAmount = 500;
          break;
        case 'jewels':
          rewardAmount = 100;
          break;
        case 'vipPass':
          isVip = true;
          vipType = 'permanent';
          break;
        case 'allRewards':
          rewardAmount = 1000; // Gold
          // Additional rewards will be handled when code is redeemed
          break;
      }

      const { error } = await supabase
        .from('redeem_codes')
        .insert({
          code: redeemCode,
          type: redeemCodeType,
          reward_amount: rewardAmount,
          is_vip: isVip,
          vip_type: vipType,
          all_rewards: redeemCodeType === 'allRewards'
        });

      if (error) throw error;

      toast({
        title: 'Code Added',
        description: `Redeem code for ${redeemCodeType} has been added successfully`,
      });
      
      setRedeemCode('');
    } catch (error) {
      console.error('Error adding redeem code:', error);
      toast({
        title: 'Error',
        description: 'Failed to add redeem code',
        variant: 'destructive',
      });
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button 
          variant="destructive"
          onClick={() => {
            localStorage.removeItem('adminCode');
            navigate('/admin');
          }}
        >
          Logout from Admin
        </Button>
      </div>

      <Tabs defaultValue="ban">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="ban">Ban Requests</TabsTrigger>
          <TabsTrigger value="hack">Hack Users</TabsTrigger>
          <TabsTrigger value="delete">Delete Accounts</TabsTrigger>
          <TabsTrigger value="gifts">Send Gifts</TabsTrigger>
          <TabsTrigger value="redeem">Redeem Codes</TabsTrigger>
        </TabsList>

        {/* Ban Requests Tab */}
        <TabsContent value="ban">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Ban className="mr-2 h-5 w-5 text-destructive" />
                Ban Users
              </CardTitle>
              <CardDescription>
                Apply temporary or permanent bans to user accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="selectUser">Select User</Label>
                  <select 
                    id="selectUser"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                  >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Permanent Ban</Label>
                    <div className="flex items-center">
                      <Button 
                        variant="destructive"
                        onClick={() => handleBanUser('permanent')}
                        disabled={!selectedUserId}
                      >
                        Apply Permanent Ban
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Temporary Ban</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        min="1"
                        max="365"
                        value={temporaryBanDays}
                        onChange={(e) => setTemporaryBanDays(parseInt(e.target.value) || 1)}
                        className="w-20"
                      />
                      <span>days</span>
                      <Button 
                        variant="default"
                        onClick={() => handleBanUser('temporary')}
                        disabled={!selectedUserId}
                      >
                        Apply Temporary Ban
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-2">Currently Banned Users</h3>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-2">
                      {users.filter(u => u.is_banned).length > 0 ? (
                        users
                          .filter(u => u.is_banned)
                          .map(user => (
                            <div key={user.id} className="p-3 border rounded-md flex items-center justify-between">
                              <div>
                                <div className="font-medium">{user.username}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                                <div className="text-xs text-red-500">
                                  {user.ban_type === 'permanent' 
                                    ? 'Permanently banned' 
                                    : 'Temporarily banned'}
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={async () => {
                                  try {
                                    const { error } = await supabase
                                      .from('profiles')
                                      .update({ is_banned: false, ban_type: null, ban_end_date: null })
                                      .eq('id', user.id);
                                    
                                    if (error) throw error;
                                    
                                    toast({
                                      title: 'Ban Removed',
                                      description: `Ban has been removed from ${user.username}`,
                                    });
                                    
                                    fetchUsers();
                                  } catch (error) {
                                    console.error('Error removing ban:', error);
                                    toast({
                                      title: 'Error',
                                      description: 'Failed to remove ban',
                                      variant: 'destructive',
                                    });
                                  }
                                }}
                              >
                                Unban
                              </Button>
                            </div>
                          ))
                      ) : (
                        <p className="text-muted-foreground">No banned users found</p>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Hack Users Tab */}
        <TabsContent value="hack">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cpu className="mr-2 h-5 w-5 text-destructive" />
                Hack Reports
              </CardTitle>
              <CardDescription>
                View and manage users who have been flagged for using hacks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Flagged Users</h3>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-2">
                      {users.filter(u => u.is_hacker).length > 0 ? (
                        users
                          .filter(u => u.is_hacker)
                          .map(user => (
                            <div key={user.id} className="p-3 border rounded-md flex items-center justify-between">
                              <div>
                                <div className="font-medium">{user.username}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                                <div className="text-xs text-red-500">Flagged for hacking</div>
                              </div>
                              <div className="space-x-2">
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={async () => {
                                    setSelectedUserId(user.id);
                                    handleDeleteAccount();
                                  }}
                                >
                                  Delete Account
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={async () => {
                                    try {
                                      const { error } = await supabase
                                        .from('profiles')
                                        .update({ is_hacker: false })
                                        .eq('id', user.id);
                                      
                                      if (error) throw error;
                                      
                                      toast({
                                        title: 'Flag Removed',
                                        description: `Hack flag has been removed from ${user.username}`,
                                      });
                                      
                                      fetchUsers();
                                    } catch (error) {
                                      console.error('Error removing hack flag:', error);
                                      toast({
                                        title: 'Error',
                                        description: 'Failed to remove flag',
                                        variant: 'destructive',
                                      });
                                    }
                                  }}
                                >
                                  Remove Flag
                                </Button>
                              </div>
                            </div>
                          ))
                      ) : (
                        <p className="text-muted-foreground">No flagged users found</p>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Delete Accounts Tab */}
        <TabsContent value="delete">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trash2 className="mr-2 h-5 w-5 text-destructive" />
                Delete User Accounts
              </CardTitle>
              <CardDescription>
                Permanently delete user accounts from the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deleteUser">Select User to Delete</Label>
                  <select 
                    id="deleteUser"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                  >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-4">
                  <Button 
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    disabled={!selectedUserId}
                    className="flex items-center"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Permanently Delete Account
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Warning: This action cannot be undone. All user data will be permanently deleted.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Send Gifts Tab */}
        <TabsContent value="gifts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="mr-2 h-5 w-5 text-primary" />
                Send Gifts to Users
              </CardTitle>
              <CardDescription>
                Send in-game currency or special items to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="giftUser">Select User</Label>
                  <select 
                    id="giftUser"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                    value={giftUserId}
                    onChange={(e) => setGiftUserId(e.target.value)}
                  >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="giftType">Gift Type</Label>
                  <select 
                    id="giftType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                    value={giftType}
                    onChange={(e) => setGiftType(e.target.value)}
                  >
                    <option value="gold">X Gold</option>
                    <option value="gems">Red Gems</option>
                    <option value="vipGold">VIP Pass (Gold)</option>
                    <option value="vipDiamond">VIP Pass (Diamond)</option>
                  </select>
                </div>

                {(giftType === 'gold' || giftType === 'gems') && (
                  <div className="space-y-2">
                    <Label htmlFor="giftAmount">Amount</Label>
                    <Input
                      id="giftAmount"
                      type="number"
                      min="1"
                      value={giftAmount}
                      onChange={(e) => setGiftAmount(parseInt(e.target.value) || 0)}
                    />
                  </div>
                )}

                <div className="pt-4">
                  <Button 
                    onClick={handleSendGift}
                    disabled={!giftUserId}
                    className="flex items-center"
                  >
                    <Gift className="mr-2 h-4 w-4" />
                    Send Gift
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Redeem Codes Tab */}
        <TabsContent value="redeem">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Medal className="mr-2 h-5 w-5 text-primary" />
                Redeem Codes
              </CardTitle>
              <CardDescription>
                Create and manage redeem codes for various rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="codeType">Code Type</Label>
                  <select 
                    id="codeType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                    value={redeemCodeType}
                    onChange={(e) => setRedeemCodeType(e.target.value)}
                  >
                    <option value="gold">Gold Code</option>
                    <option value="jewels">Jewels Code</option>
                    <option value="vipPass">VIP Pass Code (Permanent)</option>
                    <option value="allRewards">All Rewards Code</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="redeemCode">Redeem Code</Label>
                  <Input
                    id="redeemCode"
                    placeholder="Enter redeem code"
                    value={redeemCode}
                    onChange={(e) => setRedeemCode(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Create a unique code that users can enter to claim this reward
                  </p>
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={handleAddRedeemCode}
                    disabled={!redeemCode}
                    className="flex items-center"
                  >
                    Add Redeem Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
