// components/ui/login-form.tsx

'use client';

import { lusitana } from '@/components/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { Button } from './button';
import { useActionState, useState } from 'react';
import { authenticate } from '@/app//lib/action';
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { AuthError } from 'next-auth';
import Link from 'next/link';

export default function LoginForm() {
  // const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setIsPending(true);
      setErrorMessage(null);

      const formData = new FormData(event.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        // Handle specific error types
        if (result.error === 'CredentialsSignin') {
          setErrorMessage('Invalid credentials');
        } else {
          setErrorMessage('Something went wrong.');
        }
      }
    } catch (error) {
      throw error;
    } finally {
      setIsPending(false);
    }
  }



  // Redirect based on the user's role after login
  useEffect(() => {
    if (status === 'authenticated') {
      if (session?.user?.role === 'admin') {
        router.push('/dashboard'); // Redirect admin to dashboard
      } else {
        router.push('/cart'); // Redirect regular user to cart page
      }
    }
  }, [session, status, router]);

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="flex-1 rounded-lg bg-gray-50 shadow-md px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full" aria-disabled={isPending} type='submit'>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <p className='text-sm text-gray-500 mt-4 text-right'>Don't have an account?<Link href={'/sign-up'}><span className='underline hover:text-sky-700'>Sign up</span></Link></p>
        <div className="flex h-8 items-end space-x-1" aria-live='polite' aria-atomic='true'>
          {/* Add form errors here  */}
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

