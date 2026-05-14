"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, SessionUser } from '@/src/lib/auth';
import { getIdeasByUser } from '@/src/lib/ideas';
import { Idea } from '@/src/types/models';
import { StatusBadge } from '@/src/components/StatusBadge';

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<SessionUser | null>(null);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const currentSession = getSession();

      if (!currentSession) {
        router.replace('/login');
        return;
      }

      if (currentSession.role !== 'submitter') {
        router.replace('/admin');
        return;
      }

      setSession(currentSession);
      const userIdeas = await getIdeasByUser(currentSession.id);
      setIdeas(userIdeas.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)));
      setLoading(false);
    }

    loadDashboard();
  }, [router]);

  const hasIdeas = useMemo(() => ideas.length > 0, [ideas]);

  if (loading) {
    return <div className="mx-auto max-w-5xl px-4 py-12 text-slate-600">Loading your ideas...</div>;
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Welcome, {session?.name}</h1>
          <p className="mt-1 text-slate-600">Track the status of your submitted innovation ideas.</p>
        </div>
        <Link
          href="/submit"
          className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Submit New Idea
        </Link>
      </div>

      {!hasIdeas ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-800">No ideas submitted yet</h2>
          <p className="mt-2 text-slate-600">Start by submitting your first innovation idea.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {ideas.map((idea) => (
            <article key={idea.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-900">{idea.title}</h2>
                <StatusBadge status={idea.status} />
              </div>
              <p className="mt-2 text-sm text-slate-600">Category: {idea.category ?? 'Unspecified'}</p>
              <p className="mt-1 text-sm text-slate-600">Created: {formatDate(idea.createdAt)}</p>
              <Link href={`/ideas/${idea.id}`} className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">
                View details
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
