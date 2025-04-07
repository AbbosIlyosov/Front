'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';

interface SignupResponse {
  success: boolean;
  message?: string;
}

const Register = () => {

    const router = useRouter();
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      
      // Form validation
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      if (!acceptTerms) {
        setError('You must accept the terms and conditions');
        return;
      }
      
      setIsLoading(true);
      setError('');
  
      try {
        // Replace this with your actual registration logic
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            fullName, 
            email, 
            password 
          }),
        });
  
        const data: SignupResponse = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }
  
        // Redirect to login page or directly to dashboard
        router.push('/login?registered=true');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred during registration');
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <main className='h-[calc(100vh-80px)] overflow-hidden p-5 relative flex justify-center items-center'>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10 before:content-[''] before:fixed before:inset-0 before:backdrop-blur-xs"
          style={{backgroundImage: "url('/backgrounds/Background.png')"}}
        >
        </div>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your details to register for a new account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  I accept the{' '}
                  <Link href="/terms" className="text-primary hover:underline">
                    terms and conditions
                  </Link>
                </Label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full cursor-pointer" 
                disabled={isLoading || !acceptTerms}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 border-t pt-4">
            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline cursor-pointer">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    );
}

export default Register