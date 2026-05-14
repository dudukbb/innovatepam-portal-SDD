"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getDemoUser, getSession, setSession } from '@/src/lib/auth';

export default function Home() {
  const router = useRouter();

  async function handleDemoLogin(role: 'submitter' | 'admin') {
    const demoUser = await getDemoUser(role);
    if (!demoUser) return;

    setSession(demoUser);
    router.push(role === 'admin' ? '/admin' : '/dashboard');
  }

  const currentSession = typeof window !== 'undefined' ? getSession() : null;

  return (
    <main className="min-h-screen px-4 py-14 sm:py-20">
      <section className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-3xl">
          <div className="inline-flex rounded-full border border-blue-200/80 bg-white/90 px-4 py-1.5 text-sm font-medium text-blue-700 shadow-sm">
            Module 08 Final Course Project MVP
          </div>
          <h1 className="mt-7 max-w-2xl text-5xl font-semibold leading-[1.05] text-slate-950 sm:text-6xl">
            InnovatEPAM Portal
          </h1>
          <p className="mt-5 text-xl font-medium text-slate-700 sm:text-2xl">
            Employee Innovation Management Platform
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Employees can submit innovation ideas with supporting context, while jury and admin reviewers evaluate proposals,
            update statuses, and provide structured feedback through a clear MVP review workflow.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={currentSession ? (currentSession.role === 'admin' ? '/admin' : '/dashboard') : '/login'}
              className="app-button-primary"
            >
              Login
            </Link>
            <Link href="/register" className="app-button-secondary">
              Register
            </Link>
            <button
              type="button"
              onClick={() => handleDemoLogin('submitter')}
              className="inline-flex items-center rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-medium text-blue-700 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-100 hover:shadow-sm"
            >
              Employee Demo
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="inline-flex items-center rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-medium text-amber-800 transition duration-200 hover:-translate-y-0.5 hover:bg-amber-100 hover:shadow-sm"
            >
              Admin/Jury Demo
            </button>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <div className="app-card p-5">
              <p className="text-sm font-medium text-slate-500">Submitter Workflow</p>
              <p className="mt-2 text-base leading-7 text-slate-800">Register, submit ideas, and track decision progress in one place.</p>
            </div>
            <div className="app-card p-5">
              <p className="text-sm font-medium text-slate-500">Admin Review</p>
              <p className="mt-2 text-base leading-7 text-slate-800">Filter ideas, update statuses, and leave evaluation feedback.</p>
            </div>
            <div className="app-card p-5">
              <p className="text-sm font-medium text-slate-500">Local MVP Demo</p>
              <p className="mt-2 text-base leading-7 text-slate-800">Built for fast bootcamp review with local-first persistence and SpecKit traceability.</p>
            </div>
          </div>
        </div>

        <aside className="app-surface p-6 sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Demo Overview</p>
          <div className="mt-6 space-y-5">
            <div className="rounded-2xl bg-slate-50/90 p-5 ring-1 ring-slate-200/70">
              <p className="text-sm font-medium text-slate-500">Employee Demo</p>
              <p className="mt-2 leading-7 text-slate-900">Login, submit an idea, and review it in the personal dashboard.</p>
            </div>
            <div className="rounded-2xl bg-slate-50/90 p-5 ring-1 ring-slate-200/70">
              <p className="text-sm font-medium text-slate-500">Admin/Jury Demo</p>
              <p className="mt-2 leading-7 text-slate-900">Open the admin dashboard, filter ideas, update status, and add review feedback.</p>
            </div>
            <div className="rounded-2xl bg-slate-950 p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.25)]">
              <p className="text-sm font-medium text-slate-300">Seeded demo accounts</p>
              <div className="mt-3 space-y-2 text-sm leading-7">
                <p>Employee: submitter@test.com</p>
                <p>Admin: admin@test.com</p>
                <p>Password: Password123!</p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
