"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IdeaDraftInput, IdeaForm } from '@/src/components/IdeaForm';
import { buildLoginRedirectUrl, getDefaultRouteForRole, getSession, SessionUser } from '@/src/lib/auth';
import { addIdea } from '@/src/lib/ideas';
import { Idea } from '@/src/types/models';

function generateIdeaId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `idea-${Date.now()}`;
}

export default function SubmitIdeaPage() {
  const router = useRouter();
  const [session, setSession] = useState<SessionUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const currentSession = getSession();

    if (!currentSession) {
      router.replace(buildLoginRedirectUrl('/submit-idea', 'submitter'));
      return;
    }

    if (currentSession.role !== 'submitter') {
      router.replace(getDefaultRouteForRole(currentSession.role));
      return;
    }

    setSession(currentSession);
    setIsReady(true);
  }, [router]);

  async function handleSubmitIdea(payload: IdeaDraftInput): Promise<void> {
    if (!session) return;

    const now = new Date().toISOString();

    const newIdea: Idea = {
      id: generateIdeaId(),
      title: payload.title,
      description: payload.description,
      category: payload.category,
      fileUrl: payload.fileUrl,
      status: 'submitted',
      createdById: session.id,
      createdAt: now,
      updatedAt: now,
    };

    await addIdea(newIdea);
    router.push('/dashboard');
  }

  if (!isReady) {
    return <div className="mx-auto max-w-4xl px-4 py-12 text-slate-600">Checking access...</div>;
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:py-12">
      <div className="mb-7 max-w-2xl">
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Submit Innovation Idea</h1>
        <p className="mt-2 leading-7 text-slate-600">Share your idea with clear impact and optional supporting attachment.</p>
      </div>
      <IdeaForm onSubmitIdea={handleSubmitIdea} />
    </section>
  );
}
