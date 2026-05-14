"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getSession, SessionUser } from '@/src/lib/auth';
import { getCommentsByIdeaId, getIdeaById } from '@/src/lib/ideas';
import { Comment, Idea } from '@/src/types/models';
import { StatusBadge } from '@/src/components/StatusBadge';

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function IdeaDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [session, setSession] = useState<SessionUser | null>(null);
  const [idea, setIdea] = useState<Idea | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadIdea() {
      const currentSession = getSession();
      if (!currentSession) {
        router.replace('/login');
        return;
      }

      setSession(currentSession);

      const ideaId = typeof params?.id === 'string' ? params.id : '';
      if (!ideaId) {
        setLoading(false);
        return;
      }

      const currentIdea = await getIdeaById(ideaId);
      if (!currentIdea) {
        setLoading(false);
        return;
      }

      if (currentSession.role === 'submitter' && currentIdea.createdById !== currentSession.id) {
        router.replace('/dashboard');
        return;
      }

      const ideaComments = await getCommentsByIdeaId(ideaId);
      setIdea(currentIdea);
      setComments(ideaComments.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)));
      setLoading(false);
    }

    loadIdea();
  }, [params, router]);

  if (loading) {
    return <div className="mx-auto max-w-4xl px-4 py-12 text-slate-600">Loading idea details...</div>;
  }

  if (!idea) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Idea not found</h1>
          <p className="mt-2 text-slate-600">The requested idea may have been removed.</p>
          <Link href={session?.role === 'admin' ? '/admin' : '/dashboard'} className="mt-5 inline-block text-blue-600 hover:underline">
            Back
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">{idea.title}</h1>
          <p className="mt-2 text-slate-600">Created {formatDate(idea.createdAt)}</p>
        </div>
        <StatusBadge status={idea.status} />
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Category</p>
            <p className="mt-1 text-slate-900">{idea.category ?? 'Unspecified'}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Attachment</p>
            <p className="mt-1 text-slate-900">{idea.fileUrl ?? 'No attachment uploaded'}</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-xs uppercase tracking-wide text-slate-500">Description</p>
          <p className="mt-2 whitespace-pre-wrap text-slate-800">{idea.description}</p>
        </div>
      </article>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Admin Comments</h2>
        {comments.length === 0 ? (
          <p className="mt-2 text-slate-600">No comments available yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {comments.map((comment) => (
              <article key={comment.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-800">{comment.content}</p>
                <p className="mt-2 text-xs text-slate-500">{formatDate(comment.createdAt)}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <Link
        href={session?.role === 'admin' ? '/admin' : '/dashboard'}
        className="mt-5 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        Back to {session?.role === 'admin' ? 'admin panel' : 'dashboard'}
      </Link>
    </section>
  );
}
