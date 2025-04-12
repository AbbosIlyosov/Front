'use client';

import { useState, FormEvent, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Swal from 'sweetalert2';
import { useAuthUser } from '@/components/AuthUserProvider';
import { loginAction } from '@/actions/auth/login';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { setAuthenticatedUser } = useAuthUser();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  
    startTransition(async () => {
      try {
        const res = await loginAction(email, password);

        if (res && res.user) {

          setAuthenticatedUser(res.user);

          Swal.fire({
            title: 'Welcome!',
            text: 'Login Successful.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
  
          router.push('/points');
        } else {
          Swal.fire({
            title: 'Oops!',
            text: res?.error || 'Login failed. Check your credentials and try again.',
            icon: 'error',
          });
        }
  
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Something went wrong!';
        Swal.fire({
          title: 'Oops!',
          text: message,
          icon: 'error',
        });
      }
    });
  };
  

  return (
    <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to sign in to your account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isPending}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isPending}
              />
            </div>
            
            {/* <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm">Remember me</Label>
            </div> */}
            
            <Button 
              type="submit" 
              className="w-full cursor-pointer" 
              disabled={isPending}
            >
              {isPending ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4 border-t pt-4">
          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary hover:underline cursor-pointer">
              Create an account
            </Link>
          </div>
        </CardFooter>
    </Card>
  );
}

export default Login