"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { buildLoginRedirectUrl, findUserById, getDefaultRouteForRole, getSession, SessionUser } from '@/src/lib/auth';
import { getAllIdeas } from '@/src/lib/ideas';
import { StatusBadge } from '@/src/components/StatusBadge';
import { Idea, IdeaStatus } from '@/src/types/models';

type IdeaWithSubmitter = Idea & {
  submitterName: string;
};

const statusOptions: Array<{ value: IdeaStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All statuses' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
];

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function AdminPage() {
  const router = useRouter();
  const [session, setSession] = useState<SessionUser | null>(null);
  const [ideas, setIdeas] = useState<IdeaWithSubmitter[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<IdeaStatus | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdminDashboard() {
      const currentSession = getSession();
      if (!currentSession) {
        router.replace(buildLoginRedirectUrl('/admin', 'admin'));
        return;
      }

      if (currentSession.role !== 'admin') {
        router.replace(getDefaultRouteForRole(currentSession.role));
        return;
      }

      setSession(currentSession);

      const allIdeas = await getAllIdeas();
      const ideasWithSubmitter = await Promise.all(
        allIdeas.map(async (idea) => {
          const submitter = await findUserById(idea.createdById);
          return {
            ...idea,
            submitterName: submitter?.name ?? 'Unknown submitter',
          };
        })
      );

      setIdeas(ideasWithSubmitter.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)));
      setLoading(false);
    }

    loadAdminDashboard();
  }, [router]);

  const visibleIdeas = selectedStatus === 'all' ? ideas : ideas.filter((idea) => idea.status === selectedStatus);

  if (loading) {
    return <div className="mx-auto max-w-5xl px-4 py-12 text-slate-600">Loading admin panel...</div>;
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Admin Evaluation Dashboard</h1>
          <p className="mt-2 max-w-2xl text-slate-600">Welcome {session?.name}. Review submitted ideas, filter the queue, and move proposals through the decision lifecycle.</p>
        </div>
        <div className="w-full sm:w-72">
          <label htmlFor="status-filter" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500">
            Filter by status
          </label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value as IdeaStatus | 'all')}
            className="app-input"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {visibleIdeas.length === 0 ? (
        <div className="app-surface p-8 text-center sm:p-10">
          <h2 className="text-xl font-semibold text-slate-800">No ideas found</h2>
          <p className="mt-2 text-slate-600">No ideas match the selected status filter.</p>
        </div>
      ) : (
        <div className="grid gap-5">
          {visibleIdeas.map((idea) => (
            <Link
              key={idea.id}
              href={`/ideas/${idea.id}`}
              className="app-card group p-5 sm:p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 transition group-hover:text-slate-700">{idea.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">Submitter: {idea.submitterName}</p>
                  <p className="text-sm text-slate-600">Category: {idea.category ?? 'Unspecified'}</p>
                  <p className="text-sm text-slate-500">Created: {formatDate(idea.createdAt)}</p>
                </div>
                <StatusBadge status={idea.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
