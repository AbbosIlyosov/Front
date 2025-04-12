'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { registerAction } from '@/actions/auth/register';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';


const Register = () => {

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    const router = useRouter();

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

        const { success, errorMessage } = await registerAction({firstName, lastName, email, password, phone });
  
        if(success){

          Swal.fire({
            text: 'Account created successfully.',
            timer: 1500,
            icon:'success',
            showConfirmButton: false
          })
          router.push('/login');

        }
        else{

          setError(errorMessage ?? 'Oops! an unknown error occured.');

        }

      } catch (err) {

        setError(err instanceof Error ? JSON.stringify(err) : 'An error occurred during registration');

      } finally {

        setIsLoading(false);
        
      }
    };
  
    return (
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
              <div className='flex justify-between gap-5'>
                <div className="space-y-2 grow-1">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2 grow-1">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className='flex gap-5 justify-between'>
                <div className="space-y-2 grow-1">
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

                <div className="space-y-2 grow-1">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="0000000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className='flex gap-5 justify-between'>
                <div className="space-y-2 grow-1">
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
                
                <div className="space-y-2 grow-1">
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
    );
}

export default Register