"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getSession, SessionUser } from '@/src/lib/auth';
import { addAdminComment, deleteIdeaBySubmitter, getCommentsByIdeaId, getIdeaById, isValidStatusTransition, updateIdeaStatus } from '@/src/lib/ideas';
import { Comment, Idea, IdeaStatus } from '@/src/types/models';
import { StatusBadge } from '@/src/components/StatusBadge';
import { adminReviewFormSchema } from '@/src/types/forms';

const statusOptions: IdeaStatus[] = ['submitted', 'under_review', 'accepted', 'rejected'];

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
  const [statusDraft, setStatusDraft] = useState<IdeaStatus>('submitted');
  const [commentDraft, setCommentDraft] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  async function reloadIdeaData(ideaId: string) {
    const currentIdea = await getIdeaById(ideaId);
    if (!currentIdea) {
      setIdea(null);
      setLoading(false);
      return;
    }

    const ideaComments = await getCommentsByIdeaId(ideaId);
    setIdea(currentIdea);
    setStatusDraft(currentIdea.status);
    setComments(ideaComments.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)));
    setLoading(false);
  }

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

      await reloadIdeaData(ideaId);
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

  const latestComment = comments[0] ?? null;
  const isAdmin = session?.role === 'admin';
  const isSubmitterOwner = session?.role === 'submitter' && session.id === idea.createdById;
  const canDeleteIdea = isSubmitterOwner && idea.status === 'submitted';

  async function handleSubmitterDelete() {
    if (!isSubmitterOwner || !session || !idea) return;

    setFeedbackMessage(null);
    setActionError(null);

    const shouldDelete = window.confirm('Delete this idea? This action cannot be undone.');
    if (!shouldDelete) return;

    setDeleting(true);
    const result = await deleteIdeaBySubmitter(idea.id, session.id);

    if (!result.success) {
      setDeleting(false);
      setActionError(result.error ?? 'Unable to delete idea.');
      return;
    }

    router.replace('/dashboard');
  }

  async function handleAdminReviewSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isAdmin || !session || !idea) return;

    setFeedbackMessage(null);
    setActionError(null);
    setSaving(true);

    const formValidation = adminReviewFormSchema.safeParse({
      status: statusDraft,
      comment: commentDraft.trim() ? commentDraft.trim() : undefined,
    });

    if (!formValidation.success) {
      setSaving(false);
      setActionError(formValidation.error.errors[0]?.message ?? 'Please check your review input.');
      return;
    }

    const trimmedComment = commentDraft.trim();

    if (!isValidStatusTransition(idea.status, statusDraft)) {
      setSaving(false);
      setActionError(`Invalid transition from ${idea.status} to ${statusDraft}.`);
      return;
    }

    const statusUpdate = await updateIdeaStatus(idea.id, statusDraft);
    if (!statusUpdate.success) {
      setSaving(false);
      setActionError(statusUpdate.error ?? 'Unable to update status.');
      return;
    }

    if (trimmedComment) {
      await addAdminComment(idea.id, session, trimmedComment);
    }

    await reloadIdeaData(idea.id);
    setCommentDraft('');
    setSaving(false);
    setFeedbackMessage('Review updated successfully.');
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">{idea.title}</h1>
          <p className="mt-2 text-slate-600">Created {formatDate(idea.createdAt)}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={idea.status} />
          {canDeleteIdea ? (
            <button
              type="button"
              onClick={() => void handleSubmitterDelete()}
              disabled={deleting}
              className="rounded-lg border border-rose-300 px-3 py-1.5 text-sm font-medium text-rose-700 transition hover:border-rose-400 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deleting ? 'Deleting...' : 'Delete Idea'}
            </button>
          ) : null}
        </div>
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
        <h2 className="text-xl font-semibold text-slate-900">Review Timeline</h2>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-800">Idea submitted</p>
          <p className="mt-1 text-xs text-slate-500">{formatDate(idea.createdAt)}</p>
        </div>
        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-800">Current status: {idea.status.replace('_', ' ')}</p>
          <p className="mt-1 text-xs text-slate-500">Last updated: {formatDate(idea.updatedAt)}</p>
        </div>

        {latestComment ? (
          <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-xs uppercase tracking-wide text-blue-700">Latest admin feedback</p>
            <p className="mt-2 text-sm text-slate-900">{latestComment.message}</p>
            <p className="mt-2 text-xs text-slate-600">
              {latestComment.authorName} ({latestComment.role}) • {formatDate(latestComment.createdAt)}
            </p>
          </div>
        ) : null}

        <h3 className="mt-6 text-lg font-semibold text-slate-900">Admin Comments</h3>
        {comments.length === 0 ? (
          <p className="mt-2 text-slate-600">No comments available yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {comments.map((comment) => (
              <article key={comment.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-800">{comment.message}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {comment.authorName} ({comment.role}) • {formatDate(comment.createdAt)}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      {isAdmin ? (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Admin Review Actions</h2>
          <form onSubmit={handleAdminReviewSubmit} className="mt-4 space-y-4">
            <div>
              <label htmlFor="status" className="mb-1 block text-sm font-medium text-slate-700">
                Update status
              </label>
              <select
                id="status"
                value={statusDraft}
                onChange={(event) => setStatusDraft(event.target.value as IdeaStatus)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status} disabled={!isValidStatusTransition(idea.status, status)}>
                    {status.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="review-comment" className="mb-1 block text-sm font-medium text-slate-700">
                Evaluation feedback (optional)
              </label>
              <textarea
                id="review-comment"
                rows={4}
                value={commentDraft}
                onChange={(event) => setCommentDraft(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500"
                placeholder="Add useful guidance for the submitter"
              />
            </div>

            {feedbackMessage ? <p className="text-sm text-emerald-700">{feedbackMessage}</p> : null}
            {actionError ? <p className="text-sm text-rose-700">{actionError}</p> : null}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save Review'}
              </button>
            </div>
          </form>
        </section>
      ) : null}

      {!isAdmin && actionError ? <p className="mt-5 text-sm text-rose-700">{actionError}</p> : null}

      <Link
        href={session?.role === 'admin' ? '/admin' : '/dashboard'}
        className="mt-5 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        Back to {session?.role === 'admin' ? 'admin panel' : 'dashboard'}
      </Link>
    </section>
  );
}
