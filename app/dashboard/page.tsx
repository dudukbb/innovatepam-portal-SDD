"use client";

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { buildLoginRedirectUrl, getDefaultRouteForRole, getSession, SessionUser } from '@/src/lib/auth';
import { deleteIdeaBySubmitter, getIdeasByUser } from '@/src/lib/ideas';
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
  const [deletingIdeaId, setDeletingIdeaId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserIdeas = useCallback(async (userId: string) => {
    const userIdeas = await getIdeasByUser(userId);
    setIdeas(userIdeas.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)));
  }, []);

  async function handleDeleteIdea(idea: Idea) {
    if (!session) return;

    setActionError(null);

    const shouldDelete = window.confirm('Delete this idea? This action cannot be undone.');
    if (!shouldDelete) return;

    setDeletingIdeaId(idea.id);
    const result = await deleteIdeaBySubmitter(idea.id, session.id);

    if (!result.success) {
      setActionError(result.error ?? 'Unable to delete idea.');
      setDeletingIdeaId(null);
      return;
    }

    await loadUserIdeas(session.id);
    setDeletingIdeaId(null);
  }

  useEffect(() => {
    async function loadDashboard() {
      const currentSession = getSession();

      if (!currentSession) {
        router.replace(buildLoginRedirectUrl('/dashboard', 'submitter'));
        return;
      }

      if (currentSession.role !== 'submitter') {
        router.replace(getDefaultRouteForRole(currentSession.role));
        return;
      }

      setSession(currentSession);
      await loadUserIdeas(currentSession.id);
      setLoading(false);
    }

    loadDashboard();
  }, [loadUserIdeas, router]);

  const hasIdeas = useMemo(() => ideas.length > 0, [ideas]);

  if (loading) {
    return <div className="mx-auto max-w-5xl px-4 py-12 text-slate-600">Loading your ideas...</div>;
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Welcome, {session?.name}</h1>
          <p className="mt-2 max-w-2xl text-slate-600">Track the status of your submitted innovation ideas and continue the MVP review workflow.</p>
        </div>
        <Link href="/submit-idea" className="app-button-primary">
          Submit New Idea
        </Link>
      </div>

      {actionError ? <p className="mb-4 text-sm text-rose-700">{actionError}</p> : null}

      {!hasIdeas ? (
        <div className="app-surface p-8 text-center sm:p-10">
          <h2 className="text-xl font-semibold text-slate-800">No ideas submitted yet</h2>
          <p className="mt-2 text-slate-600">Start by submitting your first innovation idea.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {ideas.map((idea) => (
            <article key={idea.id} className="app-card p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-900">{idea.title}</h2>
                <StatusBadge status={idea.status} />
              </div>
              <p className="mt-3 text-sm text-slate-600">Category: {idea.category ?? 'Unspecified'}</p>
              <p className="mt-1 text-sm text-slate-600">Created: {formatDate(idea.createdAt)}</p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <Link href={`/ideas/${idea.id}`} className="inline-flex text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline">
                  View details
                </Link>
                {idea.status === 'submitted' ? (
                  <button
                    type="button"
                    onClick={() => void handleDeleteIdea(idea)}
                    disabled={deletingIdeaId === idea.id}
                    className="rounded-lg border border-rose-300 px-3 py-1.5 text-sm font-medium text-rose-700 transition hover:border-rose-400 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingIdeaId === idea.id ? 'Deleting...' : 'Delete'}
                  </button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
