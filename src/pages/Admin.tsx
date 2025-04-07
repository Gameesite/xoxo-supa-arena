
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Shield, Key } from 'lucide-react';

const Admin = () => {
  const [adminCode, setAdminCode] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (adminCode === 'admin2005souhail') {
      toast({
        title: 'Access granted',
        description: 'Welcome to the admin dashboard.',
      });
      navigate('/admin/dashboard');
    } else {
      toast({
        title: 'Access denied',
        description: 'Invalid admin code. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome, Admin</CardTitle>
          <CardDescription className="text-center">
            Please enter the admin code to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Key className="h-4 w-4 text-muted-foreground" />
                <label htmlFor="adminCode" className="text-sm font-medium leading-none">
                  Admin Code
                </label>
              </div>
              <Input
                id="adminCode"
                type="password"
                placeholder="Enter admin code"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Access Admin Dashboard
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Only authorized personnel should access this area.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Admin;
