"use client";

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthForm } from '@/src/components/AuthForm';
import { loginFormSchema } from '@/src/types/forms';
import { findUserByEmail, getAuthorizedRedirectPath, getDemoUser, getSession, setSession } from '@/src/lib/auth';
import { z } from 'zod';

type LoginValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedRedirect = searchParams.get('redirect');
  const requestedRole = searchParams.get('role');
  const registered = searchParams.get('registered');

  useEffect(() => {
    const currentSession = getSession();
    if (!currentSession) return;

    router.replace(getAuthorizedRedirectPath(currentSession.role, requestedRedirect));
  }, [requestedRedirect, router]);

  const roleMessage = requestedRole === 'admin'
    ? 'Please log in as Admin/Jury to continue.'
    : requestedRole === 'employee'
      ? 'Please log in as Employee to continue.'
      : null;

  async function signInDemo(role: 'submitter' | 'admin') {
    const user = await getDemoUser(role);
    if (!user) {
      return;
    }

    setSession(user);
    router.push(getAuthorizedRedirectPath(user.role, requestedRedirect));
  }

  async function handleLogin(values: LoginValues) {
    const user = await findUserByEmail(values.email);
    if (!user || user.passwordHash !== values.password) {
      return { error: 'Invalid email or password.' };
    }

    setSession(user);
    router.push(getAuthorizedRedirectPath(user.role, requestedRedirect));
    return {};
  }

  return (
    <div className="min-h-screen px-4 py-12 sm:py-16">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="rounded-[1.75rem] bg-slate-950 p-8 text-white shadow-[0_22px_60px_rgba(15,23,42,0.28)] sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-300">Demo Access</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Login to continue the MVP flow</h1>
          <p className="mt-4 leading-7 text-slate-300">
            Use the seeded local demo users for evaluator review, or sign in with any submitter account created during the demo.
          </p>
          {roleMessage ? (
            <div className="mt-6 rounded-2xl border border-blue-200/20 bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-100">
              {roleMessage}
            </div>
          ) : null}
          {registered === '1' ? (
            <div className="mt-4 rounded-2xl border border-emerald-300/40 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-100">
              Registration completed. Please login with your new account.
            </div>
          ) : null}
          <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/10 p-5 text-sm shadow-inner">
            <div>
              <p className="font-medium text-white">Employee Demo</p>
              <p className="mt-1 text-slate-300">submitter@test.com</p>
            </div>
            <div>
              <p className="font-medium text-white">Admin/Jury Demo</p>
              <p className="mt-1 text-slate-300">admin@test.com</p>
            </div>
            <p className="border-t border-white/10 pt-4 text-slate-200">Password for both demo accounts: Password123!</p>
          </div>
          <div className="mt-6 grid gap-3">
            <button
              type="button"
              onClick={() => signInDemo('submitter')}
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Continue as Employee Demo
            </button>
            <button
              type="button"
              onClick={() => signInDemo('admin')}
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/15"
            >
              Continue as Admin/Jury Demo
            </button>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
          <AuthForm
            schema={loginFormSchema}
            fields={[
              { name: 'email', label: 'Email', type: 'email' },
              { name: 'password', label: 'Password', type: 'password' },
            ]}
            onSubmit={handleLogin}
            submitLabel="Login"
          />
          <p className="mt-4 text-center text-sm text-slate-700">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium text-blue-600 transition hover:text-blue-700 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
