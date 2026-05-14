"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, SessionUser } from '@/src/lib/auth';

export default function AdminPage() {
  const router = useRouter();
  const [session, setSession] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = getSession();
    if (!currentSession) {
      router.replace('/login');
      return;
    }

    if (currentSession.role !== 'admin') {
      router.replace('/dashboard');
      return;
    }

    setSession(currentSession);
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div className="mx-auto max-w-5xl px-4 py-12 text-slate-600">Loading admin panel...</div>;
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold text-slate-900">Admin Panel</h1>
      <p className="mt-2 text-slate-600">Welcome {session?.name}. Idea review workflow will be expanded in Phase 4.</p>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-700">Admin access is configured. Use this panel for review features in the next phase.</p>
      </div>
    </section>
  );
}
