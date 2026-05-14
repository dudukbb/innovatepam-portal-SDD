"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/src/components/AuthForm';
import { registerFormSchema } from '@/src/types/forms';
import { addUser, findUserByEmail, setSession } from '@/src/lib/auth';
import { User } from '@/src/types/models';
import { z } from 'zod';

type RegisterValues = z.infer<typeof registerFormSchema>;

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `user-${Date.now()}`;
}

export default function RegisterPage() {
  const router = useRouter();

  async function handleRegister(values: RegisterValues) {
    const existingUser = await findUserByEmail(values.email);
    if (existingUser) {
      return { error: 'Email already registered.' };
    }

    const user: User = {
      id: generateId(),
      email: values.email,
      name: values.name,
      role: 'submitter',
      passwordHash: values.password,
    };

    await addUser(user);
    setSession(user);
    router.push('/dashboard');
    return {};
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <AuthForm
        schema={registerFormSchema}
        fields={[
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'name', label: 'Name' },
          { name: 'password', label: 'Password', type: 'password' },
        ]}
        onSubmit={handleRegister}
        submitLabel="Register"
      />
      <p className="mt-4 text-sm text-slate-700">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
