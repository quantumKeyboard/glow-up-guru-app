import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Droplets } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('An error occurred during login');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-skin-lime/20 to-skin-teal/10 p-4">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-skin-lime to-skin-teal flex items-center justify-center">
              <Droplets size={32} className="text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-skin-darkTeal to-skin-darkBlue">
            SkinDoctors Ki Maa Kaa Bharosaa
          </CardTitle>
          <CardDescription>
            Sign in to your account to track your skincare journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="your.email@example.com" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-skin-teal to-skin-blue hover:from-skin-darkTeal hover:to-skin-darkBlue text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-muted-foreground">
            <span>Don't have an account? </span>
            <Button variant="link" className="p-0 h-auto text-skin-teal" onClick={() => toast.info('Registration feature coming soon!')}>
              Sign up
            </Button>
          </div>
          <div className="text-xs text-center text-muted-foreground">
            <Button variant="link" className="p-0 h-auto text-xs" onClick={() => toast.info('Password reset feature coming soon!')}>
              Forgot your password?
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;