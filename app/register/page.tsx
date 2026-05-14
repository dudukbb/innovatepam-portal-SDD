"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthForm } from '@/src/components/AuthForm';
import { registerFormSchema } from '@/src/types/forms';
import { addUser, clearSession, findUserByEmail } from '@/src/lib/auth';
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleRegister(values: RegisterValues) {
    const existingUser = await findUserByEmail(values.email);
    if (existingUser) {
      return { error: 'Email already registered.' };
    }

    const user: User = {
      id: generateId(),
      email: values.email,
      name: values.name,
      role: values.role,
      passwordHash: values.password,
    };

    await addUser(user);

    // Registration should never auto-authenticate in this MVP flow.
    clearSession();
    setSuccessMessage('Registration successful. Redirecting to login...');

    setTimeout(() => {
      router.push('/login?registered=1');
    }, 1200);

    return {};
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:py-16">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="app-surface p-8 sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Account Registration</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">Create your employee account</h1>
          <p className="mt-4 leading-7 text-slate-600">
            Register with submitter or admin role, then continue through login to access the correct MVP workflow.
          </p>
          <div className="mt-8 rounded-2xl bg-slate-50/90 p-5 text-sm text-slate-700 ring-1 ring-slate-200/70">
            <p className="font-medium text-slate-900">Demo note</p>
            <p className="mt-2 leading-7">
              Seeded local accounts already exist for presentation. You can still register additional submitter or admin accounts for demonstration.
            </p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
          {successMessage ? (
            <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {successMessage}
            </div>
          ) : null}
          <AuthForm
            schema={registerFormSchema}
            fields={[
              { name: 'email', label: 'Email', type: 'email' },
              { name: 'name', label: 'Name' },
              { name: 'password', label: 'Password', type: 'password' },
              {
                name: 'role',
                label: 'Role',
                type: 'select',
                defaultValue: 'submitter',
                options: [
                  { value: 'submitter', label: 'Submitter' },
                  { value: 'admin', label: 'Admin / Jury' },
                ],
              },
            ]}
            onSubmit={handleRegister}
            submitLabel="Register"
          />
          <p className="mt-4 text-center text-sm text-slate-700">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 transition hover:text-blue-700 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
