import { Comment, Idea, IdeaStatus } from '../types/models';

const IDEAS_KEY = 'innovatepam_ideas';
const COMMENTS_KEY = 'innovatepam_comments';

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function readLocalStorage<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;

  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeLocalStorage<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

async function seedCollectionIfNeeded<T>(key: string, filePath: string): Promise<void> {
  if (!isBrowser()) return;

  const existing = readLocalStorage<T[]>(key, []);
  if (existing.length > 0) return;

  try {
    const response = await fetch(filePath, { cache: 'no-store' });
    if (!response.ok) {
      writeLocalStorage<T[]>(key, []);
      return;
    }

    const data = (await response.json()) as T[];
    if (Array.isArray(data)) {
      writeLocalStorage<T[]>(key, data);
      return;
    }
  } catch {
    // Ignore fetch errors and fallback to empty arrays.
  }

  writeLocalStorage<T[]>(key, []);
}

export async function ensureIdeasSeeded(): Promise<void> {
  await seedCollectionIfNeeded<Idea>(IDEAS_KEY, '/data/ideas.json');
}

export async function ensureCommentsSeeded(): Promise<void> {
  await seedCollectionIfNeeded<Comment>(COMMENTS_KEY, '/data/comments.json');
}

export async function getAllIdeas(): Promise<Idea[]> {
  await ensureIdeasSeeded();
  return readLocalStorage<Idea[]>(IDEAS_KEY, []);
}

export async function getIdeasByStatus(status: IdeaStatus | 'all'): Promise<Idea[]> {
  const ideas = await getAllIdeas();
  if (status === 'all') return ideas;
  return ideas.filter((idea) => idea.status === status);
}

export async function getIdeasByUser(userId: string): Promise<Idea[]> {
  const ideas = await getAllIdeas();
  return ideas.filter((idea) => idea.createdById === userId);
}

export async function getIdeaById(id: string): Promise<Idea | undefined> {
  const ideas = await getAllIdeas();
  return ideas.find((idea) => idea.id === id);
}

export async function addIdea(idea: Idea): Promise<void> {
  const ideas = await getAllIdeas();
  ideas.push(idea);
  writeLocalStorage(IDEAS_KEY, ideas);
}

export function isValidStatusTransition(current: IdeaStatus, next: IdeaStatus): boolean {
  const allowed: Record<IdeaStatus, IdeaStatus[]> = {
    submitted: ['submitted', 'under_review'],
    under_review: ['under_review', 'accepted', 'rejected'],
    accepted: ['accepted'],
    rejected: ['rejected'],
  };

  return allowed[current].includes(next);
}

export async function updateIdeaStatus(ideaId: string, nextStatus: IdeaStatus): Promise<{ success: boolean; error?: string }> {
  const ideas = await getAllIdeas();
  const index = ideas.findIndex((idea) => idea.id === ideaId);

  if (index < 0) {
    return { success: false, error: 'Idea not found.' };
  }

  const current = ideas[index];
  if (!isValidStatusTransition(current.status, nextStatus)) {
    return { success: false, error: `Invalid transition from ${current.status} to ${nextStatus}.` };
  }

  ideas[index] = {
    ...current,
    status: nextStatus,
    updatedAt: new Date().toISOString(),
  };

  writeLocalStorage(IDEAS_KEY, ideas);
  return { success: true };
}

export async function getCommentsByIdeaId(ideaId: string): Promise<Comment[]> {
  await ensureCommentsSeeded();
  const comments = readLocalStorage<Comment[]>(COMMENTS_KEY, []);
  return comments.filter((comment) => comment.ideaId === ideaId);
}

export async function addAdminComment(
  ideaId: string,
  reviewer: { id: string; name: string; role: 'submitter' | 'admin' },
  message: string
): Promise<void> {
  await ensureCommentsSeeded();
  const comments = readLocalStorage<Comment[]>(COMMENTS_KEY, []);

  const newComment: Comment = {
    id: typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `comment-${Date.now()}`,
    ideaId,
    createdById: reviewer.id,
    authorName: reviewer.name,
    role: reviewer.role,
    message,
    createdAt: new Date().toISOString(),
  };

  comments.push(newComment);
  writeLocalStorage(COMMENTS_KEY, comments);
}
