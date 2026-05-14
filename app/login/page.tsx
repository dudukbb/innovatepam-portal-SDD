"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/src/components/AuthForm';
import { loginFormSchema } from '@/src/types/forms';
import { findUserByEmail, setSession } from '@/src/lib/auth';
import { z } from 'zod';

type LoginValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin(values: LoginValues) {
    const user = await findUserByEmail(values.email);
    if (!user || user.passwordHash !== values.password) {
      return { error: 'Invalid email or password.' };
    }

    setSession(user);
    router.push(user.role === 'admin' ? '/admin' : '/dashboard');
    return {};
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <AuthForm
        schema={loginFormSchema}
        fields={[
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'password', label: 'Password', type: 'password' },
        ]}
        onSubmit={handleLogin}
        submitLabel="Login"
      />
      <p className="mt-4 text-sm text-slate-700">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
